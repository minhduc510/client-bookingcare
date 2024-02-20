import Cookies from 'js-cookie'

const cookies = {
  get: (name: string) => {
    return Cookies.get(name)
  }
}

export default cookies
