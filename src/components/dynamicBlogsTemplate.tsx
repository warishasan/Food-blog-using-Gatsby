import React from "react"
import PageLayout from '../pageLayouts/pageLayout'
import {graphql} from 'gatsby';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Jumbotron from 'react-bootstrap/Jumbotron'
const styles = require('./dynamicBlogsTemplate.module.css');
import Head from '../components/head'


export const query = graphql`
query($slug:String!) {
    contentfulBlogPost(slug: {eq:$slug})
  {
      title
    publishedDate(formatString:"MMM Do, YYYY")
    summary{
      json
    }
    body{
        json
    }
  
    }
  }
`


export default function DynamicBlogsemplate({data}) {

const options = {
renderNode:{
    "embedded-asset-block": (node)=>{
        const alt = node.data.target.fields.title["en-US"];
        const src = node.data.target.fields.file["en-US"].url;

        return <img alt = {alt} src = {src} ></img>
    }
}
}

return (

<div>
<PageLayout>
  <Head title = {data.contentfulBlogPost.title}/>
<div>
<h1 className = {styles.heading} >{data.contentfulBlogPost.title}</h1>
<h3 className = {styles.date} >{data.contentfulBlogPost.publishedDate}</h3>
<hr></hr>
<Jumbotron className = {styles.jumbotron}>
  <h2>Abstract</h2>
  <p>
{documentToReactComponents(data.contentfulBlogPost.summary.json)}
</p>
</Jumbotron>
<hr></hr>

<div className = {styles.body}>
{documentToReactComponents(data.contentfulBlogPost.body.json, options)}
</div>

</div>


</PageLayout>
</div>

)

}


