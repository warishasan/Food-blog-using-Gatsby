module.exports.createPages = async ({graphql, actions}) => {
const { createPage } = actions
const blogTemplate = require.resolve(`./src/components/dynamicBlogsTemplate.tsx`)
const res = await graphql(`
query {
    allContentfulBlogPost 
  {
      edges{
             node{
          slug
        }
      }
    }
  }
`)


res.data.allContentfulBlogPost.edges.forEach((edge) => {
createPage({
    component: blogTemplate,
    path: `/blogs/${edge.node.slug}`,
    context: {
        slug: edge.node.slug
    }
})

})

}

