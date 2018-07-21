import React from 'react'
import Img from 'gatsby-image'

import styles from './manufacturer-hero.sass'

class ManufacturerHero extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const post = this.props.post

    return (
      <div className={'hero is-dark is-bold img-hero'}>
        <div className="hero-image">
          <Img
            sizes={post.heroImage.sizes}
            alt={post.heroImage.description}
            outerWrapperClassName="hero-img"
            className="image"
            css={{
              zIndex: 1,
              width: '100% !important',
              height: '100% !important',
            }}
          />
          <div
            className="dark-background is-overlay"
            css={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 2,
            }}
          />
        </div>
        <div className="hero-body has-text-centered">
          <Img
            sizes={post.logoImageLight.resize}
            alt={post.logoImageLight.description}
            outerWrapperClassName="hero-logo"
            css={{
              zIndex: 3,
            }}
          />
        </div>
      </div>
    )
  }
}

export default ManufacturerHero
