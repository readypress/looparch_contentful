import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

class ProductPreviewTemplate extends React.Component {
  render() {
    const product = this.props.product
    return (
      <div>
        <Img sizes={product.productImage.resize} alt={product.productImage.description}/>
        <h3>
          {product.title}
        </h3>
      </div>
    )
  }
}
export default ProductPreviewTemplate
