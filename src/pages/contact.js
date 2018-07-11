import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import GoogleMap from '../components/map'

class ContactPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${siteTitle} | Contact Us`}></Helmet>

        <GoogleMap />

        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>Dolore sit sit voluptate in eu tempor pariatur quis est excepteur sint consectetur occaecat anim fugiat occaecat mollit occaecat aute consequat ex aliqua aliqua in reprehenderit exercitation ad non.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>Dolore sit sit voluptate in eu tempor pariatur quis est excepteur sint consectetur occaecat anim fugiat occaecat mollit occaecat aute consequat ex aliqua aliqua in reprehenderit exercitation ad non.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>Dolore sit sit voluptate in eu tempor pariatur quis est excepteur sint consectetur occaecat anim fugiat occaecat mollit occaecat aute consequat ex aliqua aliqua in reprehenderit exercitation ad non.</p>
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
