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
      <div
        className={`product-preview ${post.slug}`}
        itemScope
        itemType="http://schema.org/Product"
        id={product.title}
      >
        <span className="is-hidden" itemProp="brand">
          {post.title}
        </span>
        <span className="is-hidden" itemProp="name">
          {product.title}
        </span>
        <Img
          sizes={imageSizes}
          alt={product.productImage.description}
          title={`${post.title} ${product.title}`}
          className="image"
          outerWrapperClassName="product-preview-image"
          itemProp="image"
        />
        <h3>{product.title}</h3>
      </div>
    )
  }
}
export default ProductPreviewTemplate
