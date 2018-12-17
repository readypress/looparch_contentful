import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './product-preview.sass'

class ProductPreviewTemplate extends React.Component {
  render() {
    const product = this.props.product
    const post = this.props.post
    const siteMetadata = this.props.siteMetadata
    const path = this.props.path
    const description = product.description || { internal: { content: product.title } }

    let imageSizes = product.productImage.fluid
    let imageType = 'fluid'
    if (post.resizeImages) {
      imageSizes = product.productImage.fixed
      imageType = 'fixed'
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
          className={`image product-preview-image ${imageType}`}
        />
        <h3>{product.title}</h3>
      </div>
    )
  }
}
export default ProductPreviewTemplate
