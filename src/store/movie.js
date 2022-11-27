import axois from 'axios'

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
        // console.log(res);
        commit('updateState', {movies: Search, message: ''})
        // console.log(totalResults);
        // console.log(typeof totalResults);

        var pageLength = Math.ceil(parseInt(totalResults, 10)/10)
        if(pageLength > payload.number/10)  pageLength = payload.number/10;

        if(pageLength > 1){
          for(let page = 2;page<=pageLength;page+=1){
            const res = await _fetchMovie({...payload, page})
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ...Search]
            })
          }
        }
      }catch(message) {
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
      }catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      }finally {
        commit('updateState', {loading: false})
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, page, year, id } = payload;
  const OMDB_API_KEY = '7035c60c'
  const url = id ?
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject)=> {
    axois.get(url)
      .then(res=>{
        if(res.data.Error)  reject(res.data.Error)
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
  })

}
