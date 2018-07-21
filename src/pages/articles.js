import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ArticlePreview from '../components/article-preview'

class ArticleIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulBlogPost.edges

    return (
      <div className="content-section">
        <Helmet title={`${siteTitle} | Articles`} />
        <div className="hero is-primary is-bold">
          <div className="hero-body has-text-centered">
            <h1 className="title">Articles</h1>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="article-list columns is-multiline">
              {posts.map(({ node }) => {
                return (
                  <div key={node.slug} className="column is-one-third">
                    <ArticlePreview article={node} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ArticleIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            file {
              url
            }
            sizes(maxHeight:600) {
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
