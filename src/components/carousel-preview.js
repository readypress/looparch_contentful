import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import styles from './carousel-preview.sass'

class CarouselPreview extends React.Component {
  componentDidUpdate() {
    if (this.props.article.useLightText) {
      document
        .getElementById('preview-content')
        .getElementsByTagName('h3')[0]
        .classList.add('has-text-white-bis')
      document
        .getElementById('preview-content')
        .getElementsByTagName('p')[0]
        .classList.add('has-text-white-bis')
    }
  }

  render() {
    const article = this.props.article

    return (
      <div className="carousel-preview">
        <GatsbyImage
          image={article.heroImage.gatsbyImageData}
          alt={article.title}
          className="carousel-preview-image"
        />
        <div
          id="preview-content"
          className="carousel-preview-content has-text-centered content"
        >
          <h3 className="title is-size-1">
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <div
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
