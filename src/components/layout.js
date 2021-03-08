import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/footer.js'

import base from './base.scss'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        allContentfulManufacturer(sort: { fields: [title], order: ASC }) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        allContentfulBlogPost(
          limit: 5
          sort: { fields: [publishDate], order: DESC }
        ) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet>
          <html className="has-navbar-fixed-top" lang="en" />
          <meta
            name="p:domain_verify"
            content="166b8bf16af4de614dccd2ea61cb0dc6"
          />
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:site_name"
            content={data.site.siteMetadata.title}
          />
        </Helmet>
        <Navigation manufacturers={data.allContentfulManufacturer.edges} />
        <div>{children}</div>
        <Footer
          manufacturers={data.allContentfulManufacturer.edges}
          articles={data.allContentfulBlogPost.edges}
        />
      </>
    )}
  />
)
