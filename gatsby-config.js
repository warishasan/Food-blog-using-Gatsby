/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata:{
    title: "Karachi Food Guide"
  },
  /* Your site config here */
  plugins: [ 
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options:{
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyD9PhuXLnGCjrhhUo2OqajiZypKCARy_10",
          authDomain: "food-blog-c631c.firebaseapp.com",
          databaseURL: "https://food-blog-c631c.firebaseio.com",
          projectId: "food-blog-c631c",
          storageBucket: "food-blog-c631c.appspot.com",
          messagingSenderId: "775370519744",
          appId: "1:775370519744:web:ab21a057821b78d7072925",
          measurementId: "G-1F20FT4S4Q"
        }      
      }
    }
  ],
}
