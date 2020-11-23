const db = appRequire('/data/db')
const uuid = require('uuid-random')
const Joi = require('joi')

/**
 * Validate a Product - Create | Update
 * @param product
 */
module.exports.product_validate = function(product) {
  let schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required().messages({
      'string.base': `Name must be a text`,
      'string.empty': `Name is required`,
      'any.required': `Name is required`
    }),
    price: Joi.number().integer().min(1).required().messages({
      'number.base': `Price must be a integer number`,
      'number.min': `Minimal price is 1`,
      'any.required': `Price is required`
    }),
    discount: Joi.number().integer().min(0).max(99).messages({
      'number.base': `Discount must be a integer number`,
      'number.min' : `Discount cannot be a negative value`,
      'number.max' : `Maximum discount allowed is 99`
    }).label('discountErr')
  })
  schema = schema.options({
    abortEarly: false,
    convert: false
  })

  const { error, result } = schema.validate(product)
  return (error ? error.details : null)
}

/**
 * Create a new Product instance.
 * @param {object} product - a Product template
 */
module.exports.product_create = function(product) {
  product.id = uuid()
  let discount = product.discount

  //validate the object before insert it
  const error = this.product_validate(product)

  if (error)
    return { message: 'ValidationError',  error: error }

  try {
    /////
    //SAVE in Products
    delete product.discount

    let products = db.fetchDB(db.PRODUCTS)
    products.push(product)
    db.saveDB(db.PRODUCTS, products)

    /////
    //SAVE discount in Promotions
    if (discount > 0) {
      let promotions = db.fetchDB(db.PROMOTIONS)
      let promotion = {
        id: uuid(),
        productId: product.id,
        discount: discount
      }

      promotions.push(promotion)
      db.saveDB(db.PROMOTIONS, promotions)

      product.discount = promotion.discount
    } else {
      product.discount = 0
    }

    return { message: 'Created', content: product }

  } catch(err) {
    throw err
  }
}

/**
 * Read all the Products.
 */
module.exports.product_list = function() {
  try {
    let products = db.fetchDB(db.PRODUCTS)
    let promotions = db.fetchDB(db.PROMOTIONS)

    //make a 'join' with products and promotions tables that for each product whose has a promotion
    products.forEach( (product, i) => {
      let promotion = promotions.find( (e) => e.productId === product.id )
      let discount = 0

      if (promotion)
        discount = promotion.discount

      products[i] = {
        id: products[i].id,
        name: products[i].name,
        price: products[i].price,
        discount: discount
      }
    });

    return { message: 'Read', content: products }

  } catch(err) {
    throw err
  }
}

/**
 * Read a Product Details.
 * @param {string} id - product id
 */
module.exports.product_read = function(id) {
  try {
    const products = db.fetchDB(db.PRODUCTS)
    const promotions = db.fetchDB(db.PROMOTIONS)

    let product = products.find(e => e.id === id)
    let promotion = promotions.find(e => e.productId === product.id)

    if (promotion) {
      product.discount = promotion.discount
    } else {
      product.discount = 0
    }

    return { message: 'Read', content: product }
  } catch(err) {
    throw err
  }
}
/**
 * Update a Product.
 * @param {object} product
 */
module.exports.product_update = function(product) {
  try {
    //validate the product instance
    let error = this.product_validate(product)

    if (error)
      return { message: 'ValidationError', error: error }

    //we won't save discount in Products table, but Promotions
    let discount = product.discount
    delete product.discount

    let products = db.fetchDB(db.PRODUCTS)
    let promotions = db.fetchDB(db.PROMOTIONS)

    let idx = products.findIndex(e => e.id === product.id)
    products[idx] = product

    //Update -> Product
    db.saveDB(db.PRODUCTS, products)
    //reset idx to be used to check if we already have a promotion or not
    idx = -1

    if (discount === 0) {
      //product has no discount, remove it from Promotions if it is there
      idx = promotions.findIndex(e => e.productId === product.id)

      if (idx > -1) {
        promotions.splice(idx, 1)
        db.saveDB(db.PROMOTIONS, promotions)
      }
    } else {
      //create or update discount
      idx = promotions.findIndex(e => e.productId === product.id)

      if (idx === -1) {
        //create it
        let promotion = {
          id: uuid(),
          productId: product.id,
          discount: discount
        }
        promotions.push(promotion)
        db.saveDB(db.PROMOTIONS, promotions)
      } else {
        //update it
        let promotion = promotions.find(e => e.productId === product.id)
        promotion.discount = discount
        promotions[idx] = promotion
        db.saveDB(db.PROMOTIONS, promotions)
      }
    }

    //get discount back to return it
    product.discount = discount

    return { message: 'Updated', content: product }

  } catch(err) {
    throw err
  }
}