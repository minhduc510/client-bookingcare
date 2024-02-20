import { useEffect } from 'react'
import loadScript from '@/utils/loadScript'

const CommentFb = () => {
  useEffect(loadScript, [])
  return (
    <div
      className="fb-comments"
      data-href="https://developers.facebook.com/docs/plugins/comments"
      data-width="100%"
      data-numposts="5"
      data-order-by="reverse_time"
    ></div>
  )
}

export default CommentFb
