require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
  ],
}
