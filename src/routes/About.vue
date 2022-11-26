<template>
  <div class="about">
    <div class="photo">
      <Loading
        v-if="imageLoading"
        absolute />
      <img
        :src="img"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import Loading from '~/components/Loading'

export default{
  components: {
    Loading
  },
  data() {
    return { 
      imageLoading : true
    }
  },
  computed: {
    ...mapState('about', [
      'img',
      'name',
      'email',
      'blog'
    ])
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$loadImage(this.img)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';
.about{
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>
