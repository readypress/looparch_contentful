import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './manufacturer-preview.scss'

export default ({ article }) => (
  <div className="column is-one-third">
    <div className="box">
      <Link to={`/manufacturers/${article.slug}`} hrefLang="en">
        <div className="image-wrapper">
          <Img
            sizes={article.logoImageDark.resize}
            alt={article.logoImageDark.description}
            className="image"
          />
          <div className="tags">
            {article.tags.map(tag => {
              return (
                <div className="tag" key={tag}>
                  {tag}
                </div>
              )
            })}
          </div>
        </div>
      </Link>
    </div>
  </div>
)
