import React, { ReactNode } from "react"
import {Navbar, Nav, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,graphql,useStaticQuery} from 'gatsby';
const styles = require('./pageLayout.module.css');

interface props {
  children: ReactNode;
}


export default function PageLayout({children}:props) {

const data = useStaticQuery(graphql`
query {
  site{
    siteMetadata{
      title
    }
  }
}
`)

return (

<div>

<Navbar className = {styles.navBar}  expand="lg">
<Navbar.Brand><Link className = {styles.navBarHomeHeading} to = "/">{data.site.siteMetadata.title}</Link></Navbar.Brand>
 
  <Navbar.Toggle className = {styles.toggle} aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className = {styles.navBarHeadingsContainer}>


    <Link className = {styles.otherHeadigs}  activeClassName = {styles.otherHeadingsActive}  to = '/'>Home</Link> 
    <Link className = {styles.otherHeadigs}  activeClassName = {styles.otherHeadingsActive}  to = '/blogs/'>Blogs</Link> 
     <Link className = {styles.otherHeadigs} activeClassName = {styles.otherHeadingsActive} to = '/about/'>About</Link>   
   
    
   
    </Nav>
  </Navbar.Collapse>
 
</Navbar>

<div className = {styles.contentAndFooterContainer}>

<Container className ={styles.mainContent} fluid>

{children}
</Container>

<footer>
<div className = {styles.footer} >

<span>
    Khifoodguide@official.com
  </span>
  <span>
  Created by Waris Hasan, &copy; 2020
  </span>
 
  </div>
  </footer>
  </div>
</div>

)

}


