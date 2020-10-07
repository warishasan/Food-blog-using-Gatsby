import React from "react"
import PageLayout from '../pageLayouts/pageLayout'
import {Link,graphql,useStaticQuery} from 'gatsby';
import Jumbotron from 'react-bootstrap/Jumbotron'
const styles = require('./blogs.module.css');
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Image from 'react-bootstrap/Image'
import Head from '../components/head'


export default function Blogs() {
 
const data = useStaticQuery(graphql`query {
  allContentfulBlogPost (sort:{
    fields:publishedDate
    order:DESC
  })
{
    edges{
   		node{
        title
        slug
        publishedDate(formatString:"MMM Do, YYYY")
        summary{
          json
        }
        thumbnail{
          file{
            url
            fileName
          }
        }
      }
    }
  }
}
`)


  return (
<div>
<PageLayout>
<Head title = "Blogs" />

<div  className = {styles.pageLayout} >
 {data.allContentfulBlogPost.edges.map((edge,ind)=>{
   return(

<Jumbotron className = {styles.jumbotorn} key = {ind} >
<Link className = {styles.link} to = {`/blogs/${edge.node.slug}`}>
  <div className = {styles.blogContentContainer}>
  <Image className = {styles.blogImage} src={edge.node.thumbnail.file.url} alt = {edge.node.thumbnail.file.fileName} fluid   />

    <div className = {styles.blogTextContentContainer}>
   <h2 className = {styles.blogHeading}>{edge.node.title}</h2>
    <h3 className = {styles.blogDate}>{edge.node.publishedDate}</h3>
    <div className = {styles.blogSummary}>
    {documentToReactComponents(edge.node.summary.json)}
    </div>
   
    </div>
    </div>
    </Link>
</Jumbotron> )

 })}
 </div>
</PageLayout>
</div>
  );
}


