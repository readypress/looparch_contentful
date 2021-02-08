import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './product-preview.sass'

class MdProductPreviewTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const product = this.props.product
    const post = this.props.post

    const description = product.description || product.title

    const VariableImage = (
      <Img
        fluid={product.image_primary.childImageSharp.fluid}
        srcSet={product.image_primary.childImageSharp.srcSet}
        alt={description}
        title={`${post.title} ${product.title}`}
        className={`image product-preview-image fluid`}
      />
    )

    return (
      <div className={`product-preview ${post.slug}`} id={product.title}>
        <Link to={product.slug} hrefLang="en">
          <div>{VariableImage}</div>
          <h3>{product.title}</h3>
        </Link>
      </div>
    )
  }
}
export default MdProductPreviewTemplate
