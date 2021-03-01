import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Search from '../components/search'

class FourOhFourPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout>
        <div className="content-section">
          <Helmet title={`${siteTitle} | Ooops!`} />
          <section className="section">
            <div className="container content">
              <h1 className="title">Oops!</h1>
              <p>It appears the page you're looking for doesn't exist!</p>
              <p>
                Try typing a term in the search box to find something. For
                example: 'wood' or 'acoustic'.
              </p>
              <Search
                data={this.props.data}
                search={this.props.location.search}
                lng="en"
              />
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default FourOhFourPage

export const pageQuery = graphql`
  query fourOhFourQuery {
    site {
      siteMetadata {
        title
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
  }
`
