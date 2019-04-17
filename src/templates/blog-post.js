import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    const h2s = document.getElementById('postBody').getElementsByTagName('h2')

    for (var i = h2s.length - 1; i >= 0; i--) {
      h2s[i].classList.add('title')
    }
  }

  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const siteTitle = siteMetadata.title
    const post = this.props.data.contentfulBlogPost
    const person = this.props.data.contentfulPerson

    return (
      <Layout>
        <div className="article content-section">
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <SEO
            pagePath={`articles/${post.slug}`}
            postNode={post}
            postSEO
            customTitle={post.title}
            siteMetadata={siteMetadata}
            location={this.props.location}
          />
          <div className="section">
            <div className="container content">
              <h1 className="title is-size-1">{post.title}</h1>
              <div className="image">
                <Img fluid={post.heroImage.fluid} alt="" />
              </div>
              <hr />
              <div
                id="postBody"
                dangerouslySetInnerHTML={{
                  __html: post.body.childMarkdownRemark.html,
                }}
              />
              <hr />
              <div className="">
                <div className="is-pulled-left is-block">
                  <strong>{person.name}</strong> – {post.readableDate}
                </div>
                <div className="is-pulled-right is-block">
                  <div className="tags">
                    {post.tags.map(node => {
                      return (
                        <span className="tag" key={node}>
                          {node}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPerson(name: { eq: "Loop" }) {
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
        childMarkdownRemark {
          html
        }
      }
      heroImage {
        fluid(
          maxHeight: 1200
          maxWidth: 2000
          resizingBehavior: FILL
          quality: 100
        ) {
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(width: 300) {
          ...GatsbyContentfulFixed_withWebp
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
