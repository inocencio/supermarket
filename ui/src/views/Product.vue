<template>
  <div class="text-white p-4 w-1/2">
    <form @submit.prevent="submit" autocomplete="off">
      <!-- Name -->
      <div class="mb-3">
        <span class="text-sm">Name:</span> <span class="text-red-500 font-bold">*</span><br>
        <input type="text" v-model="product.name" class="text-gray-900 p-2 font-semibold" :class="{ 'border-2 border-red-500 h-10' : nameErr }" autocomplete="off"> <span v-if="nameErr" class="text-red-500 font-semibold text-sm ml-1">{{ nameErr }}</span>
      </div>
      <!-- Price -->
      <div class="mb-3">
        <span class="text-sm">Price (pennies):</span> <span class="text-red-500 font-bold">*</span><br>
        <input type="number" v-model.number="product.price" class="text-gray-900 p-2 font-semibold" :class="{ 'border-2 border-red-500 h-10' : priceErr }" autocomplete="off"> <span v-if="priceErr" class="text-red-500 font-semibold text-sm ml-1">{{ priceErr }}</span>
      </div>
      <!-- Discount -->
      <div class="mb-3">
        <span class="text-sm">Discount:</span><br>
        <input type="number" v-model.number="product.discount" class="text-gray-900 p-2 font-semibold" :class="{ 'border-2 border-red-500 h-10' : discountErr }" autocomplete="off"> <span v-if="discountErr" class="text-red-500 font-semibold text-sm ml-1">{{ discountErr }}</span>
      </div>
      <div class="mb-3">
        <button class="mt-2 px-3 py-1 bg-gray-800 rounded-md shadow font-semibold align-middle focus:border-green-500">{{ btnSubmit }}</button>
        <button class="ml-3 mt-2 px-3 py-1 bg-white text-gray-900 rounded-md shadow font-semibold align-middle focus:border-green-500 focus:outline-none" @click.prevent="cancel">Cancel</button>
      </div>
    </form>
    <div class="mt-4 bg-green-600 text-white font-semibold rounded-sm p-2" v-if="status === 'createdOK'">A new product was recorded successfully!</div>
    <div class="mt-4 bg-green-600 text-white font-semibold rounded-sm p-2" v-if="status === 'updatedOK'">The product was updated successfully!</div>
    <div class="mt-4 bg-red-600 text-white font-semibold rounded-sm p-2" v-if="status === 'fail'">Something went wrong!
      {{ msgErr }}</div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Product",
  data: () => ({
    product: {            //product instance model
      name: '',
    },
    btnSubmit: '',
    op: '',               //page operation for [create, update]
    status: '',           //operation status on submit: [createdOK, updatedOK, fail]
    msgErr: '',           //general bottom error message when submit fails
    nameErr: '',          //specific error message to name field
    priceErr: '',         //specific error message to price field
    discountErr: '',      //specific error message to discount field
  }),
  created () {
    //prevent anonymous or non-admin user to access product page
    //redirecting them to Home
    if (!this.isAdminUser())
      this.$router.go(-1)
  },
  mounted () {
    let id = this.$route.params.id

    if (id) {
      /////
      //mount page to -> update
      this.op = 'update'
      this.btnSubmit = 'Update'
      //retrieve a updated product instance from back-end server
      this.$axios.get('/product/' + id).then( (res) => {
        const { content } = res.data
        let prod = content

        this.product = {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          discount: prod.discount
        }

      }).catch( (err) => { console.error(err) })
    } else {
      /////
      //mount page to -> create
      this.op = 'create'
      this.btnSubmit = 'Save'
    }
  },
  methods: {
    submit() {
      //clean up the previous screen result
      this.cleanStatus()

      switch (this.op) {
        /////
        //make a POST request - CREATE
        case 'create': {
          this.$axios.post('/product', this.product)
          .then((res) => {
            if (!res.data.error) {
              this.status = 'createdOK'
            } else {
              //FAIL - Something went wrong
              this.processError(res.data.error)
              this.status = 'fail'
            }
          }).catch((err) => {
            this.status = 'fail'
            this.msgErr = err
          })
          break
        }
        /////
        //make a PATCH request - UPDATE
        case 'update': {
          this.$axios.patch('/product/', this.product)
          .then((res) => {
            if (!res.data.error) {
              //OK - Updated
              this.status = 'updatedOK'
            } else {
              //FAIL - Something went wrong
              this.processError(res.data.error)
              this.status = 'fail'
            }
          }).catch((err) => {
              this.status = 'fail'
              this.msgErr = err
          })
          break
        }
      }
    },
    //previously clean up all validation fields before any submittion
    cleanStatus() {
      this.status = ''
      this.msgErr = ''
      this.nameErr = ''
      this.priceErr = ''
      this.discountErr = ''
    },
    //clean up all fields on submittion
    cleanFields() {
      this.product.name = ''
      this.product.price = ''
      this.product.discount = ''
    },
    processError(error) {
      error.forEach(e => {
        switch (e.context.key) {
          case 'name' : {
            this.nameErr = e.message
            break
          }
          case 'price' : {
            this.priceErr = e.message
            break
          }
          case 'discount' : {
            this.discountErr = e.message
            break
          }
        }
      })
    },
    //cancel any operation and push back to root page
    cancel() {
      this.cleanFields()
      router.push('/')
    }
  },
  watch: {
    //watch over the status property to redirect to root page
    status(value) {
      if (value === 'createdOK' ||
          value === 'updatedOK'
      ) {
        setTimeout(function() {
          router.push('/')
        }, 1500)

        clearInterval()
      }
    }
  }
}
</script>

<style scoped>
</style>