exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'JEAN',
      email: "dodo100834@gmail.com"
    })
  }
};