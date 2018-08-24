import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './product-preview.sass'

class ProductPreviewTemplate extends React.Component {
  render() {
    const product = this.props.product
    const post = this.props.post
    const siteMetadata = this.props.siteMetadata
    const path = this.props.path
    const description = product.description || { internal: { content: product.title } }

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
        <meta itemProp="brand" content={post.title} />
        <meta itemProp="name" content={product.title} />
        <meta itemProp="url" content={`${siteMetadata.siteUrl}${path}#${encodeURI(product.title)}`} />
        <meta itemProp="image" content={product.productImage.file.url} />
        <meta itemProp="description" content={description.internal.content} />

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
