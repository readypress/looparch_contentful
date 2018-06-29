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
    const products = post.product || []
    const tags = post.tags || []

    console.log(post)

    return (
      <div>
        <div
          className={'hero is-dark is-medium is-bold img-hero'}
          css={{
            backgroundImage:
              'image-set(' +
              post.heroImage.resolutions.srcSetWebp
                .replace(/\n/g, '')
                .split(',')
                .map(s => {
                  let x = s.split(' ')
                  return `url("${x[0]}") ${x[1].replace('w', 'px')}`
                }) +
              ') !important',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundOrigin: 'content-box',
              backgroundPosition: 'center 60%',
              position: 'relative'
          }}
        >
          <div className="hero-body has-text-centered">
            <Img
              sizes={post.logoImageLight.sizes}
              alt={post.logoImageLight.description}
              outerWrapperClassName="hero-logo"
              css={{
                zIndex: 10
              }}
            />
          </div>
          <div className="dark-background is-overlay"
            css={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1
            }}
          ></div>
        </div>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <div className="content"
                  dangerouslySetInnerHTML={{
                    __html: post.description.childMarkdownRemark.html,
                  }}
                >
                </div>
                <div className="tags">
                  {tags.map((node) => {
                    return (
                      <span className="tag" key={node}>{node}</span>
                    )
                  })}
                </div>
              </div>
              <div className="column">
                {products.map((node) => {
                  return (
                    <ProductPreview key={node.id} product={node} />
                  )
                })}
              </div>
            </div>
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
          srcSet
        }
        resolutions(width: 500) {
          src
          srcSet
          srcWebp
          srcSetWebp
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
