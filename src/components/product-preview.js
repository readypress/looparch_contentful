import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './product-preview.sass'

class ProductPreviewTemplate extends React.Component {
  render() {
    const product = this.props.product
    const post = this.props.post
    let imageSizes = product.productImage.sizes
    if (post.resizeImages) {
      imageSizes = product.productImage.resize
    }
    return (
      <div className={`product-preview ${post.slug}`}>
        <Img
          sizes={imageSizes}
          title={product.productImage.description}
          alt={product.productImage.description}
          className="image"
          outerWrapperClassName="product-preview-image"
        />
        <h3>{product.title}</h3>
      </div>
    )
  }
}
export default ProductPreviewTemplate
