import React from 'react'
import Helmet from 'react-helmet'

export default function generateMarkdownProductJSONLD(
  product,
  manufacturer,
  siteMetadata
) {
  return {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: product.frontmatter.title,
    image: [
      `${siteMetadata.siteUrl}${product.frontmatter.image_primary.childImageSharp.fluid.src}`,
    ],
    description: `${
      unescape(product.frontmatter.description) ||
      product.frontmatter.manufacturer ||
      ''
    }`,
    sku: `${product.id}`,
    mpn: `${product.id}`,
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
      name: manufacturer.title,
      logo: `https:${manufacturer.heroImage.fixed.src}`,
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      priceValidUntil: '2020-01-01',
      availability: 'InStock',
      url: `${siteMetadata.siteUrl}${product.frontmatter.slug}`,
    },
  }
}
