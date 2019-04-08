import React from 'react'
import { Link } from 'gatsby'

import FormSignup from './form-signup'

import styles from './footer.scss'

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
            <div className="column is-one-third no-print">
              <FormSignup />
            </div>
            <div className="column is-one-third">
              <h2 className="title is-size-5">Our Manufacturers</h2>
              <ul className="tags">
                {manufacturers.map(({ node, index }) => {
                  return (
                    <li key={node.slug} className="tag">
                      <Link to={`/manufacturers/${node.slug}`} hrefLang="en">
                        {node.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="column is-one-third no-print">
              <h2 className="title is-size-5">Recent Articles</h2>
              <ul className="tags">
                {articles.map(({ node, index }) => {
                  return (
                    <li key={node.slug} className="tag">
                      <Link to={`/articles/${node.slug}`} hrefLang="en">
                        {node.title}
                      </Link>
                    </li>
                  )
                })}
                <li className="tag">
                  <Link to={`/articles/`}>More...</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="content has-text-centered">
            <p className="is-size-4 social-links">
              <a href="https://www.pinterest.com/looparchitecturalmaterials/" target="_blank" hrefLang="en" rel="noopener">
                <i className="fab fa-pinterest"></i>
                <span className="is-sr-only">Pinterest</span>
              </a>
              <a href="https://www.instagram.com/looparchitecturalmaterials/" target="_blank" hrefLang="en" rel="noopener">
                <i className="fab fa-instagram"></i>
                <span className="is-sr-only">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/loop-architectural-materials/" target="_blank" hrefLang="en" rel="noopener">
                <i className="fab fa-linkedin"></i>
                <span className="is-sr-only">LinkedIn</span>
              </a>
            </p>
          </div>
          <div className="content has-text-centered">
            <p className="is-size-7">
              © Loop Architectural Materials or by permission of our manufacturers.
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
