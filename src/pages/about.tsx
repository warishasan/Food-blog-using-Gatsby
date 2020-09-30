import React from "react"
import PageLayout from '../pageLayouts/pageLayout'
const styles = require('./about.module.css');
import Jumbotron from 'react-bootstrap/Jumbotron'
import {graphql,useStaticQuery} from 'gatsby';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Head from '../components/head'

export default function About() {

  const data = useStaticQuery(graphql`query {
    allContentfulAboutPage(sort:{
      fields:id
      order:DESC
    }
    limit:1)
  {
      edges{
         node{
         whatWeDo{
          json
        }
          coreValues{
            json
          }
          missionStatement{
            json
          }
          businessModel{
            json
          }
        }
      }
    }
  }
  `)
 
  console.log(data.allContentfulAboutPage.edges[0].node.whatWeDo)

  return (
    <div>
    <PageLayout>
      <Head title = "About"/>
      
    <Jumbotron  className = {styles.firstPara}  >

    {documentToReactComponents(data.allContentfulAboutPage.edges[0].node.whatWeDo.json)}
   
    </Jumbotron>

    <Jumbotron className = {styles.secondPara} >
      
      <span>
      {documentToReactComponents(data.allContentfulAboutPage.edges[0].node.coreValues.json)}
      </span>
      <span>
      {documentToReactComponents(data.allContentfulAboutPage.edges[0].node.missionStatement.json)}
      </span>
      <span>
      {documentToReactComponents(data.allContentfulAboutPage.edges[0].node.businessModel.json)}
      </span>
    </Jumbotron>
    </PageLayout>
    </div>
  );
}