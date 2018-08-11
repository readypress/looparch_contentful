import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const siteTitle = siteMetadata.title
    const post = this.props.data.contentfulBlogPost
    const person = this.props.data.contentfulPerson

    return (
      <div className="article content-section">
        <Helmet title={`${siteTitle} | ${post.title}`} />
        <SEO
          pagePath={`articles/${post.slug}`}
          postNode={post}
          postSEO
          siteMetadata={siteMetadata}
        />
        <div className="section">
          <div className="container content">
            <div className="image">
              <Img sizes={post.heroImage.sizes} alt="" />
            </div>
            <div css={{
              marginTop: '1rem'
            }}>
              <h1 className="title is-size-1">{post.title}</h1>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <hr/>
            <p>
              <strong>{person.name}</strong> – {post.readableDate}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPerson(id: {eq: "c15jwOBqpxqSAOy2eOO4S0m"}) {
      name
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      publishDate
      tags
      readableDate: publishDate(formatString: "MMMM Do, YYYY")
      description {
        internal {
          content
        }
      }
      heroImage {
        sizes(maxHeight: 1200, maxWidth: 2000, resizingBehavior: FILL) {
          ...GatsbyContentfulSizes_withWebp
        }
        resolutions(width: 300) {
          ...GatsbyContentfulResolutions_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        description
        shareImage
        shareImageWidth
        shareImageHeight
        publisher
      }
    }
  }
`
