import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <img src={`${article.heroImage.file.url}?fit=scale&w=350&h=196`} alt="" />
    <Img resolutions={article.heroImage.resolutions} />
    <h3 className={styles.previewTitle}>
      <Link to={`/manufacturers/${article.slug}`}>{article.title}</Link>
    </h3>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
