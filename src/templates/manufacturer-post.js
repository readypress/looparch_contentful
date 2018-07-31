import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import ProductPreview from '../components/product-preview'
import FormContact from '../components/form-contact'
import ManufacturerHero from '../components/manufacturer-hero'
import SEO from '../components/seo'

import styles from './manufacturer-post.sass'

class ManufacturerPostTemplate extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const siteTitle = siteMetadata.title
    const post = this.props.data.contentfulManufacturer
    const products = this.props.data.allContentfulProduct || { edges: [] }
    const manufacturers = this.props.data.allContentfulManufacturer || {
      edges: [],
    }
    const tags = post.tags || []
    const product_edges = []

    products.edges.forEach(product => {
      const node = product.node
      let edge
      product_edges.forEach((product_edge, i) => {
        if (product_edge.title === node.tag) {
          edge = product_edges[i]
        }
      })
      if (edge) {
        edge.products.push(node)
      } else {
        product_edges.push({ title: node.tag, products: [node] })
      }
    })

    return (
      <div className="content-section manufacturer-post">
        <Helmet title={`${siteTitle} | ${post.title}`} />
        <SEO
          pagePath={`manufacturers/${post.slug}`}
          postNode={post}
          pageSEO
          siteMetadata={siteMetadata}
        />
        <h1 className="is-hidden">{`${siteTitle} | ${post.title}`}</h1>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline is-variable is-6">
              <div className="column is-one-third">
                <Img
                  sizes={post.logoImageDark.resize}
                  className="image"
                  outerWrapperClassName="logo-img"
                />
                <br />
                <Img
                  sizes={post.heroImage.sizes}
                  alt={post.heroImage.description}
                  outerWrapperClassName="hero-img"
                  className="image"
                />
                <br />
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: post.description.childMarkdownRemark.html,
                  }}
                />
                <div className="content">
                  <p>
                    <a
                      href={post.url}
                      target="_blank"
                      className="button is-primary"
                      rel="noopener"
                    >
                      <span>Visit {post.title}</span>
                    </a>
                  </p>
                  <div
                    className="tags"
                    css={{
                      marginTop: '1.5rem',
                    }}
                  >
                    {tags.map(node => {
                      return (
                        <span className="tag" key={node}>
                          {node}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="column is-marginless">
                {product_edges.map(node => {
                  return (
                    <div
                      key={node.title}
                      className="column is-multiline manufacturer-section is-paddingless is-marginless"
                    >
                      <h2 className="title is-size-4">{node.title}</h2>
                      {node.products.map(product => {
                        return (
                          <div
                            key={product.title}
                            className="column is-half is-inline-block-desktop is-inline-block-tablet is-block-mobile is-marginless is-paddingless-mobile"
                          >
                            <ProductPreview product={product} post={post} />
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
                <section className="section inquiry-section">
                  <h3 className="title is-size-4">{post.title} Inquiries</h3>
                  <FormContact
                    section={post.title}
                    manufacturers={manufacturers}
                  />
                </section>
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
      publishDate
      resizeImages
      description {
        childMarkdownRemark {
          html
        }
        internal {
          content
        }
      }
      heroImage {
        file {
          url
        }
        sizes(maxWidth: 300) {
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
        resolutions(width: 300) {
          aspectRatio
          width
          height
          src
          srcSet
          srcWebp
          srcSetWebp
        }
        resize(width: 500) {
          src
          width
          height
          aspectRatio
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
        resize(width: 351, height: 117, resizingBehavior: PAD) {
          src
          width
          height
          aspectRatio
        }
      }
      logoImageDark {
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
        resize(width: 500, resizingBehavior: PAD) {
          src
          width
          height
          aspectRatio
        }
      }
    }
    allContentfulProduct(
      sort: { fields: [tag, title] }
      filter: { manufacturer: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          tag
          title
          id
          productImage {
            title
            description
            file {
              url
            }
            resolutions(width: 500) {
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
            }
            sizes(maxWidth: 370) {
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
            resize(width: 500, height: 400, resizingBehavior: FILL) {
              src
              width
              height
              aspectRatio
            }
          }
        }
      }
    }
    allContentfulManufacturer(sort: { fields: [title] }) {
      edges {
        node {
          id
          title
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
