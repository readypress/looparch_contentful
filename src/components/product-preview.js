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

    let imageType = 'fluid'

    let VariableImage = <Img
      fluid={product.productImage.fluid}
      alt={product.productImage.description}
      title={`${post.title} ${product.title}`}
      className={`image product-preview-image ${imageType}`}
    />

    if (post.resizeImages) {
      VariableImage = <Img
        sizes={product.productImage.resize}
        alt={product.productImage.description}
        title={`${post.title} ${product.title}`}
        className={`image product-preview-image ${imageType}`}
      />
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

        {VariableImage}
        <h3>{product.title}</h3>
      </div>
    )
  }
}
export default ProductPreviewTemplate
