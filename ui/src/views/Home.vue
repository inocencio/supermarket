<template>
  <div class="bg-gray-700 text-gray-900">
    <div class="p-2 text-right">
      <span class="text-white text-sm mr-3">Sort By</span>
      <label>
        <select class="mr-2" v-model="selectedSort">
          <option v-for="item in sortOptions"
                  :key="item.value"
                  v-bind:value="item.value">{{ item.name }}</option>
        </select>
      </label>
    </div>
    <div class="grid grid-cols-4 gap-5">
      <span v-if="products.length === 0" class="text-white text-sm p-2">No Products Founds!</span>
      <ProductCard v-for="product in products" :key="product.id" :product="product" :admin="isAdmin"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data: () => ({
    products: {},
    selectedSort: '',
    sortOptions: '',
    isAdmin: false
  }),
  mounted () {
    /**
     * WORKING AROUND: I don't know why if it calls isAdminUser direcly, it won't load the correct status of this field.
     * To avoid this issue, I've used a local variable called isAdmin setting the isAdminUser boolean value
     * @type {boolean}
     */
    this.isAdmin = this.isAdminUser()
    this.selectedSort = 0
    this.loadAllProducts()
    this.loadSortOptions()
  },
  methods: {
    loadSortOptions() {
      this.sortOptions = [
        { value: 0, name: 'Featured Items'},
        { value: 1, name: 'Highest Price'},
        { value: 2, name: 'Lowest Price'},
        { value: 3, name: 'Name Asceding'},
        { value: 4, name: 'Name Desceding'},
        { value: 5, name: 'Highest Promotion'},
        { value: 6, name: 'Lowest Promotion'},
      ]
    },
    loadAllProducts() {
      const baseURI = '/product'

      this.$axios.get(baseURI)
      .then((res) => {
        let tempProducts = res.data.content

        tempProducts.forEach((e) => {
          if (e.discount > 0) {
            e.computedPrice = Math.floor(e.price - ( (e.price * e.discount) / 100))
          } else {
            e.computedPrice = e.price
          }
        })

        this.products = tempProducts
      })
    },
  },
  watch: {
    selectedSort(value) {
      this.selectedSort = value

      switch (value) {
        case 0: {
          this.loadAllProducts()
          break
        }
        //highest price
        case 1: {
          this.products = this.products.sort( (current, next) => - (current.computedPrice - next.computedPrice) )
          break
        }
        //lowest price
        case 2: {
          this.products = this.products.sort( (current, next) => current.computedPrice - next.computedPrice )
          break
        }
        //name ascending
        case 3: {
          this.products = this.products.sort( (current, next) => current.name.localeCompare(next.name) )
          break
        }
        //name descending
        case 4: {
          this.products = this.products.sort( (current, next) => - (current.name.localeCompare(next.name)) )
          break
        }
        //highest promotion
        case 5: {
          this.products = this.products.sort( (current, next) => - (current.discount - next.discount))
          break
        }
        //lowest promotion
        case 6: {
          //split to different arrays
          let withPromotions = this.products.filter(e => e.discount > 0)
          let noPromotions = this.products.filter(e => e.discount === 0)

          //ascending order promotions
          withPromotions = withPromotions.sort( (current, next) => current.discount - next.discount)

          //join both arrays and return it showing with promotions first
          noPromotions.unshift(withPromotions)
          //flat it to stripe out any []
          this.products = noPromotions.flat()
        }
      }
    }
  }
}
</script>