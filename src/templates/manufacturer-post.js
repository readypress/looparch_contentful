import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import ProductPreview from '../components/product-preview'
import FormContact from '../components/form-contact'
import ManufacturerHero from '../components/manufacturer-hero'
import SEO from '../components/seo'
import Layout from '../components/layout'

import styles from './manufacturer-post.sass'

class ManufacturerPostTemplate extends React.Component {
  componentDidMount() {
    const selectedItem = decodeURI(this.props.location.hash.replace('#',''))
    if (selectedItem) {
      console.log('got here', selectedItem)
      document.getElementById(selectedItem).classList.add('selected')
      this.highlight = setTimeout (() => {
        try {
          document.getElementsByClassName('selected')[0].classList.remove('selected')
        }
        catch (e) {
          console.log(e)
        }
      }, 5000)
    }
  }

  componentWillUnmount() {
    if (this.highlight) {
      clearTimeout(this.highlight)
    }
  }

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
      <Layout>
        <div className="content-section manufacturer-post">
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <SEO
            pagePath={`manufacturers/${post.slug}`}
            postNode={post}
            postSEO
            siteMetadata={siteMetadata}
            products={products.edges}
          />
          <h1 className="is-hidden">{`${post.title} | ${siteTitle}`}</h1>
          <section className="section">
            <div className="container">
              <div className="columns is-multiline is-variable is-6">
                <div className="column is-one-third">
                  <Img
                    fluid={post.logoImageDark.fluid}
                    className="image"
                    outerWrapperClassName="logo-img"
                  />
                  <br />
                  <Img
                    fluid={post.heroImage.fluid}
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
                    <div className="field is-grouped">
                      <p className="control no-print">
                        <a
                          href={post.url}
                          target="_blank"
                          className="button is-primary"
                          rel="noopener"
                        >
                          <span>Visit {post.title}</span>
                        </a>
                      </p>
                      <p className="control no-print">
                        <a href="#inquiry" className="button is-secondary">
                          <span>Inquire</span>
                        </a>
                      </p>
                    </div>
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
                              <ProductPreview product={product} post={post} siteMetadata={siteMetadata} path={this.props.location.pathname}/>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                  <section id="inquiry" className="section inquiry-section no-print">
                    <h3 className="title is-size-4">{post.title} Inquiries</h3>
                    <FormContact
                      section={post.title}
                      manufacturers={manufacturers}
                      recaptchaKey={siteMetadata.recaptchaKey}
                    />
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
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
        fluid(maxWidth: 300) {
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(width: 300) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
      logoImageDark {
        title
        description
        fluid(maxHeight: 250, quality:100, resizingBehavior:PAD) {
          ...GatsbyContentfulFluid_withWebp_noBase64
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
          contentful_id
          description {
            internal {
              content
            }
            childMarkdownRemark {
              html
            }
          }
          productImage {
            title
            description
            file {
              url
            }
            fixed(width: 352, height: 237, resizingBehavior: FILL) {
              ...GatsbyContentfulFixed_withWebp
              srcSet
              aspectRatio
            }
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
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
        recaptchaKey
      }
    }
  }
`
