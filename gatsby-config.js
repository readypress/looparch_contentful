require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  siteMetadata: {
    title: 'Loop Architectural Materials',
    siteUrl: process.env.SITE_URL || 'https://looparch.com',
    description:
      'Design & technical partner to the Arizona A+D community, Loop Architectural Materials represents leading brands in contract furniture, glass, and architectural/interior design products.',
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
    'gatsby-plugin-image',
    'gatsby-plugin-glamor',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1344,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: './src/markdown-pages/',
      },
      __key: 'markdown-pages',
    },
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
        name: 'Loop Architectural Materials',
        short_name: 'Loop',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0BA24A',
        display: 'standalone',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
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
        }`,
      },
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
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.edges.map((edge) => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    description: `<img src="https:${edge.node.heroImage.file.url}"><br /><br />${edge.node.childContentfulBlogPostBodyTextNode.childMarkdownRemark.excerpt}`,
                    date: edge.node.publishDate,
                    url: `${site.siteMetadata.siteUrl}/articles/${edge.node.slug}`,
                    guid: `${site.siteMetadata.siteUrl}/articles/${edge.node.slug}`,
                    custom_elements: [
                      {
                        'content.encoded':
                          edge.node.childContentfulBlogPostBodyTextNode
                            .childMarkdownRemark.html,
                      },
                    ],
                  }
                )
              })
            },
            query: `
              {
                allContentfulBlogPost(sort: {order: DESC, fields: publishDate}) {
                  edges {
                    node {
                      title
                      slug
                      publishDate
                      heroImage {
                        file {
                          url
                        }
                      }
                      childContentfulBlogPostBodyTextNode {
                        childMarkdownRemark {
                          excerpt
                          html
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Loop Architectural Materials',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          {
            name: 'en',
            filterNodes: (node) => {
              return node
            },
          },
        ],
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'tag', store: true },
          { name: 'tags', store: true },
          { name: 'type', store: true },
          { name: 'slug', store: true },
          { name: 'manufacturer', store: true },
          { name: 'manufacturerTitle', store: true },
          { name: 'id', store: true },
        ],
        resolvers: {
          ContentfulManufacturer: {
            id: (node) => node.id,
            title: (node) => node.title,
            tags: (node) => node.tags,
            type: (node) => node.internal.type,
            slug: (node) => node.slug,
          },
          ContentfulBlogPost: {
            id: (node) => node.id,
            title: (node) => node.title,
            tags: (node) => node.tags,
            type: (node) => node.internal.type,
            slug: (node) => node.slug,
          },
          MarkdownRemark: {
            id: (node) => node.id,
            title: (node) => node.frontmatter.title,
            tags: (node) => node.frontmatter.tags,
            type: (node) => node.internal.type,
            slug: (node) => node.frontmatter.slug,
          },
        },
        filename: 'search_index.json',
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
}
