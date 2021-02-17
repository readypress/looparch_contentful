import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import voca from 'voca'

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
        srcSet={product.image_primary.childImageSharp.fluid.srcSet}
        alt={description}
        title={`${post.title} ${product.title}`}
        className={`image product-preview-image fluid`}
      />
    )

    return (
      <article className={`product-preview ${post.slug}`} id={product.title}>
        <Link to={product.slug} hrefLang="en">
          <div>{VariableImage}</div>
          <h3 className="is-size-6">{voca.truncate(product.title, 22)}</h3>
        </Link>
      </article>
    )
  }
}
export default MdProductPreviewTemplate
