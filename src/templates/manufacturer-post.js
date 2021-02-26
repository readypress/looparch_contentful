import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import voca from 'voca'
// import InfiniteScroll from 'react-infinite-scroll-component'

// import ProductPreview from '../components/product-preview'
import MdProductPreview from '../components/md-product-preview'
import FormContact from '../components/form-contact'
// import ManufacturerHero from '../components/manufacturer-hero'
import SEO from '../components/seo'
import Layout from '../components/layout'

import styles from './manufacturer-post.sass'

class ManufacturerPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: props.height }
  }

  componentDidMount() {
    this.setState({ height: window.innerHeight + 'px' })
  }

  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const siteTitle = siteMetadata.title
    const post = this.props.data.contentfulManufacturer
    // const products = this.props.data.allContentfulProduct || { edges: [] }
    const mdProducts = this.props.data.allMarkdownRemark || { edges: [] }
    const groupedProducts = this.props.data.allMarkdownRemark.groupedProducts
    const manufacturers = this.props.data.allContentfulManufacturer || {
      edges: [],
    }
    const tags = post.tags || []

    return (
      <Layout>
        <div
          className="content-section manufacturer-post"
          style={{
            position: 'sticky',
            top: '0px',
            height: this.state.height,
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <Helmet title={`${post.title} | ${siteTitle}`} />
          {/* <SEO
            pagePath={`manufacturers/${post.slug}`}
            postNode={post}
            postSEO
            siteMetadata={siteMetadata}
            products={mdProducts.edges}
          /> */}
          <h1 className="is-sr-only">{`${post.title} | ${siteTitle}`}</h1>
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
                      {tags.map((node) => {
                        return (
                          <span className="tag" key={node}>
                            {node}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className="column is-marginless"
                  // style={{
                  //   height: '1000px',
                  //   overflow: 'hidden',
                  //   overflowY: 'scroll',
                  //   scroll: 'auto',
                  // }}
                >
                  {/* {mdProducts.edges.map((product, iterator) => {
                    const fm = product.node.frontmatter
                    return (
                      <div
                        key={iterator}
                        className="column is-one-third is-inline-block-desktop is-inline-block-tablet is-block-mobile is-marginless is-paddingless-mobile"
                      >
                        <MdProductPreview
                          product={fm}
                          post={post}
                          siteMetadata={siteMetadata}
                          path={this.props.location.pathname}
                        />
                      </div>
                    )
                  })} */}

                  {groupedProducts.map((productGroup, iterator) => {
                    return (
                      <div key={iterator}>
                        <div
                          className="column is-full is-marginless"
                          style={{
                            position: 'sticky',
                            top: '0px',
                            background: '#FFF',
                            zIndex: '10000',
                            display: 'block',
                          }}
                        >
                          <h2
                            className="title is-size-4"
                            style={{
                              background: '#FFF',
                              zIndex: '10000',
                              display: 'block',
                            }}
                          >
                            {voca.titleCase(
                              productGroup.fieldValue.replace(/\-/g, ' ')
                            )}
                          </h2>
                        </div>
                        {productGroup.nodes.map((product) => {
                          const fm = product.frontmatter
                          return (
                            <div
                              key={product.id}
                              className="column is-one-third is-inline-block-desktop is-inline-block-tablet is-block-mobile is-marginless is-paddingless-mobile"
                              style={{ zIndex: '500' }}
                            >
                              <MdProductPreview
                                product={fm}
                                post={post}
                                siteMetadata={siteMetadata}
                                path={this.props.location.pathname}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}

                  <section
                    id="inquiry"
                    className="section inquiry-section no-print"
                  >
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
  query ManufacturerPostBySlug($slug: String!, $title: String!) {
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
        fixed(width: 1200) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
      logoImageDark {
        title
        description
        fluid(
          maxHeight: 200
          maxWidth: 400
          quality: 100
          resizingBehavior: PAD
        ) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { manufacturer: { eq: $title } } }
      sort: { fields: [frontmatter___title] }
    ) {
      tags: distinct(field: frontmatter___tags)
      groupedProducts: group(field: frontmatter___category) {
        fieldValue
        nodes {
          id
          frontmatter {
            title
            category
            description
            designer
            href
            manufacturer
            subtitle
            tags
            slug
            date
            image_primary {
              childImageSharp {
                fluid(
                  maxWidth: 300
                  maxHeight: 300
                  fit: COVER
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image_secondary {
              childImageSharp {
                fluid(
                  maxWidth: 300
                  maxHeight: 300
                  fit: COVER
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
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
