import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Hero from '../components/hero'
import Carousel from '../components/carousel'
import ArticlePreview from '../components/article-preview'
import GoogleMap from '../components/map'

const GOGGLE_MAPS_API_KEY = "AIzaSyAY47HKj8tlW87Toy0DAzNfQFK5G9SYpVk"

class ContactPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allContentfulBlogPost.edges
    const [author] = this.props.data.allContentfulPerson.edges

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${siteTitle} | Contact Us`}></Helmet>

        <GoogleMap />

        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>Dolore sit sit voluptate in eu tempor pariatur quis est excepteur sint consectetur occaecat anim fugiat occaecat mollit occaecat aute consequat ex aliqua aliqua in reprehenderit exercitation ad non.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>Dolore sit sit voluptate in eu tempor pariatur quis est excepteur sint consectetur occaecat anim fugiat occaecat mollit occaecat aute consequat ex aliqua aliqua in reprehenderit exercitation ad non.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Title</h2>
            <p>Dolore sit sit voluptate in eu tempor pariatur quis est excepteur sint consectetur occaecat anim fugiat occaecat mollit occaecat aute consequat ex aliqua aliqua in reprehenderit exercitation ad non.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">Recent articles</h2>
            <div className="columns">
              {posts.map(({ node }) => {
                return (
                  <div key={node.slug} className="column is-one-third">
                    <ArticlePreview article={node} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ContactPage

export const pageQuery = graphql`
  query ContactQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            file {
              url
            }
            sizes(maxHeight:300,resizingBehavior:CROP) {
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
            resolutions(height:100,width:300) {
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(filter: { id: { eq: "c15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          image {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
