import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulBlogPost.edges
    const manufacturers = this.props.data.allContentfulManufacturer.edges

    return (
      <div className="content-section">
        <Helmet title={siteTitle} />

        <Hero posts={posts} />

        <section className="section">
          <div className="container">
            <h2 className="title">Pioneering Materials</h2>
            <p>
              Loop carefully curates it’s stable of lines to bring you the newest, highest quality and most innovative products available.
            </p>
            <p>
              Make your next project more distinctive with materials others miss.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Project Diversity</h2>
            <p>
              Our lines represent a large spectrum of possibilities. Loop provides solutions for Healthcare, Hospitality, Corporate, Civic, Cultural, Education, Retail, Residential, Liturgical, or any other scenario your project brings to the table.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">End to End Support</h2>
            <p>
              Your projects are <strong>our</strong> projects. Understanding the process is a big part of what we do. Loop supports all your efforts at every waypoint from concept to completion– on every project from tiny to tremendous.
            </p>
          </div>
        </section>
        <section className="section is-hidden-mobile">
          <div className="container">
            <h2 className="title is-hidden">Manufacturers</h2>
            <div className="columns is-multiline is-variable is-8 is-centered">
              {manufacturers.map(({ node }) => {
                return (
                  <div key={node.slug} className="column is-one-fifth">
                    <Link to={`manufacturers/${node.slug}`} >
                      <Img key={node.slug} sizes={node.logoImageDark.resize} />
                    </Link>
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
    allContentfulManufacturer(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          slug
          logoImageDark {
            description
            resize(height: 200, resizingBehavior: PAD) {
              src
              width
              height
              aspectRatio
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
