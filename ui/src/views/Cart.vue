<template>
  <div class="flex flex-col p-4">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 text-lg mt-5">
        <span v-if="products.length > 0">Your Cart Items</span>
        <span v-else>Your Cart Items is Empty. <br> Please, go to <a href="/" class="underline">Home</a> and add items to your cart.</span>
      </div>

      <!-- Product List -->
      <div v-if="products.length > 0" class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-600 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                Products
              </th>
              <th class="px-6 py-3 bg-gray-600 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-6 py-3 bg-gray-600 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                Discount
              </th>
              <th class="px-6 py-3 bg-gray-600 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                Price (Unit)
              </th>
              <th class="px-6 py-3 bg-gray-600 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">
                Total Price
              </th>
            </tr>
            </thead>
            <!-------------->
            <!-- PRODUCTS -->
            <!-------------->
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id">
              <!-- Name -->
              <td class="px-6 py-3 whitespace-no-wrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-gray-900">
                      {{ product.name }}
                    </div>
                  </div>
                </div>
              </td>
              <!-- Quantity -->
              <td class="px-6 py-3 whitespace-no-wrap">
                <button class="focus:outline-none align-middle" @click="removeItem(`${product.id}`)"> <!-- ADD -->
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-gray-100">
                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H7Z" fill="#4A5568"/>
                  </svg>
                </button>
                <span class="text-sm text-gray-900 align-middle px-2">{{ product.amount }}</span>
                <button class="focus:outline-none align-middle -mr-3" @click="addItem(`${product.id}`)"> <!-- REMOVE -->
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-gray-900">
                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H11V7Z" fill="#4A5568"/>
                  </svg>
                </button>
              </td>
              <!-- Discount -->
              <td class="px-6 py-3 whitespace-no-wrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold text-green-800" v-if="product.discount > 0">
                  {{ product.discount }}%
                </span>
                <span class="px-2 inline-flex text-xs leading-5 font-semibold text-green-800" v-else>
                  —
                </span>
              </td>
              <!-- Price -->
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5">
                <span class="text-gray-900"><s v-if="product.discount > 0" class="text-gray-500">{{ product.price | currencyFormatter }}</s> <span>{{ product.priceDiscount | currencyFormatter }}</span></span>
              </td>
              <!-- Total Price -->
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5">
                <span class="text-gray-900">{{ product.totalPrice | currencyFormatter }}</span>
              </td>
            </tr>

            <!-- Totals-->
            <!-- Total Raw -->
            <tr class="text-gray-900 bg-gray-400 align-middle">
              <td class="px-6 py-3 whitespace-no-wrap font-bold uppercase">Totals:</td>
              <td></td>
              <td></td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-semibold">Raw Totals</td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-semibold">{{ rawTotal | currencyFormatter }}</td>
            </tr>
            <!-- Total Promos -->
            <tr class="text-gray-900 bg-gray-400 align-middle">
              <td class="px-6 py-3 whitespace-no-wrap font-semibold uppercase"></td>
              <td></td>
              <td></td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-semibold">Total Promos</td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-semibold">{{ promoTotal | currencyFormatter }}</td>
            </tr>
            <!-- Total Payable -->
            <tr class="text-gray-900 bg-gray-400 align-middle">
              <td class="px-6 py-3 whitespace-no-wrap font-semibold uppercase"></td>
              <td></td>
              <td></td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-bold">Total Payable</td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-bold">{{ total | currencyFormatter }}</td>
            </tr>

            </tbody>
          </table>
        </div>

        <!-- Buttons -->
        <div class="mt-4 flex justify-end">
          <button class="px-3 py-2 m-2 font-semibold bg-gray-800 text-gray-100
                         tracking-wide align-middle rounded-md focus:outline-none hover:text-green-500
                         transition ease-in-out duration-150" @click="removeAllItems">Remove All Items</button>
          <button class="px-3 py-2 m-2 font-semibold bg-gray-800 text-gray-100
                         tracking-wide align-middle rounded-md focus:outline-none hover:text-green-500
                         transition ease-in-out duration-150">Checkout</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Cart",
  data: () => ({
    products: [],
    rawTotal: 0,
    promoTotal: 0,
    total: 0
  }),
  mounted () {
    //update all cart items from session, retrieving all products informatios and calculate their total prices
    this.updateCartItems()
  },
  methods: {
    //add one item per click
    addItem(id) {
      this.sessionProducts('add', id)
      this.updateCartItems()
      this.$root.$refs.AppNav.reload()
    },
    //remove one item per click
    removeItem(id) {
      this.sessionProducts('remove', id)
      this.updateCartItems()
      this.$root.$refs.AppNav.reload()
    },
    //completely remove all cart items
    removeAllItems() {
      this.sessionProducts('removeall', null)
      this.updateCartItems()
      location.reload()
    },
    //update all cart interations when you add or remove any item.
    updateCartItems() {
      //get session products
      let products = this.sessionProducts(null, null)
      let fetchURLs = Array(products.length)

      products.forEach( (e, i) => {
        fetchURLs[i] = axios.get(localStorage.getItem('apiURL') + '/product/' + e.id)
      })

      //fetch all products by Id from back-end to update all results
      axios.all(fetchURLs).then(axios.spread((...result) => {
        result.forEach( (e, i) => {
          products[i] = {
            id: e.data.content.id,
            name: e.data.content.name,
            price: e.data.content.price,
            discount: e.data.content.discount,
            priceDiscount: 0,
            totalPrice: 0,
            amount: products[i].amount,
          }
        })

        //calculate the totals
        this.products = this.calculateTotals(products)
      })).catch(err => {
        console.log(err)
      })
    },
    //calculate the totals and format output products data
    calculateTotals(products) {
      products.forEach((e) => {
        if (e.discount > 0) {
          e.priceDiscount = Math.floor(e.price - ((e.price * e.discount) / 100))
          e.totalPrice = e.priceDiscount * e.amount
        } else {
          e.priceDiscount = e.price
          e.totalPrice = e.amount * e.price
        }
      })

      //calculate the totals
      let rawTotal = 0, promoTotal = 0, total = 0

      //raw & total
      products.forEach((e) => {
        rawTotal += e.price * e.amount
        total += e.priceDiscount * e.amount
      })

      //promotion
      promoTotal = rawTotal - total

      //update all totals
      this.rawTotal = rawTotal
      this.promoTotal = promoTotal
      this.total = total

      return products
    }
  }
}
</script>

<style scoped>

</style>