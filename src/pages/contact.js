import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import GoogleMap from '../components/map'
import ContactForm from '../components/contact-form'

class ContactPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <div>
        <Helmet title={`${siteTitle} | Contact Us`} />
        <GoogleMap />
        <section className="section">
          <div className="container">
            <h1 className="title">Contact Us</h1>
            <div className="columns">
              <div className="column is-two-thirds">
                <ContactForm />
              </div>
              <div className="column">
                <div className="content">
                  <p>
                    We’d love to hear from you. If you’re interested in
                    receiving samples or talking to us about any of our product
                    lines, feel free to fill out the form.
                  </p>
                  <p>Our mailing address is:</p>
                  <p>
                    <strong>Loop Architectural Materials</strong>
                    <br />3310 N 16th Street<br />Phoenix, AZ 85016
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
