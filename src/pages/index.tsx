import React from "react"
import PageLayout from '../pageLayouts/pageLayout'
import {Carousel} from 'react-bootstrap'
const styles = require('./index.module.css');
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import {graphql,useStaticQuery, navigate} from 'gatsby';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Head from '../components/head'

export default function Home() {
 

  const data = useStaticQuery(graphql`query {
    allContentfulBlogPost (sort:{
      fields:publishedDate
      order:ASC
    }, limit: 3)
  {
      edges{
         node{
          title
          slug
          publishedDate(fromNow:true)
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

  console.log(data.allContentfulBlogPost.edges.length)

  return (
    <div>
    <PageLayout>
      <Head title = "Home"/>
    <Carousel >
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('../images/slide1-min.jpg')}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3 className = {styles.sliderText}>Keep yourself updated with our unbiased reviews</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('../images/slide2-min.jpg')}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3 className = {styles.sliderText}>Our team comprises of professionally trained food tasters</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('../images/slide3-min.jpg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3  className = {styles.sliderText}>We cover all sorts of restaurants, from food street to 5 star hotels</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

<Jumbotron className = {styles.jumbotron}>
  <div className = {styles.heading2Container}>
  <h1>#EatToLive</h1>
  <Button onClick = {() => {navigate("/about/")}} className = {styles.button} variant="link">Learn more</Button>
  </div>
  <ul>
    <li>We help you select the best dining experiences in Karachi!</li>
    <li>We can help you in deciding the menu for your next big moment!</li>
    <li>Tight on budget? Do not worry, we have got you covered!</li>

  </ul>

</Jumbotron>
<div className = {styles.latestBlogs}>
<h1>Our Latest Blogs</h1>

<CardDeck className = {styles.cardDeck}>

{data.allContentfulBlogPost.edges.map((edge,ind) =>{

  return(

    <Card className = {styles.card}   key =  {ind} >
      
    <Card.Img  variant="top" src={edge.node.thumbnail.file.url} alt = {edge.node.thumbnail.file.fileName} />
    <Card.Body>
      <Card.Title className = {styles.cardTitle} >{edge.node.title}</Card.Title>
      <div className = {styles.cardSummary}>
      {documentToReactComponents(edge.node.summary.json)}
      </div>
    </Card.Body>
    <Card.Footer className = {styles.cardFooter}>
  <small className="text-muted">published: {edge.node.publishedDate}</small>
  <Button variant = "danger" className = {styles.buttonCard} onClick = {()=>{navigate(`/blogs/${edge.node.slug}`)}}>Read More</Button>
    </Card.Footer>
    
  </Card>
 
    
  )
})}

</CardDeck>

</div>
    </PageLayout>
    </div>
  );
}