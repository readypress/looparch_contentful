import React from 'react'
import CarouselCss from './carousel-css'

export default ({ posts }) => (
  <section className="hero is-medium is-dark is-bold">
    <CarouselCss posts={posts} />
  </section>
)
