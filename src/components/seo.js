import React from 'react'
import { Helmet } from 'react-helmet'
import { getSrc } from 'gatsby-plugin-image'

class SEO extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      postNode,
      pagePath,
      postSEO,
      pageSEO,
      articleSEO,
      customTitle,
      siteMetadata,
      location,
      products,
    } = this.props
    const siteImage = `${siteMetadata.siteUrl}${siteMetadata.shareImage}`
    let title
    let description
    let image
    let imgWidth
    let imgHeight
    let pageUrl
    let dateModified = new Date()
    let keywords = [postNode.title].concat(postNode.tags)

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
    if (postSEO || articleSEO) {
      image = `https:${getSrc(postNode.heroImage.gatsbyImageData)}`
      imgWidth = postNode.heroImage.gatsbyImageData.width
      imgHeight = postNode.heroImage.gatsbyImageData.height
      dateModified = postNode.publishDate
      pageUrl = `${siteMetadata.siteUrl}/${pagePath}/`
    }

    // Default Website Schema
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        alternateName: siteMetadata.title,
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://looparch.com/search/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: siteMetadata.title,
        legalName: `${siteMetadata.title}, LLC`,
        url: siteMetadata.siteUrl,
        logo: siteImage,
        foundingDate: '2009',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '3110 N 16th Street',
          addressLocality: 'Phoenix',
          addressRegion: 'AZ',
          postalCode: '85016',
          addressCountry: 'USA',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'info@looparch.com',
          url: `${siteMetadata.siteUrl}/contact/`,
        },
        sameAs: [
          'https://www.instagram.com/looparchitecturalmaterials/',
          'https://www.facebook.com/looparch/',
        ],
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
          addressCountry: 'USA',
        },
        telephone: '602-810-1502',
        image: siteImage,
        priceRange: '$$$',
        description: `${siteMetadata.description}`,
        name: siteMetadata.title,
        openingHours: 'Mo,Tu,We,Th,Fr 09:00-17:00',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '33.484319',
          longitude: '-112.047970',
        },
        sameAs: [
          'https://www.instagram.com/looparchitecturalmaterials/',
          'https://www.facebook.com/looparch/',
          'https://www.pinterest.com/looparchitecturalmaterials',
        ],
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
                '@id': `${siteMetadata.siteUrl}/${
                  this.props.pagePath.split('/')[0]
                }/`,
                name: `${this.props.pagePath.split('/')[0]}`,
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@id': pageUrl,
                name: title,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'NewsArticle',
          mainEntityOfPage: {
            '@type': 'WebPage',
            url: pageUrl,
          },
          headline: title,
          image: [image],
          datePublished: postNode.publishDate,
          dateModified: dateModified,
          author: {
            '@type': 'Person',
            name: siteMetadata.publisher,
            url: siteMetadata.siteUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: siteMetadata.publisher,
            url: siteMetadata.siteUrl,
            logo: {
              '@type': 'ImageObject',
              name: 'Loop Architectural Materials Logo',
              width: `600`,
              height: `60`,
              url: `${siteMetadata.siteUrl}${siteMetadata.shareImage}`,
            },
          },
          description: postNode.description.childMarkdownRemark.html,
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
        description: description,
      })
    }

    if (products) {
      products.forEach((edge) => {
        const product = edge.node
        schemaOrgJSONLD.push({
          '@context': 'http://schema.org',
          '@type': 'Product',
          name: product.title,
          image: [`https:${product.productImage.file.url}`],
          description: `${
            product.description
              ? product.description.childMarkdownRemark.html
              : ''
          } - Inquire for pricing`,
          sku: `${product.contentful_id}`,
          mpn: `${product.contentful_id}`,
          review: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: siteMetadata.publisher,
              url: siteMetadata.siteUrl,
            },
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '1',
          },
          brand: {
            '@type': 'Brand',
            name: postNode.title,
            logo: `https:${postNode.heroImage.fixed.src}`,
          },
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD',
            priceValidUntil: '2020-01-01',
            availability: 'InStock',
            url: `${pageUrl}`,
          },
        })
      })
    }

    return (
      <Helmet>
        {/* General tags */}
        <meta name="keywords" content={keywords.join(',')} />
        <meta name="image" content={image} />
        <meta name="description" content={description} />
        <meta name="application-name" content="Loop Architectural Materials" />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        <script
          async
          src="https://chimpstatic.com/mcjs-connected/js/users/6236ae131b11b8506326eed86/943d564cd0b36996e264a468a.js"
        ></script>

        {/* OpenGraph tags */}
        <meta property="og:title" content={title} />
        {postSEO ? (
          <meta property="og:type" content="article" />
        ) : (
          <meta property="og:type" content="article" />
        )}
        <meta
          property="article:author"
          content="Loop Architectural Materials"
        />
        <meta
          property="article:published_time"
          content={postNode.publishDate}
        />
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
