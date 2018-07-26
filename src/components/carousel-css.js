import React from 'react'
import CarouselPreview from './carousel-preview'

import styles from './carousel-css.sass'

class CarouselCss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselItems: {},
      slideIndex: 1,
    }
  }

  componentDidMount() {
    this.setState(
      { carouselItems: document.getElementsByClassName('slide') },
      n => {
        this.showSlide(1)
      }
    )
  }

  playSlides = () => {
    setInterval(() => {
      this.incrementSlides(+1)
    }, 5000)
  }

  incrementSlides = n => {
    this.setState(
      prevState => {
        let current = (prevState.slideIndex += n)
        const items = this.state.carouselItems
        if (current > items.length) {
          current = 1
        }
        if (current < 1) {
          current = items.length
        }
        return { slideIndex: current }
      },
      () => {
        this.showSlide(this.state.slideIndex)
      }
    )
  }

  showSlide = n => {
    let i
    const items = this.state.carouselItems
    if (n > items.length) {
      this.setState({ slideIndex: 1 })
    }
    if (n < 1) {
      this.setState({ slideIndex: items.length })
    }
    for (i = items.length - 1; i >= 0; i--) {
      items[i].classList.add('hidden')
      items[i].classList.remove('visible')
    }

    items[this.state.slideIndex - 1].classList.add('visible')
    items[this.state.slideIndex - 1].classList.remove('hidden')
  }

  render() {
    const posts = this.props.posts
    return (
      <div className="carousel-css">
        {posts.map(({ node }) => {
          return (
            <div key={node.slug} className="slide">
              <CarouselPreview article={node} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default CarouselCss
