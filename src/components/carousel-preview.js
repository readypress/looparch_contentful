import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './carousel-preview.sass'

class CarouselPreview extends React.Component {
  render() {
    const article = this.props.article

    return (
      <div className="carousel-preview">
        <Img
          sizes={article.heroImage.sizes}
          outerWrapperClassName="carousel-preview-image"
        />
        <div className="carousel-preview-content has-text-centered content">
          <h3 className="title is-size-1">
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p
            className="subtitle"
            dangerouslySetInnerHTML={{
              __html: article.description.childMarkdownRemark.html,
            }}
          />
          <Link
            to={`/articles/${article.slug}`}
            className="button is-primary"
            hrefLang="en"
          >
            Read More
          </Link>
        </div>
        <div className="carousel-preview-dark-overlay" />
      </div>
    )
  }
}

export default CarouselPreview
