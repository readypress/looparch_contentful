import React from 'react'
import Slider from 'react-slick'
import CarouselPreview from './article-preview'

class Carousel extends React.Component {
  render() {
    const posts = this.props.posts
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    }
    return (
      <Slider {...settings}>
        {posts.map(({ node }) => {
          return (
            <div key={node.slug} className="column is-one-third">
              <ArticlePreview article={node} />
            </div>
          )
        })}
      </Slider>
    )
  }
}

export default Carousel
