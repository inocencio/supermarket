const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

const server = require('../../main')
const db = appRequire('/data/db')

chai.should()
chai.use(chaiHttp)

const v = '/v1'
let id = null

describe('Product API V1', () => {

  before(done => {
    console.log('-- Setting Up: Test DB Environment')
    let products = db.fetchDB(db.PRODUCTS)
    let promotions = db.fetchDB(db.PROMOTIONS)

    process.env.NODE_ENV = 'TEST'
    db.saveDB(db.PRODUCTS, products)
    db.saveDB(db.PROMOTIONS, promotions)

    done()
  })
  
  after(done => {
    console.log('-- Shutting Down: Test DB Environment')
    db.deleteTestDB(db.PRODUCTS)
    db.deleteTestDB(db.PROMOTIONS)
    done()
  })

  //to not be so verbose a closure function to handle a basic validation
  let productCheck = (e) => {
    e.should.have.property('name')
    e.should.have.property('price')
    e.should.have.property('discount')

    expect(e.id).to.be.a('string')
    expect(e.name).to.be.a('string')
    expect(e.price).to.be.a('number')
    expect(e.discount).to.be.a('number')
  }

  let equalsValue = (obj, prop, value) => {
    expect(obj).property(prop).equals(value)
  }

  describe('GET /v1/product/', () => {
    it('It should GET all the Products', (done) => {
      chai.request(server)
      .get(v + '/product')
      .end((err, res) => {
        if (err) done(err)

        res.should.have.status(200)
        const { message, content } = res.body
        const products = content

        message.should.be.equals('Read')

        products.should.be.instanceOf(Array)
        products.forEach(e => {
          productCheck(e)
        });

        //the first element ID is stored to be loaded furthermore
        this.id = products[0].id

        done()
      })
    })

    it('It should GET a Product with Id', (done) => {
      chai.request(server)
      .get(v + '/product/' + this.id)
      .end((err, res) => {
        if (err) done(err)

        res.should.have.status(200)
        const { message, content} = res.body

        message.should.be.equals('Read')

        const product = content
        product.should.be.instanceOf(Object)
        productCheck(product)
        equalsValue(product, 'id', this.id)

        done()
      })
    })
  })

  ///////////////

  describe('POST-PATCH /v1/product/', () => {
    it('It should POST a new Product', (done) => {

      let product = {
        name: 'Testing a Product X123',
        price: 599,
        discount: 25
      }

      chai.request(server)
      .post(v + '/product')
      .send(product)
      .end((err, res) => {
        if (err) done(err)

        res.should.have.status(200)
        const { message, content} = res.body

        const product = content

        message.should.be.equals('Created')

        product.should.be.instanceOf(Object)
        productCheck(product)

        this.id = product.id

        done()
      })
    })

    it('It should PATCH a new Product', (done) => {
      let product = {}

      //new values to replace the old ones
      const editedProduct = {
        changedName: 'alteredName',
        changedPrice: 1,
        changedDiscount: 99
      }

      //GET a product with ID
      chai.request(server)
      .get(v + '/product/' + this.id)
      .end( (err, res) => {
        if (err) done(err)

        const { content } = res.body
        product = content

        //edit product with new values
        product.name = editedProduct.changedName
        product.price = editedProduct.changedPrice
        product.discount = editedProduct.changedDiscount

        //try to PATCH it
        chai.request(server)
        .patch(v + '/product')
        .send(product)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          const { message, content } = res.body
          let product = content

          message.should.be.equals('Updated')

          product.should.be.instanceOf(Object)
          productCheck(product)
          equalsValue(product, 'name', editedProduct.changedName)

          done()
        })
      })
    }) //it should Patch
  }) //describe POST-PATCH
}) //describe Product API
