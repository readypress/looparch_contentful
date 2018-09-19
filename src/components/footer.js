import React from 'react'
import Link from 'gatsby-link'

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
              </ul>
            </div>
          </div>
          <div className="content has-text-centered">
            <p className="is-size-4 social-links">
              <a href="https://www.pinterest.com/looparchitecturalmaterials/" target="_blank" hrefLang="en">
                <i class="fab fa-pinterest"></i>
              </a>
              <a href="https://www.instagram.com/looparchitecturalmaterials/" target="_blank" hrefLang="en">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/looparch/" target="_blank" hrefLang="en">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="https://www.linkedin.com/company/loop-architectural-materials/" target="_blank" hrefLang="en">
                <i class="fab fa-linkedin"></i>
              </a>
            </p>
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
