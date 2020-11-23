<template>
  <div class="p-1 m-4 bg-gray-100 border rounded-md shadow">
    <div class="flex flex-wrap content-start top-0 overflow-hidden">

      <!-- Product Info -->
      <div class="p-1 mt-2 w-full">
        <div class="bg-gray-100 p-1">
          <div class="items-baseline text-left h-20">
            <h4 class="font-semibold leading-tight truncate text-left mb-2 text-lg">
              {{ product.name }}
            </h4>
            <h4 class="leading-tight text-left">
              <label v-if="!product.discount">
                <span>{{ product.price | currencyFormatter }}</span>
              </label>
              <label class="align-middle" v-else>
                <span class="mr-2 inline-block bg-teal-700 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">{{ product.discount }}% OFF</span>
                <span class="mr-2 text-gray-600"><s>{{ product.price | currencyFormatter }}</s></span>
                <span>{{ product.computedPrice | currencyFormatter }}</span>
              </label>
            </h4>
          </div>

          <div class="mt-3 flex items-center justify-between flex-wrap">
            <!-- Edit -->
            <div class="w-0 flex-1 flex items-center" v-if="admin">
              <button @click="$router.push(`/product/${product.id}`)" class="focus:outline-none">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current mr-2">
                  <path d="M2,4 L2,18 L16,18 L16,12 L18,10 L18,20 L17,20 L0,20 L0,19 L0,3 L0,2 L10,2 L8,4 L2,4 Z M12.2928932,3.70710678 L4,12 L4,16 L8,16 L16.2928932,7.70710678 L12.2928932,3.70710678 Z M13.7071068,2.29289322 L16,0 L20,4 L17.7071068,6.29289322 L13.7071068,2.29289322 Z"></path>
                </svg>
              </button>
            </div>
            <!-- Add To Cart -->
            <span class="sm:ml-3 shadow-sm rounded-md">
              <button type="button" @click="addToCart" class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray focus:border-indigo-600 active:bg-indigo-700 transition duration-150 ease-in-out">
                <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3,5 L4.33333333,9 L4,9 C2.34314575,9 1,10.3431458 1,12 C1,13.6568542 2.34314575,15 4,15 L17,15 L17,13 L4.00684547,13 C3.45078007,13 3,12.5561352 3,12 C3,11.4477153 3.44748943,11 3.99850233,11 L10.5,11 L17,11 L20,2 L4,2 L4,0.997030139 C4,0.453036308 3.54809015,0 2.9906311,0 L0,0 L0,2 L2,2 L3,5 Z M5,20 C6.1045695,20 7,19.1045695 7,18 C7,16.8954305 6.1045695,16 5,16 C3.8954305,16 3,16.8954305 3,18 C3,19.1045695 3.8954305,20 5,20 Z M15,20 C16.1045695,20 17,19.1045695 17,18 C17,16.8954305 16.1045695,16 15,16 C13.8954305,16 13,16.8954305 13,18 C13,19.1045695 13.8954305,20 15,20 Z" id="Combined-Shape"></path>
                </svg>
                Add To Cart
              </button>
            </span>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'admin'],
  data: () => ({
    logged: false
  }),
  methods: {
    addToCart() {
      this.sessionProducts('add', this.product.id)
      location.reload()
    }
  }
}
</script>

<style scoped>
</style>