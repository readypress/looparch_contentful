import React from 'react'
import Helmet from 'react-helmet'
// import config from '../utils/siteConfig'

class SEO extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { postNode, pagePath, postSEO, pageSEO, customTitle, siteMetadata } = this.props
    let title
    let description
    let image
    let imgWidth
    let imgHeight
    let pageUrl

    // Set Default OpenGraph Parameters for Fallback
    title = siteMetadata.title
    description = siteMetadata.description
    image = `${siteMetadata.siteUrl}${siteMetadata.shareImage}`
    imgWidth = siteMetadata.shareImageWidth
    imgHeight = siteMetadata.shareImageHeight
    pageUrl = siteMetadata.siteUrl

    if (customTitle) {
      title = postNode.title
      pageUrl = siteMetadata.siteUrl + '/' + pagePath + '/'
    }

    // Replace with Page Parameters if post or page
    if (postSEO || pageSEO) {
      title = postNode.title
      description = postNode.description.internal.content.split('\n')[0]
      if (pagePath.length > 1) {
        pageUrl = siteMetadata.siteUrl + '/' + pagePath + '/'
      } else {
        pageUrl = siteMetadata.siteUrl + '/'
      }
    }
    // Use Hero Image for OpenGraph
    if (postSEO) {
      image = `https:${postNode.heroImage.resolutions.src}`
      imgWidth = postNode.heroImage.resolutions.width
      imgHeight = postNode.heroImage.resolutions.height
    }

    // Default Website Schema
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        alternateName: siteMetadata.title,
      },
      {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: siteMetadata.title,
        legalName: `${siteMetadata.title}, LLC`,
        url: siteMetadata.siteUrl,
        logo: image,
        foundingDate: "2009",
        address: {
          '@type': 'PostalAddress',
          streetAddress: '3110 N 16th Street',
          addressLocality: 'Phoenix',
          addressRegion: 'AZ',
          postalCode: '85016',
          addressCountry: 'USA'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'info@looparch.com',
          url: `${siteMetadata.siteUrl}/contact/`
        },
        sameAs: [
          'https://www.instagram.com/looparchitecturalmaterials/',
          'https://www.facebook.com/looparch/'
        ]
      },
      {
        '@context': 'http://schema.org',
        '@type': 'LocalBusiness',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '3110 N 16th Street',
          addressLocality: 'Phoenix',
          addressRegion: 'AZ',
          postalCode: '85016',
          addressCountry: 'USA'
        },
        telephone: '602-810-1502',
        image: image,
        priceRange: '$$$',
        description: `${siteMetadata.description}`,
        name: siteMetadata.title,
        openingHours: "Mo,Tu,We,Th,Fr 09:00-17:00",
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '33.484319',
          longitude: '-112.047970'
        },
        sameAs: [
          'https://www.instagram.com/looparchitecturalmaterials/',
          'https://www.facebook.com/looparch/'
        ]
      },
    ]

    // Blog Post Schema
    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': siteMetadata.siteUrl,
                name: siteMetadata.title,
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': pageUrl,
                name: title,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: pageUrl,
          name: title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
            width: imgWidth,
            height: imgHeight,
          },
          author: {
            '@type': 'Person',
            name: siteMetadata.author,
            url: siteMetadata.authorUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: siteMetadata.publisher,
            url: siteMetadata.siteUrl,
          },
          datePublished: postNode.publishDate,
          mainEntityOfPage: pageUrl,
        }
      )
    }

    // Page SEO Schema
    if (pageSEO) {
      schemaOrgJSONLD.push({
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        url: pageUrl,
        name: title,
        description: description
      })
    }

    return (
      <Helmet>
        {/* General tags */}
        <meta name="image" content={image} />
        <meta name="description" content={description} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:title" content={title} />
        {postSEO ? <meta property="og:type" content="article" /> : null}

        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={imgWidth} />
        <meta property="og:image:height" content={imgHeight} />
        <meta property="og:description" content={description} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={siteMetadata.userTwitter ? siteMetadata.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    )
  }
}

export default SEO
