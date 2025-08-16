import React from 'react'

const ImageComponent = ({ src, ...props }) => {
  return <img src={src} {...props} />
}

export default ImageComponent
