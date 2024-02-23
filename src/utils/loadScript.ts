declare global {
  interface Window {
    FB: {
      XFBML: {
        parse: () => void
      }
    }
  }
}

const loadScript = () => {
  if (window.FB) {
    window.FB.XFBML.parse()
  }
  const script = document.createElement('script')
  script.setAttribute('crossOrigin', 'anonymous')
  script.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0&appId=${
    import.meta.env.VITE_FB_APP_ID
  }`
  script.setAttribute('nonce', 'aKBcf9ry')
  script.type = 'text/javascript'
  document.body.append(script)
}

export default loadScript
