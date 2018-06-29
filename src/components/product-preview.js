import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default ({ product }) => (
  <div className="tile is-parent is-6">
    <div className="tile is-child">
      <Img sizes={product.productImage.sizes} alt={product.productImage.description}/>
      <h3>
        {product.title}
      </h3>
    </div>
  </div>
)
