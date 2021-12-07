
const Server = () => {
  const get = api => {
    return fetch(api).json()
  }
  const post = async (api, request) => {
    const response = await fetch(api, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
  const remove = async api => {
    const response = await fetch(api, {
      method: 'delete'
    })
    return response.json()
  }

  return { get, post, remove }
}

export default Server()