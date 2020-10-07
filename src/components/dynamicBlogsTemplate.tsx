import React from "react"
import PageLayout from '../pageLayouts/pageLayout'
import {graphql} from 'gatsby';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Jumbotron from 'react-bootstrap/Jumbotron'
const styles = require('./dynamicBlogsTemplate.module.css');
import Head from '../components/head'
import firebase from "gatsby-plugin-firebase"
import { store, setShowAuthPage } from "../redux/reducer"


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


  const[user,setUser] = React.useState<null | Object>(null);

  React.useEffect (()=>{

  
    let ignore = false;

  function fetchUser (){

    firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      if (ignore === false ) {
       setUser(user)
      }
    } else {
      if (ignore === false ) {

        setUser(null)
      }
    }
  });
}

fetchUser()
return () => { ignore = true };

},[])






const options = {
renderNode:{
    "embedded-asset-block": (node)=>{
        const alt = node.data.target.fields.title["en-US"];
        const src = node.data.target.fields.file["en-US"].url;

        return <img alt = {alt} src = {src} ></img>
    }
}
}


const truncatedContent = data.contentfulBlogPost.body.json.content.slice(0,2);
const truncatedData = data.contentfulBlogPost.body.json.body;
const truncatedDataType= data.contentfulBlogPost.body.json.nodeType;

const truncatedBody= {content: truncatedContent, data:truncatedData,nodeType :truncatedDataType}
/*
function WordCount(str) { 
  return str.split(" ").length;
}
*/



console.log(data.contentfulBlogPost.body.json)
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
 <div>
{documentToReactComponents(data.contentfulBlogPost.summary.json)}
</div>
</Jumbotron>
<hr></hr>

<div className = {styles.body}>
{!!user? documentToReactComponents(data.contentfulBlogPost.body.json, options) : documentToReactComponents(truncatedBody, options)}

</div>


{!!!user && 
<div className = {styles.msgContainer}>
  
<p className = {styles.msg}>To continue reading please <span onClick = {()=>{store.dispatch(setShowAuthPage(true))}}  className = {styles.linkButton} >Login</span></p>  
</div>
}
</div>


</PageLayout>
</div>

)

}


