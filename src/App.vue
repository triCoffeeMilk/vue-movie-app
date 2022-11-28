<template>
  <home country="us">
    <Header />
    <RouterView />
    <Footer />
  </home>
</template>

<script>
import Header from "~/components/Header"
import Footer from "~/components/Footer"

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
template {
}
</style>