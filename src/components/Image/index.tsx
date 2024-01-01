/* eslint-disable indent */
import React from 'react'

interface Iprops {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  objectFit?:
    | 'contain'
    | 'cover'
    | 'fill'
    | 'none'
    | 'scale-down'
}

const Image: React.FC<Iprops> = ({
  src,
  alt,
  width,
  height,
  fill,
  objectFit
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={Object.assign(
        {},
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%'
            }
          : {},
        objectFit ? { objectFit: objectFit } : {},
        width ? { width: `${width}px` } : {},
        height ? { height: `${height}px` } : {}
      )}
    />
  )
}

export default Image
