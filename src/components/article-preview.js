import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

class ArticlePreview extends React.Component {
  render() {
    const article = this.props.article;
    console.log(article)
    return (
      <div>
        <Img sizes={article.heroImage.resize} alt="" />
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
  }
}

export default ArticlePreview
