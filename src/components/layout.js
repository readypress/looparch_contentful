import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/footer.js'

import base from './base.scss'

// class Template extends React.Component {
//   constructor(props) {
//     console.log(props)
//     super(props)
//   }

//   render() {
//     const { location, children, data } = this.props
//     const manufacturers = this.props.data.allContentfulManufacturer.edges
//     const articles = this.props.data.allContentfulBlogPost.edges
//     const siteMetadata = this.props.data.site.siteMetadata

//     let header

//     let rootPath = `/`
//     if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
//       rootPath = __PATH_PREFIX__ + `/`
//     }
//     return (
//       <StaticQuery
//         query={graphql`
//           query LayoutQuery {
//             allContentfulManufacturer(sort: { fields: [title], order: ASC }) {
//               edges {
//                 node {
//                   id
//                   title
//                   slug
//                 }
//               }
//             }
//             allContentfulBlogPost(
//               limit: 5
//               sort: { fields: [publishDate], order: DESC }
//             ) {
//               edges {
//                 node {
//                   id
//                   title
//                   slug
//                 }
//               }
//             }
//             siteLogo: file(relativePath: { eq: "loop-signature@4x.png" }) {
//               childImageSharp {
//                 fixed(width: 270, quality:100) {
//                   ...GatsbyImageSharpFixed_withWebp_noBase64
//                 }
//               }
//             }
//             site {
//               siteMetadata {
//                 title
//                 siteUrl
//                 description
//               }
//             }
//           }
//         `}
//         render={ siteMetadata => (
//           <Container>
//             <Helmet>
//               <html className="has-navbar-fixed-top" lang="en" />
//               <meta name="p:domain_verify" content="166b8bf16af4de614dccd2ea61cb0dc6"/>
//               <meta name="description" content={siteMetadata.description} />
//               <meta property="og:title" content={siteMetadata.title} />
//               <meta property="og:url" content={siteMetadata.siteUrl} />
//               <meta property="og:locale" content="en_US" />
//               <meta property="og:site_name" content={siteMetadata.title} />
//             </Helmet>
//             <Navigation
//               manufacturers={manufacturers}
//               siteLogo={this.props.data.siteLogo.childImageSharp.resolutions}
//             />
//             { children }
//             <Footer manufacturers={manufacturers} articles={articles} />
//           </Container>
//         )}
//       />
//     )
//   }
// }

// export default Template

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        allContentfulManufacturer(sort: { fields: [title], order: ASC }) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        allContentfulBlogPost(
          limit: 5
          sort: { fields: [publishDate], order: DESC }
        ) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        siteLogo: file(relativePath: { eq: "loop-signature@4x.png" }) {
          childImageSharp {
            fixed(width: 270, quality:100) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <html className="has-navbar-fixed-top" lang="en" />
          <meta name="p:domain_verify" content="166b8bf16af4de614dccd2ea61cb0dc6"/>
          <meta name="description" content={data.site.siteMetadata.description} />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content={data.site.siteMetadata.title} />
        </Helmet>
        <Navigation
          manufacturers={data.allContentfulManufacturer.edges}
          siteLogo={data.siteLogo.childImageSharp}
        />
        <div>
          {children}
        </div>
        <Footer manufacturers={data.allContentfulManufacturer.edges} articles={data.allContentfulBlogPost.edges} />
      </>
    )}
  />
)
