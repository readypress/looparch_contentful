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
    const products = this.props.data.allContentfulProduct || { edges: [] }
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
      <div className="manufacturer-post">
        <Helmet title={`${siteTitle} | ${post.title}`} />
        <div
          className={'hero is-dark is-bold img-hero'}
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
            position: 'relative',
          }}
        >
          <div className="hero-body has-text-centered">
            <Img
              sizes={post.logoImageLight.resize}
              alt={post.logoImageLight.description}
              outerWrapperClassName="hero-logo"
              css={{
                zIndex: 10,
              }}
            />
          </div>
          <div
            className="dark-background is-overlay"
            css={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
            }}
          />
        </div>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-one-third">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: post.description.childMarkdownRemark.html,
                  }}
                />
                <p>
                  <a
                    href={post.url}
                    target="_blank"
                    className="button is-primary"
                  >
                    <span>Visit {post.title}</span>
                  </a>
                </p>
                <div className="tags">
                  {tags.map(node => {
                    return (
                      <span className="tag" key={node}>
                        {node}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className="column">
                {product_edges.map(node => {
                  return (
                    <div
                      key={node.title}
                      className="column is-multiline manufacturer-section"
                    >
                      <h2 className="title">{node.title}</h2>
                      {node.products.map(product => {
                        return (
                          <div
                            key={product.title}
                            className="column is-half is-inline-block-desktop is-inline-block-tablet is-block-mobile"
                          >
                            <ProductPreview product={product} />
                          </div>
                        )
                      })}
                    </div>
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
        sizes(maxWidth: 100) {
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
        resize(width: 300, height: 200, resizingBehavior: PAD) {
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
            resolutions(width: 500) {
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
            }
            sizes(maxWidth: 300) {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
