import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

class ArticlePreview extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
  }

  render() {
    const article = this.props.article
    const siteMetadata = this.props.siteMetadata

    return (
      <div className="article-preview box"
        itemScope
        itemType="http://schema.org/Article">
        <meta itemProp="url" content={`${siteMetadata.siteUrl}/articles/${article.slug}/`} />
        <meta itemProp="name" content={article.title} />
        <meta itemProp="author" content="Loop Architectural Materials" />
        <meta itemProp="image" content={article.heroImage.file.url} />
        <meta itemProp="description" content={article.description.childMarkdownRemark.html} />
        <Link to={`/articles/${article.slug}`} hrefLang="en">
          <Img fluid={article.heroImage.fluid} title={article.heroImage.title}/>
          <hr/>
          <h3 className="title is-size-5">
              {article.title}
          </h3>
          <p
            dangerouslySetInnerHTML={{
              __html: article.description.childMarkdownRemark.html,
            }}
          />
        </Link>
      </div>
    )
  }
}

export default ArticlePreview
