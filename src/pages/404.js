import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Search from '../components/search'

class Thanks extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <div className="content-section">
        <Helmet title={`${siteTitle} | Ooops!`} />
        <section className="section">
          <div className="container">
            <Search data={this.props.data} />
          </div>
        </section>
      </div>
    )
  }
}

export default Thanks

export const pageQuery = graphql`
  query oopsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulProduct {
      edges {
        node {
          id
          title
          tags: tag
          manufacturer_id: manufacturer {
            id
          }
          internal {
            type
          }
        }
      }
    }
    allContentfulManufacturer {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
    siteSearchIndex {
      index
    }
  }
`
