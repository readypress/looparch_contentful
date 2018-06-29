import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default ({ article }) => (
  <div className="box">
    <Link to={`/manufacturers/${article.slug}`}>
      <Img
        sizes={article.logoImageDark.sizes}
        outerWrapperClassName="title-display"
        alt={article.logoImageDark.description}
      />
    </Link>
    <div className="tags">
      {article.tags.map((node) => {
        return (
          <span className="tag" key={node}>{node}</span>
        )
      })}
    </div>
  </div>
)
