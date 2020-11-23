<template>
  <div id="nav" class="text-white p-3 bg-gray-800 max-w-full top-0">
    <div class="flex items-center justify-between">
      <span class="text-left">
        <router-link to="/" class="align-middle font-medium rounded-md px-2 py-1 ml-2 transition duration-100 ease-in hover:text-green-500 hover:bg-gray-700 focus:outline-none">Home</router-link>
        <router-link to="/product" class="align-middle font-medium rounded-md px-2 py-1 ml-2 transition duration-100 ease-in hover:text-green-500 hover:bg-gray-700 focus:outline-none" v-if="isAdmin">Add Product</router-link>
        <router-link to="/login" class="align-middle font-medium rounded-md px-2 py-1 ml-2 transition duration-100 ease-in hover:text-green-500 hover:bg-gray-700 focus:outline-none" v-if="!user">Login</router-link>
      </span>
      <span class="text-right mr-2" v-if="user">
        Signed in: {{ user.username }} <a href="#" class="ml-2 mr-2 underline text-gray-400 hover:text-white" @click="logout">Sign out</a>
      </span>
      <button type="button" @click="$router.push('/cart')" class="inline-flex items-center align-middle object-center px-2 align-text-top border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray focus:border-green-500 active:bg-gray-500 transition duration-150 ease-in-out">
        <span class="mr-3">({{ totalItems }})</span>
        <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3,5 L4.33333333,9 L4,9 C2.34314575,9 1,10.3431458 1,12 C1,13.6568542 2.34314575,15 4,15 L17,15 L17,13 L4.00684547,13 C3.45078007,13 3,12.5561352 3,12 C3,11.4477153 3.44748943,11 3.99850233,11 L10.5,11 L17,11 L20,2 L4,2 L4,0.997030139 C4,0.453036308 3.54809015,0 2.9906311,0 L0,0 L0,2 L2,2 L3,5 Z M5,20 C6.1045695,20 7,19.1045695 7,18 C7,16.8954305 6.1045695,16 5,16 C3.8954305,16 3,16.8954305 3,18 C3,19.1045695 3.8954305,20 5,20 Z M15,20 C16.1045695,20 17,19.1045695 17,18 C17,16.8954305 16.1045695,16 15,16 C13.8954305,16 13,16.8954305 13,18 C13,19.1045695 13.8954305,20 15,20 Z" id="Combined-Shape"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppNav",
  data: () => ({
    user: null,
    isAdmin: false,
    totalItems: 0
  }),
  created () {
    //allow us to render this component manually outside this scope.
    this.$root.$refs.AppNav = this
  },
  mounted () {
    this.refresh()
  },
  methods: {
    reload: function () {
      this.refresh()
    },
    refresh: function () {
      this.user = this.getUser()
      this.isAdmin = this.isAdminUser()

      let products = this.sessionProducts(null, null)
      let totalItems = 0

      if (products.length > 0)
        products.forEach(e => totalItems += e.amount)

      this.totalItems = totalItems
    },
    logout: function () {
      this.$cookie.delete('login')
      this.$router.push('/login')
      location.reload()
    }
  },
}
</script>

<style scoped>

</style>