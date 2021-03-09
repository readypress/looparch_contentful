import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import generateMarkdownProductJSONLD from '../components/SEOProduct/generateMarkdownProductJSONLD'

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

  const jsonLd = generateMarkdownProductJSONLD(
    markdownRemark,
    manufacturer,
    site.siteMetadata
  )

  return (
    <Layout>
      <Helmet
        title={`${frontmatter.manufacturer} ${frontmatter.title} | ${site.siteMetadata.title}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
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

              <GatsbyImage
                image={
                  frontmatter.image_primary.childImageSharp.gatsbyImageData
                }
                alt={`${frontmatter.title} Image 1`}
              />

              {frontmatter.image_secondary && (
                <GatsbyImage
                  image={
                    frontmatter.image_secondary.childImageSharp.gatsbyImageData
                  }
                  alt={`${frontmatter.title} Image 2`}
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
                <span>View on {frontmatter.manufacturer}</span>
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
            gatsbyImageData
          }
        }
        image_secondary {
          childImageSharp {
            gatsbyImageData
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
      logoImageDark {
        gatsbyImageData
      }
      heroImage {
        gatsbyImageData
      }
      slug
    }
    site {
      siteMetadata {
        title
        siteUrl
        publisher
      }
    }
  }
`
