import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './navigation.scss'

const Navigation = ({ manufacturers, siteLogo }) => (
  <nav
    className="navbar loop-navbar"
    role="navigation"
    aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <Img resolutions={siteLogo} />
        </Link>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="LoopNavMenu" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link to="/manufacturers/" className="navbar-link">
              Manufacturers
            </Link>
            <div id="ManufacturersDropdown" className="navbar-dropdown">
              {manufacturers.map(({ node, index }) => {
                return (
                  <Link key={node.id} to={`/manufacturers/${node.slug}`} className="navbar-item">
                    {node.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Navigation
