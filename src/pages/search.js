import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Search from '../components/search'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <div className="content-section">
        <Helmet title={`${siteTitle} | Ooops!`} />
        <section className="section">
          <div className="container content">
            <h1 className="title">Search Loop</h1>
            <p>
              Try typing a term in the search box to find something. For
              example: 'wood' or 'acoustic'.
            </p>
            <Search
              data={this.props.data}
              search={this.props.location.search}
            />
          </div>
        </section>
      </div>
    )
  }
}

export default SearchPage

export const pageQuery = graphql`
  query searchQuery {
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
