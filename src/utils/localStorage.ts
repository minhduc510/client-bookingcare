const localStorage = {
  getAuth: () => {
    const { auth } = JSON.parse(
      window.localStorage['persist:root']
    )
    return JSON.parse(auth)
  },
  setTokenAuth: (login: boolean, token: string | null) => {
    const { auth } = JSON.parse(
      window.localStorage['persist:root']
    )
    const newAuth = { ...JSON.parse(auth) }
    newAuth.token = token
    newAuth.login = login
    window.localStorage.setItem(
      'persist:root',
      JSON.stringify({ auth: JSON.stringify(newAuth) })
    )
  }
}

export default localStorage
