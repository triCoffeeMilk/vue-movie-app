import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  getters: {
  },
  // methods
  // 변이 : 데이터 변경
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기
  actions: {
    async searchMovies({ state, commit }, payload) { //{state, getters, commit}) {
      if(state.loading) return

      commit('updateState', {loading: true})
      try {
        
        var res = await _fetchMovie({...payload, page:1})
        var { Search, totalResults } = res.data
        console.log(res);
        commit('updateState', {movies: _uniqBy(Search, 'imdbID'), message: ''})
        console.log(totalResults);
        console.log(typeof totalResults);

        var pageLength = Math.ceil(parseInt(totalResults, 10)/10)
        
        if(pageLength > 1){
          if(pageLength > payload.number/10)  pageLength = payload.number/10;
          for(let page = 2;page<=pageLength;page+=1){
            const res = await _fetchMovie({...payload, page})
            // console.log(res)
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      }catch({message}) {
        commit('updateState', {
          movies: [],
          message
        })
      }finally {
        commit('updateState', {loading: false})
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return
      commit('updateState', {
        theMovie: {},
        loading: true})

      try {
        const res = await _fetchMovie(payload)
        // console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      }catch ({message}) {
        commit('updateState', {
          theMovie: {},
          message
        })
      }finally {
        commit('updateState', {loading: false})
      }
    }
  }
}

async function _fetchMovie(payload) {
  const res = await axios.post('/.netlify/functions/movie', payload)
  // console.log(res)
  return res
}
