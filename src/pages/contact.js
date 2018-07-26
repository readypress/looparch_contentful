import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import GoogleMap from '../components/map'
import FormContact from '../components/form-contact'

class ContactPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const manufacturers = this.props.data.allContentfulManufacturer || {
      edges: [],
    }

    return (
      <div className="content-section">
        <Helmet title={`${siteTitle} | Contact Us`} />
        <GoogleMap />
        <section className="section">
          <div className="container">
            <h1 className="title is-size-4">Contact Us</h1>
            <div className="columns">
              <div className="column is-two-thirds">
                <FormContact
                  section="Contact Us"
                  manufacturers={manufacturers}
                />
              </div>
              <div className="column">
                <div className="content">
                  <p>
                    We’d love to hear from you. If you’re interested in
                    receiving samples or talking to us about any of our product
                    lines, feel free to fill out the form.
                  </p>
                  <p>Our showroom address is:</p>
                  <p>
                    <strong>Loop Architectural Materials</strong>
                    <br />
                    3310 N 16th Street
                    <br />
                    Phoenix, AZ 85016
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ContactPage

export const pageQuery = graphql`
  query ContactQuery {
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
      }
    }
  }
`
