import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  // Hash, History
  // https://google.com/#/search
  // Hashmode(#)는 새로고침할 때 페이지를 잘 찾아낼 수 있다.
  // 쓰고 싶지 않을 경우, 서버에 세팅을 해야한다.
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  routes: [
    {
      // https://google.com/
      path: '/',
      component: Home
    },
    {
      path: '/movie/:imdbID',
      component: Movie
    },
    {
      // https://google.com/about
      path: '/about',
      component: About
    },
    {
      path: '/:notfound(.*)',
      component: NotFound
    }
  ]
})
