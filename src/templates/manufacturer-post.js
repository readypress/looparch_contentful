import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import styles from './blog-post.module.css'

class ManufacturerPostTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const post = this.props.data.contentfulManufacturer
    const products = post.product

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${siteTitle} – ${post.title}`} />
        <div className="wrapper">
          <div className={styles.hero}>
            <img
              src={`${post.heroImage.file.url}?w=1180&h=400&fit=fill`}
              alt=""
            />
          </div>
          <h1 className="section-headline">{post.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: post.description.childMarkdownRemark.html,
            }}
          />
        </div>
        <div>
          {products.map((node) => {
            return (
              <li key={node.id}>
                {node.title}
              </li>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ManufacturerPostTemplate

export const pageQuery = graphql`
  query ManufacturerPostBySlug($slug: String!) {
    contentfulManufacturer(slug: { eq: $slug }) {
      title
      slug
      tags
      url
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        file {
          url
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      product {
        id
        title
        productImage {
          sizes(maxWidth: 300) {
            src
            srcSet
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
