<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <!-- <div class="nav"> -->
      <div  
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :class="{ active: isMatch(nav.path) }"
          :to="nav.href"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="img"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo"
import { mapState } from 'vuex'

export default {
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt9376612',
          path: /^\/movie/  // '/movie*'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'img',
      'name'
    ])
  },
  components: {
    Logo
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      // console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 5px;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    background-color: $gray-200;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>
