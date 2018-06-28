import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import ProductPreview from '../components/product-preview'

import styles from './manufacturer-post.scss'

class ManufacturerPostTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const post = this.props.data.contentfulManufacturer
    const products = post.product

    return (
      <div>
        <div
          className="hero"
          style={{
            backgroundImage: `url(${post.heroImage.sizes.src})`,
            backgroundSize: 'cover'
          }}>
          <div className="hero-body has-text-centered">
            <Img
              sizes={post.logoImageLight.sizes}
              alt={post.logoImageLight.description}
              outerWrapperClassName="hero-logo"
            />
          </div>
        </div>
        <section className="section">
          <div
            className="container"
            dangerouslySetInnerHTML={{
            __html: post.description.childMarkdownRemark.html,
          }}
          ></div>
        </section>
        <section className="section">
          <div className="container">
          {products.map((node) => {
            return (
              <ProductPreview key={node.id} product={node} />
            )
          })}
          </div>
        </section>
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
      description {
        childMarkdownRemark {
          html
        }
      }
      heroImage {
        file {
          url
        }
        sizes(maxWidth: 1200) {
          src
        }
      }
      logoImageLight {
        title
        description
        sizes(maxWidth: 500) {
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      product {
        id
        title
        productImage {
          title
          description
          resolutions(width: 300) {
            width
            height
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
