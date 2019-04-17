import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './product-preview.sass'

class ProductPreviewTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: false,
    }
    this.revealModal = this.revealModal.bind(this)
  }

  componentDidMount() {
    this.state.rootElement = document.getElementsByTagName('html')[0]
    this.state.rootElement.classList.remove('is-clipped')
  }

  revealModal() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }))
    this.state.rootElement.classList.toggle('is-clipped')
  }

  render() {
    const product = this.props.product
    const post = this.props.post
    const siteMetadata = this.props.siteMetadata
    const path = this.props.path
    const description = product.description || {
      internal: { content: product.title },
    }

    let imageType = 'fluid'

    let VariableImage = (
      <Img
        fluid={product.productImage.fluid}
        srcSet={product.productImage.srcSet}
        alt={product.productImage.description}
        title={`${post.title} ${product.title}`}
        className={`image product-preview-image ${imageType}`}
      />
    )

    if (post.resizeImages) {
      imageType = 'fixed'
      VariableImage = (
        <Img
          fixed={product.productImage.fixed}
          alt={product.productImage.description}
          title={`${post.title} ${product.title}`}
          className={`image product-preview-image ${imageType}`}
        />
      )
    }

    return (
      <div className={`product-preview ${post.slug}`} id={product.title}>
        <div>
          <div onClick={this.revealModal}>{VariableImage}</div>
          <h3>{product.title}</h3>
        </div>

        <div className={this.state.isToggleOn ? 'modal is-active' : 'modal'}>
          <div className="modal-background" onClick={this.revealModal} />
          <div className="modal-content">
            <Img
              imgStyle={{ className: `is-square` }}
              fluid={product.productImage.fluid}
              alt={product.productImage.description}
              title={`${post.title} ${product.title}`}
            />
            <h4 className="title is-4 has-text-light">{`${post.title} – ${
              product.title
            }`}</h4>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.revealModal}
          />
        </div>
      </div>
    )
  }
}
export default ProductPreviewTemplate
