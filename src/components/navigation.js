import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

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
              <StaticImage
                src="../images/loop-signature@4x.png"
                alt="Loop Architectural Materials Logo"
                width={271}
                height={28}
                quality={100}
                backgroundColor="#FFFFFF"
              />
              <span className="is-sr-only">Loop Architectural Materials</span>
            </Link>
            <a
              role="button"
              className="navbar-burger no-print"
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
                title="Search"
              >
                <span className="icon is-large">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="svg-inline--fa fa-search fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{
                      position: 'absolute',
                      maxWidth: '1rem',
                      maxHeight: '1rem',
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
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
