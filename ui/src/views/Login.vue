<template>
  <div class="flex items-center justify-center px-2 py-10">
    <div class="max-w-md w-full">
      <div>
        <h2 class="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-300">
          Sign in to your account
        </h2>
      </div>

      <form class="mt-8" @submit.prevent="submit">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm">
          <div>
            <input aria-label="Email address" name="email" type="email" v-model="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="E-mail">
          </div>
          <div class="-mt-px">
            <input aria-label="Password" name="password" type="password" v-model="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password">
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
            <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm leading-5">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Forgot your password?
            </a>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:border-green-500 focus:shadow-outline-indigo active:bg-gray-800 transition duration-150 ease-in-out">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-100 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
            Sign in
          </button>
        </div>
      </form>
      <div class="mt-4 bg-green-600 text-white font-semibold rounded-sm p-2" v-if="status === 'loginOK'">Signed in successfully!</div>
      <div class="mt-4 bg-red-600 text-white font-semibold rounded-sm p-2" v-if="status === 'fail'">Failed to sing in!</div>
      <div class="mt-2 w-full">
        <span class="text-white" style="font-size: .700rem">
          <strong>NOTE:</strong> This is a simple login screen to achieve Gaius Solutions user's requirements to fulfill two roles (admin - edit product, user - view and buy products). This is not a full session implementation, instead I've used a simple cookie resource to simulate sessions.
          <p class="mt-2">
            user@gaiussolutions.com - 'user' password <br />
            admin@gaiussolutions.com - 'admin' password <br />
          </p>
          <p class="mt-2 mb-2">
            If you don't want to fullfil the fields, just click on the buttons below:
          </p>
        </span>
      </div>
      <div class="inline-flex items-center space-x-3">
        <button type="button" class="text-xs px-4 py-1 border border-transparent text-sm rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray focus:border-indigo-600 active:bg-indigo-700 transition duration-150 ease-in-out"
        @click="directLogin('user')">
          Login as User
        </button>
        <button type="button" class="text-xs px-4 py-1 border border-transparent text-sm rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray focus:border-indigo-600 active:bg-indigo-700 transition duration-150 ease-in-out"
        @click="directLogin('admin')">
          Login as Admin
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Login",
  data: () => ({
    status: '',
    username: '',
    password: ''
  }),
  created () {
    this.logout()
  },
  methods: {
    submit () {
      this.logout()

      if (this.username === 'user@gaiussolutions.com' && this.password === 'user') {
        //login as user
        this.login(this.username, 'user')
      } else if (this.username === 'admin@gaiussolutions.com' && this.password === 'admin') {
        //login as admin
        this.login(this.username, 'admin')
      } else {
        //fail to login
        this.status = 'fail'
      }

    },
    login(username, role) {
      this.status = 'loginOK'

      let user = {
        username : username,
        role: role
      }

      //set a cookie with specific role and user e-mail as login, duration 1 day
      this.$cookie.set('login', JSON.stringify(user), 1);
    },
    directLogin(role) {
      if (role === 'user') {
        this.username = 'user@gaiussolutions.com'
        this.role = 'user'
      } else if (role === 'admin') {
        this.username = 'admin@gaiussolutions.com'
        this.role = 'admin'
      }

      this.password = this.role
      this.login(this.username, this.role)
    }
  },
  watch: {
    status(value) {
      if (value === 'loginOK') {
        setTimeout(function() {
          router.push('/')
        }, 1300)

        clearInterval()
      } else if (value === 'fail') {
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style scoped>

</style>