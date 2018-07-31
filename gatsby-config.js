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

// Algolia
const blogPostQuery = `{
  allContentfulBlogPost {
    edges {
      node {
        title
        slug
        body {
          childMarkdownRemark {
            html
          }
        }
        tags
      }
    }
  }
}`

const manufacturerQuery = `{
  allContentfulManufacturer {
    edges {
      node {
        title
        slug
        body:description {
          childMarkdownRemark {
            html
          }
        }
        tags
      }
    }
  }
}`

const queries = [
  {
    blogPostQuery,
    transformer: ({ data }) => data.allContentfulBlogPost.edges.map(({ node }) => node), // optional
    // indexName: 'production_LOOP_SEARCH', // overrides main index name, optional
  }
];

module.exports = {
  siteMetadata: {
    title: 'Loop Architectural Materials',
    siteUrl: process.env.SITE_URL || 'https://looparch.com',
    description: 'Loop Architectural Materials represents leading brands in contract furniture, glass, decorative architectural and interior design products in Arizona.',
    mapKey: process.env.LOOPARCH_MAPS_KEY || '',
    placeId: process.env.LOOPARCH_PLACE_ID || '',
    shareImageWidth: 600,
    shareImageHeight: 600,
    shareImage: '/favicons/apple-touch-icon-180x180.png',
    publisher: 'Loop Architectural Materials'
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-glamor',
    'gatsby-plugin-offline',
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
        theme_color: "#a2466c",
        display: "minimal-ui",
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
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: '9OOM2W0UN7',
        apiKey: '396a7b45e67aa240d35daa5d1811efb1',
        indexName: `${process.env.NODE_ENV}_LOOP_SEARCH`, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ],
}
