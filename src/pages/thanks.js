import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

class Thanks extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const goBack2 = e => {
      e.preventDefault()
      this.props.history.goBack()
    }

    return (
      <div>
        <Helmet title={`${siteTitle} | Thank You`} />
        <section className="section">
          <div className="container">
            <h1 className="title">Thanks for contacting us!</h1>
            <div className="columns">
              <div className="column">
                <div className="content">
                  <p>We'll get back to as soon as possible.</p>
                  <p>
                    In the meantime, you can
                    <a onClick={goBack2}>return to the previous page</a>.
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
