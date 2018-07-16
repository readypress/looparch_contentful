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
            <Link className="navbar-item" to="/">
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
              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/manufacturers/" className="navbar-link">
                  Manufacturers
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
                      >
                        {node.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
              <Link to="/contact/" className="navbar-item">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
