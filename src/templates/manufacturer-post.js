import React from 'react'
import { Helmet } from 'react-helmet'
import { useScrollRestoration } from 'gatsby'
import Img from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import voca from 'voca'

import MdProductPreview from '../components/md-product-preview'
import FormContact from '../components/form-contact'
import Layout from '../components/layout'

import generateMarkdownProductJSONLD from '../components/SEOProduct/generateMarkdownProductJSONLD'

import styles from './manufacturer-post.sass'

function ScrollRestorationContainer(params) {
  const scrollRestoration = useScrollRestoration('scrollContainer')
  return (
    <div
      key="scrollContainer"
      className="content-section manufacturer-post"
      id="manufacturer-post"
      style={{
        // position: 'sticky',
        // top: '0px',
        height: 'auto',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
      {...scrollRestoration}
    >
      {params.children}
    </div>
  )
}

class ManufacturerPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    const groupedProducts = this.props.data.allMarkdownRemark.groupedProducts
    let localProductGroups = []
    let uniqueProductGroups = []
    groupedProducts.map((productGroup) => {
      const groupName = voca.titleCase(
        productGroup.fieldValue.replace(/\-/g, ' ')
      )

      localProductGroups.push({
        name: groupName,
        anchor: productGroup.fieldValue,
      })
      uniqueProductGroups = [...new Set(localProductGroups)]
    })
    this.state = { windowHeight: 1000, productGroups: uniqueProductGroups }
  }

  componentDidMount() {
    this.setState({ windowHeight: window.outerHeight })
  }

  scrollToId(id, e) {
    e.stopPropagation()
    const container = document.getElementById('manufacturer-post')
    const el = document.getElementById(id)
    container.scrollTo(el.offsetLeft, el.offsetTop + 18)
  }

  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const siteTitle = siteMetadata.title
    const post = this.props.data.contentfulManufacturer
    const groupedProducts =
      this.props.data.allMarkdownRemark.groupedProducts || []
    const manufacturers = this.props.data.allContentfulManufacturer || {
      edges: [],
    }

    return (
      <Layout>
        <ScrollRestorationContainer height={this.state.windowHeight}>
          <Helmet title={`${post.title} | ${siteTitle}`} />

          <h1 className="is-sr-only">{`${post.title} | ${siteTitle}`}</h1>
          <section className="section">
            <div className="container">
              <div className="columns is-multiline is-variable is-6">
                <div className="column is-one-third">
                  <GatsbyImage
                    image={post.logoImageDark_proxy.gatsbyImageData}
                    alt={post.logoImageDark.title}
                    title={post.logoImageDark.title}
                    className="image"
                  />
                  <GatsbyImage
                    image={post.heroImage_proxy.gatsbyImageData}
                    alt={post.heroImage_proxy.title}
                    title={post.heroImage_proxy.title}
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
                    <div className="tags">
                      {this.state.productGroups.map((node, iterator) => {
                        return (
                          <span
                            className="tag"
                            key={iterator}
                            onClick={(e) => this.scrollToId(node.anchor, e)}
                          >
                            <a>{node.name}</a>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="column is-marginless">
                  {groupedProducts.map((productGroup, iterator) => {
                    const groupName = voca.titleCase(
                      productGroup.fieldValue.replace(/\-/g, ' ')
                    )
                    return (
                      <div key={iterator} id={productGroup.fieldValue}>
                        <div
                          className="column is-full is-marginless"
                          style={
                            {
                              // position: 'sticky',
                              // top: '0px',
                              // background: '#FFF',
                              // zIndex: '1000',
                              // display: 'block',
                            }
                          }
                        >
                          <h2
                            className="title is-size-4"
                            style={{
                              background: '#FFF',
                              display: 'block',
                            }}
                          >
                            {groupName}
                          </h2>
                        </div>
                        {productGroup.nodes.map((product) => {
                          const fm = product.frontmatter
                          const jsonLd = generateMarkdownProductJSONLD(
                            product,
                            post,
                            siteMetadata
                          )
                          return (
                            <div
                              key={product.id}
                              className="column is-inline-block is-one-third-desktop is-half-tablet is-half-mobile"
                              style={{ zIndex: '500' }}
                            >
                              <Helmet>
                                <script type="application/ld+json">
                                  {JSON.stringify(jsonLd)}
                                </script>
                              </Helmet>
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
        </ScrollRestorationContainer>
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
      heroImage_proxy: heroImage {
        title
        description
        gatsbyImageData
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
      logoImageDark_proxy: logoImageDark {
        title
        description
        gatsbyImageData
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
            image_primary_proxy: image_primary {
              childImageSharp {
                gatsbyImageData(
                  width: 300
                  height: 300
                  placeholder: BLURRED
                  transformOptions: { fit: COVER, cropFocus: ATTENTION }
                )
              }
            }
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
            image_secondary_proxy: image_secondary {
              childImageSharp {
                gatsbyImageData(
                  width: 300
                  placeholder: BLURRED
                  transformOptions: { fit: COVER, cropFocus: ATTENTION }
                )
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
