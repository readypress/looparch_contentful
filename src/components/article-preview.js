import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default ({ article }) => (
  <div>
    <Img sizes={article.heroImage.sizes} alt="" className="image"/>
    <h3>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
