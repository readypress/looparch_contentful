import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

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
          <Helmet>
            <script
              type="text/javascript"
              async
              defer
              src="//assets.pinterest.com/js/pinit.js"
            ></script>
          </Helmet>
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
              <GatsbyImage
                image={post.heroImage.gatsbyImageData}
                alt={post.heroImage.title}
                title={post.heroImage.title}
                className="image"
              />
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
                    {post.tags.map((node) => {
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
        title
        gatsbyImageData(height: 1200, width: 2000, quality: 100)
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
