import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './navigation.sass'

class Navigation extends React.Component {
  toggleNav() {
    const navMenu = document.getElementById('LoopNavMenu')
    const navBurger = document.querySelectorAll('.navbar-burger')[0]

    navMenu.classList.toggle('is-active')
    navBurger.classList.toggle('is-active')
  }

  render() {
    return (
      <nav
        className="navbar loop-navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/" hrefLang="en">
              <Img resolutions={this.props.siteLogo} />
            </Link>
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="LoopNavMenu"
              onClick={this.toggleNav}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div id="LoopNavMenu" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable navbar-smaller">
                <Link
                  to="/manufacturers/"
                  className="navbar-link"
                  onClick={this.toggleNav}
                  hrefLang="en"
                >
                  Our Manufacturers
                </Link>
                <div
                  id="ManufacturersDropdown"
                  className="navbar-dropdown is-right"
                  onClick={this.toggleNav}
                >
                  {this.props.manufacturers.map(({ node, index }) => {
                    return (
                      <Link
                        key={node.id}
                        to={`/manufacturers/${node.slug}`}
                        className="navbar-item"
                        hrefLang="en"
                      >
                        {node.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
              <Link
                to="/contact/"
                className="navbar-item navbar-smaller"
                hrefLang="en"
              >
                Contact Us
              </Link>
              <Link
                to="/search/"
                className="navbar-item navbar-smaller"
                hrefLang="en"
              >
                <span className="icon is-large">
                  <i className="fas fa-search"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
