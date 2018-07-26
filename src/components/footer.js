import React from 'react'
import Link from 'gatsby-link'

import FormSignup from './form-signup'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const manufacturers = this.props.manufacturers
    const articles = this.props.articles

    return (
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <FormSignup />
            </div>
            <div className="column is-one-third">
              <h2 className="title is-size-5">Our Manufacturers</h2>
              <ul className="tags">
                {manufacturers.map(({ node, index }) => {
                  return (
                    <li key={node.slug} className="tag">
                      <Link to={`/manufacturers/${node.slug}`} className="">
                        {node.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="column is-one-third">
              <h2 className="title is-size-5">Recent Articles</h2>
              <ul className="tags">
                {articles.map(({ node, index }) => {
                  return (
                    <li key={node.slug} className="tag">
                      <Link to={`/articles/${node.slug}`} className="">
                        {node.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="content has-text-centered">
            <p className="is-size-7">
              © Loop Architectural Materials or by permission of Loop
              Architectural Materials clients.
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
