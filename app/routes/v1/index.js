const router = require('express').Router()
const productAPI = appRequire('/controller/v1/product')

/**
 * Create a new Product.
 */
router.post('/product', (req, res) => {
  try {
    let { name, price, discount } = req.body

    let product = {
      name: name,
      price: price,
      discount: discount
    }

    const result = productAPI.product_create(product)
    res.send(result)
  } catch (err) {
    console.log('#Error -> Unable to to add new product.')
    console.error(err)
    res.status(500).json( { message: 'InternalError', error : null } )
  }
})

/**
 * Read all Products.
 */
router.get('/product', (req, res) => {
  try {
    const result = productAPI.product_list()
    res.send(result)
  } catch (err) {
    console.log('#Error -> Unable to retrieve product list.')
    console.error(err)
    res.status(500).json( { message: 'InternalError', error : null } )
  }
})

/**
 * Get a Product details
 */
router.get('/product/:id', (req, res) => {
  try {
    const { id } = req.params

    const result = productAPI.product_read(id)
    res.send(result)
  } catch (err) {
    console.log('#Error -> Unable to retrieve a product from its ID.')
    console.error(err)
    res.status(500).json( { message: 'InternalError', error : null } )
  }
})

/**
 * Update a Product.
 */
router.patch('/product/', (req, res) => {
  try {
    const { id, name, price, discount } = req.body
    const product = {
      id: id,
      name: name,
      price: price,
      discount: discount
    }

    const result = productAPI.product_update(product)
    res.send(result)
  } catch (err) {
    console.log('#Error -> Unable to update a product.')
    console.error(err)
    res.status(500).json( { message: 'InternalError', error : null } )
  }
})

module.exports = router