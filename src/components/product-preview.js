import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default ({ product }) => (
  <div>
    <Img resolutions={product.productImage.resolutions} alt={product.productImage.description}/>
    <h3>
      {product.title}
    </h3>
  </div>
)
