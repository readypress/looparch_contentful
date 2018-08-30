require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Contentful
let contentfulConfig

try {
  contentfulConfig = require('./.contentful')
} catch (_) {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  }
} finally {
  const { spaceId, accessToken } = contentfulConfig

  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful spaceId and the delivery token need to be provided.'
    )
  }
}

module.exports = {
  siteMetadata: {
    title: 'Loop Architectural Materials',
    siteUrl: process.env.SITE_URL || 'https://looparch.com',
    description: 'Design & technical partner to the Arizona A+D community, Loop Architectural Materials represents leading brands in contract furniture, glass, and architectural / interior design products.',
    mapKey: process.env.LOOPARCH_MAPS_KEY || '',
    placeId: process.env.LOOPARCH_PLACE_ID || '',
    recaptchaKey: process.env.SITE_RECAPTCHA_KEY || '',
    shareImageWidth: 600,
    shareImageHeight: 600,
    shareImage: '/images/loop-signature-share.png',
    publisher: 'Loop Architectural Materials',
    author: 'Loop Architectural Materials',
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-glamor',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-netlify`,
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
    resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
    resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Loop Architectural Materials",
        short_name: "Loop",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#a2466c",
        display: "standalone",
        icon: "src/images/logo.png", // This path is relative to the root of the site.
      },
    },
    {
    resolve: `gatsby-plugin-favicon`,
    options: {
      logo: "./src/images/logo.png",
      injectHTML: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        twitter: false,
        yandex: false,
        windows: false
      }
    }
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      output: `/sitemap.xml`,
      exclude: [`/thanks`],
      query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
      }`
    }
  },
  {
    resolve: `gatsby-plugin-google-tagmanager`,
    options: {
      id: process.env.LOOPARCH_TAG_MANAGER_ID,
      includeInDevelopment: false,
    },
  },
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: process.env.SITE_URL || 'https://looparch.com',
    },
  },
  {
    resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
    options: {
      // Fields to index
      fields: [
        'title',
        'tags',
        'type',
        'slug',
      ],
      // How to resolve each field's value for a supported node type
      resolvers: {
        // For any node of type MarkdownRemark, list how to resolve the fields' values
        ContentfulManufacturer: {
          title: node => node.title,
          tags: node => node.tags,
          type: node => node.internal.type,
          slug: node => node.slug,
        },
        ContentfulProduct: {
          title: node => node.title,
          tags: node => [node.tag],
          type: node => node.internal.type,
          slug: node => node.title,
          manufacturer: node => node.manufacturer___NODE
        },
        ContentfulBlogPost: {
          title: node => node.title,
          tags: node => node.tags,
          type: node => node.internal.type,
          slug: node => node.slug
        }
      },
    },
  },
  ],
}
