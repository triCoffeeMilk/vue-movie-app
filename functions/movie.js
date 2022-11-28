const axios = require('axios').default
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {
  const { title, type, page, year, id } = JSON.parse(event.body);
  const url = id ?
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  try {
    const { data } = await axios.get(url, {responseEncoding: 'utf8'});
    console.log(data)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    };
  }
}