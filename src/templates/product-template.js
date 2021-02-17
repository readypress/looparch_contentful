import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import SEOProductMd from '../components/seo-product-md'
import Layout from '../components/layout'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, contentfulManufacturer, site } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark
  const manufacturer = contentfulManufacturer
  const tagList = frontmatter.tags.map((tag, id) => (
    <li className="tag" key={id}>
      {tag}
    </li>
  ))
  return (
    <Layout>
      <Helmet
        title={`${frontmatter.manufacturer} ${frontmatter.title} | ${site.siteMetadata.title}`}
      />
      {/* <SEOProductMd
        pagePath={`${frontmatter.slug}`}
        postNode={manufacturer}
        product={frontmatter}
        siteMetadata={site.siteMetadata}
        productSEO
      /> */}
      <div className="article content-section">
        <div className="section">
          <div className="container">
            <div className="content">
              <h1 className="title is-size-1" style={{ marginBottom: 0 }}>
                {frontmatter.manufacturer} - {frontmatter.title}
              </h1>
              <h2 className="has-text-weight-light" style={{ marginTop: 0 }}>
                {frontmatter.subtitle}
                {frontmatter.designer !== 'null' && (
                  <span> by {frontmatter.designer}</span>
                )}
              </h2>

              <Img
                style={{
                  marginBottom: '1rem',
                  border: '1px solid rgb(233 233 233)',
                }}
                fluid={frontmatter.image_primary.childImageSharp.fluid}
              />

              {frontmatter.image_secondary && (
                <Img
                  style={{
                    marginBottom: `1rem`,
                    border: '1px solid rgb(233 233 233)',
                  }}
                  fluid={frontmatter.image_secondary.childImageSharp.fluid}
                />
              )}

              {frontmatter.description !== 'null' && (
                <p>{unescape(unescape(frontmatter.description))}</p>
              )}
            </div>
            <p className="control no-print" style={{ marginBottom: '1rem' }}>
              <a
                href={frontmatter.href}
                target="_blank"
                className="button is-primary"
                rel="noopener"
              >
                <span>Visit {frontmatter.manufacturer}</span>
              </a>
            </p>
            <ul className="tags">{tagList}</ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $manufacturer: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      frontmatter {
        slug
        title
        image_primary {
          childImageSharp {
            fluid {
              presentationWidth
              presentationHeight
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
        image_secondary {
          childImageSharp {
            fluid {
              presentationWidth
              presentationHeight
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
        description
        tags
        designer
        manufacturer
        subtitle
        href
      }
    }
    contentfulManufacturer(title: { eq: $manufacturer }) {
      title
      heroImage {
        fixed {
          src
        }
      }
      slug
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
