function generateMarkdownProductJSONLD(product, manufacturer, siteMetadata) {
  console.log(product, manufacturer, siteMetadata)
  return {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [`https:${product.image_primary.childImageSharp.fluid.src}`],
    description: `${product.description || ''}`,
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
  }
}

export default generateMarkdownProductJSONLD
