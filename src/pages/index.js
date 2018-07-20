import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Hero from '../components/hero'
import Carousel from '../components/carousel'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulBlogPost.edges

    return (
      <div className="content-section">
        <Helmet title={siteTitle} />

        <Hero posts={posts} />

        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>
              Dolore sit sit voluptate in eu tempor pariatur quis est excepteur
              sint consectetur occaecat anim fugiat occaecat mollit occaecat
              aute consequat ex aliqua aliqua in reprehenderit exercitation ad
              non.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>
              Dolore sit sit voluptate in eu tempor pariatur quis est excepteur
              sint consectetur occaecat anim fugiat occaecat mollit occaecat
              aute consequat ex aliqua aliqua in reprehenderit exercitation ad
              non.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>
              Dolore sit sit voluptate in eu tempor pariatur quis est excepteur
              sint consectetur occaecat anim fugiat occaecat mollit occaecat
              aute consequat ex aliqua aliqua in reprehenderit exercitation ad
              non.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Recent Articles</h2>
            <div className="columns">
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

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(limit: 3,  sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            resize(height: 300, resizingBehavior: FILL) {
              src
              width
              height
              aspectRatio
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
    allContentfulPerson(filter: { id: { eq: "c15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          image {
            file {
              url
              fileName
              contentType
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
