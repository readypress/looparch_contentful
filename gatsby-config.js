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
    shareImageHeight: 60,
    shareImage: '/images/loop-signature-share.png',
    publisher: 'Loop Architectural Materials',
    author: 'Loop Architectural Materials',
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-glamor',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
        theme_color: "#0BA24A",
        display: "standalone",
        icon: "src/images/logo.png", // This path is relative to the root of the site.
      },
    },
    {
    resolve: `gatsby-plugin-favicon`,
    options: {
      logo: "./src/images/logo.png",
      // WebApp Manifest Configuration
      appName: "Loop Architectural Materials",
      appDescription: "Loop Architectural Materials Website",
      developerName: "Loop",
      developerURL: "https://looparch.com",
      dir: 'auto',
      lang: 'en-US',
      background: '#fff',
      theme_color: '#0BA24A',
      display: 'standalone',
      orientation: 'any',
      start_url: '/',
      version: '1.0',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        twitter: true,
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
    resolve: 'gatsby-plugin-lunr',
    options: {
      languages: [
        {
          name: 'en',
          filterNodes: node => {
            return node
          }
        }
      ],
      fields: [
        { name: 'title', store: true },
        { name: 'tag', store: true},
        { name: 'tags', store: true},
        { name: 'type', store: true},
        { name: 'slug', store: true},
        { name: 'manufacturer', store: true },
        { name: 'id', store: true}
      ],
      resolvers: {
        ContentfulManufacturer: {
          id: node => node.id,
          title: node => node.title,
          tags: node => node.tags,
          type: node => node.internal.type,
          slug: node => node.slug,
        },
        ContentfulProduct: {
          id: node => node.id,
          title: node => node.title,
          tags: node => [node.tag],
          extra_tags: node => node.tags,
          type: node => node.internal.type,
          slug: node => node.title,
          manufacturer: node => {
            return node.manufacturer___NODE
          }
        },
        ContentfulBlogPost: {
          id: node => node.id,
          title: node => node.title,
          tags: node => node.tags,
          type: node => node.internal.type,
          slug: node => node.slug
        }
      },
      filename: 'search_index.json'
    }
  },
  `gatsby-plugin-offline`,
  `gatsby-plugin-netlify`,
  ],
}
