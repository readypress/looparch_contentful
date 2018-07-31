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

    return (
      <div className="article content-section">
        <Helmet title={`${siteTitle} | ${post.title}`} />
        <SEO
          pagePath={`articles/${post.slug}`}
          postNode={post}
          postSEO
          siteMetadata={siteMetadata}
        />
        <div>
          <Img sizes={post.heroImage.sizes} alt="" />
        </div>
        <div className="section">
          <div className="container content">
            <h1 className="title">{post.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      publishDate
      description {
        internal {
          content
        }
      }
      heroImage {
        sizes(maxWidth: 800) {
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
