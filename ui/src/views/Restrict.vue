<template>
  <h2 class="text-white">
    You are not allowed to access this page ${page}
  </h2>
</template>

<script>
export default {
  name: "Restrict",
  props: ['page']
}
</script>

<style scoped>

</style>