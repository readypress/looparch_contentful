import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ArticlePreview from '../components/article-preview'
import SEO from '../components/seo'

class ArticleIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulBlogPost.edges
    const postNode = {
      title: 'Articles',
      description: {
        internal: {
          content:
            'A list of articles and press releases from Loop Architectural Materials listed in the order they were created.',
        },
      },
    }

    return (
      <div className="content-section">
        <Helmet title={`${siteTitle} | Articles`} />
        <SEO
          pagePath={`articles`}
          postNode={postNode}
          pageSEO
          siteMetadata={this.props.data.site.siteMetadata}
        />
        <section className="section">
          <div className="container">
            <h1 className="title is-size-4">Articles</h1>
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
            sizes(maxHeight: 600) {
              ...GatsbyContentfulSizes_withWebp
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
        siteUrl
        description
        shareImage
        shareImageWidth
        shareImageHeight
        publisher
      }
    }
  }
`
