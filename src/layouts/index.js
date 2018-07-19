import React from 'react'
import Helmet from 'react-helmet'

import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/footer.js'

import base from './base.scss'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    return (
      <Container>
        <Helmet>
          <html className="has-navbar-fixed-top" lang="en" />
          <meta
            name="description"
            content="Loop Architectural Materials represents leading brands in contract furniture, glass, decorative architectural and interior design products in Arizona."
          />
        </Helmet>
        <Navigation
          manufacturers={this.props.data.allContentfulManufacturer.edges}
          siteLogo={this.props.data.siteLogo.childImageSharp.resolutions}
        />
        {children()}
        <Footer />
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
    siteLogo: file(relativePath: { eq: "loop-signature@4x.png" }) {
      childImageSharp {
        resolutions(width: 220) {
          ...GatsbyImageSharpResolutions_withWebp
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
