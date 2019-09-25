import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

class Thanks extends React.Component {
  constructor(props) {
    super(props)
  }

  goBack = e => {
    e.preventDefault()
    window.history.back()
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout>
        <div className="content-section">
          <Helmet title={`${siteTitle} | Thank You`} />
          <section className="section">
            <div className="container">
              <h1 className="title">Thanks for contacting us!</h1>
              <div className="columns">
                <div className="column">
                  <div className="content">
                    <p>We'll get back to as soon as possible.</p>
                    <p>
                      In the meantime, you can{' '}
                      <a onClick={this.goBack}>return to the previous page</a>.
                    </p>
                    <p>
                      ...Or fill out the form below to join our mailing list.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Thanks

export const pageQuery = graphql`
  query ThanksQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
