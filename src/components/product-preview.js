import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './product-preview.sass'

class ProductPreviewTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const product = this.props.product
    const post = this.props.post
    const siteMetadata = this.props.siteMetadata
    const path = this.props.path
    const description = product.description || {
      internal: { content: product.title },
    }

    const VariableImage = (
      <Img
        fluid={product.productImage.fluid}
        srcSet={product.productImage.srcSet}
        alt={product.productImage.description}
        title={`${post.title} ${product.title}`}
        className={`image product-preview-image fluid`}
      />
    )

    return (
      <div className={`product-preview ${post.slug}`} id={product.title}>
        <div>
          <div>{VariableImage}</div>
          <h3>{product.title}</h3>
        </div>
      </div>
    )
  }
}
export default ProductPreviewTemplate
