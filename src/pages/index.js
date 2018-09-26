import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import SEO from '../components/seo'

class RootIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulBlogPost.edges
    const manufacturers = this.props.data.allContentfulManufacturer.edges
    const postNode = {
      title: this.props.data.site.siteMetadata.title,
      description: {
        internal: {
          content: this.props.data.site.siteMetadata.description,
        },
      },
    }

    return (
      <div className="content-section">
        <SEO
          pagePath={``}
          postNode={postNode}
          pageSEO
          siteMetadata={this.props.data.site.siteMetadata}
        />
        <Helmet title={siteTitle}>
          <meta property="og:type" content="website" />
        </Helmet>
        <Hero posts={posts} />

        <section className="section">
          <div className="container">
            <h2 className="title">Pioneering Materials</h2>
            <p>
              Loop carefully curates it’s stable of lines to bring you the
              newest, highest quality and most innovative products available.
            </p>
            <p>
              Make your next project more distinctive with materials others
              miss.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Project Diversity</h2>
            <p>
              Our lines represent a large spectrum of possibilities. Loop
              provides solutions for Healthcare, Hospitality, Corporate, Civic,
              Cultural, Education, Retail, Residential, Liturgical, or any other
              scenario your project brings to the table.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">End to End Support</h2>
            <p>
              Your projects are <strong>our</strong> projects. Understanding the
              process is a big part of what we do. Loop supports all your
              efforts at every waypoint from concept to completion – on every
              project from tiny to tremendous.
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
                    <Link to={`manufacturers/${node.slug}`} hrefLang="en">
                      <Img key={node.slug} sizes={node.logoImageDark.sizes} />
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
    allContentfulBlogPost(
      limit: 1
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          description {
            childMarkdownRemark {
              html
            }
          }
          heroImage {
            sizes(maxHeight: 1200, maxWidth: 2000, resizingBehavior: FILL, quality: 70) {
              ...GatsbyContentfulSizes_withWebp_noBase64
            }
          }
          publishDate(formatString: "MMMM Do, YYYY")
          slug
          tags
          title
          useLightText
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
            sizes(maxHeight: 400, resizingBehavior: PAD) {
              ...GatsbyContentfulSizes_tracedSVG
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
