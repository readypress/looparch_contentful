import React from 'react'
import Helmet from 'react-helmet'

import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/footer.js'

import base from './base.scss'

class Template extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { location, children } = this.props
    const manufacturers = this.props.data.allContentfulManufacturer.edges
    const articles = this.props.data.allContentfulBlogPost.edges
    const siteMetadata = this.props.data.site.siteMetadata

    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    return (
      <Container>
        <Helmet>
          <html className="has-navbar-fixed-top" lang="en" />
          <meta name="description" content={siteMetadata.description} />
          <meta property="og:title" content={siteMetadata.title} />
          <meta property="og:url" content={siteMetadata.siteUrl} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={siteMetadata.title} />
        </Helmet>
        <Navigation
          manufacturers={manufacturers}
          siteLogo={this.props.data.siteLogo.childImageSharp.resolutions}
        />
        {children()}
        <Footer manufacturers={manufacturers} articles={articles} />
      </Container>
    )
  }
}

export default Template

export const pageQuery = graphql`
  query NavigationQuery {
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
    siteLogo: file(relativePath: { eq: "loop-signature@4x.png" }) {
      childImageSharp {
        resolutions(width: 270) {
          ...GatsbyImageSharpResolutions_withWebp
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
`
