import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import ManufacturerPreview from '../../components/manufacturer-preview'

class ManufacturersIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulManufacturer.edges

    return (
      <div>
        <Helmet title={siteTitle} />
        <div className="hero is-info is-bold">
          <div className="hero-body has-text-centered">
            <h1 className="title">Our Lines</h1>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ManufacturerPreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default ManufacturersIndex

export const pageQuery = graphql`
  query ManufacturerIndexQuery {
    allContentfulManufacturer(sort: { fields: [title], order: DESC }) {
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
            resolutions(width: 500) {
              width
              height
              src
              srcSet
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
