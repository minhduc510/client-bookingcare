import { useEffect } from 'react'
import loadScript from '@/utils/loadScript'

const LikeFbBtn = () => {
  useEffect(loadScript, [])
  return (
    <div
      className="fb-like"
      data-href="https://developers.facebook.com/docs/plugins/"
      data-width=""
      data-layout="button_count"
      data-action="like"
      data-size="small"
      data-share="true"
    ></div>
  )
}

export default LikeFbBtn
