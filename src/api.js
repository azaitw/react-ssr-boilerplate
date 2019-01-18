// import fetch from 'isomorphic-fetch'

const api = {
  getItems: async () => {
    /*
    const response = await fetch(`${process.env.apiHost}/home`, {credentials: 'include'})
    if (response.status === 200) {
      const res = await response.json()
      return res
    } else {
      return false
    }
    */
    return { items: [
      { name: 'item1 ', url: '/item1' },
      { name: 'item2 ', url: '/item2' }
    ] }
  },
  getItem: async () => {
    /*
    const response = await fetch(`${process.env.apiHost}/getItem`, {credentials: 'include'})
    if (response.status === 200) {
      const res = await response.json()
      return res
    } else {
      return false
    }
    */
    return { item: {
      name: 'item',
      desc: 'this is item page',
      url: '/item1'
    } }
  },
  // Detect which page to serve and which api to call with pathname
  getPage: (pathname) => {
    let output = {}
    const pathArray = pathname.split('/').splice(1)
    if (pathArray[0] === '') {
      output.page = 'home'
    } else {
      output.page = 'item'
    }
    return output
  }
}

export default api
