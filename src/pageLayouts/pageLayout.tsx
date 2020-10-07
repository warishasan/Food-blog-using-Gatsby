import React, { ReactNode } from "react"
import {Navbar, Nav, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,graphql,useStaticQuery} from 'gatsby';
const styles = require('./pageLayout.module.css');
import LoginOrSignup from '../components/loginOrSignup'
import Button from 'react-bootstrap/Button'
import {SignoutUser} from '../components/auth'
import firebase from "gatsby-plugin-firebase"
import Dropdown from 'react-bootstrap/Dropdown'
import { store, changeAuthPageState, setShowAuthPage } from "../redux/reducer"
import { useSelector } from "react-redux"
import {authState} from '../redux/reducer'


interface props {
  children: ReactNode;
}


export default function PageLayout({children}:props) {

  const showAuthPage:Boolean= useSelector<authState,Boolean>((state) => state.showAuthPage);


const[user,setUser] = React.useState<firebase.User | null>(null);



const handleVerificationEmail = () =>{

  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
   
    alert("A verification link has been emailed to you")
    
  }).catch(function(error) {

    alert(error.message)
    
  });

}


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


const data = useStaticQuery(graphql`
query {
  site{
    siteMetadata{
      title
    }
  }
}
`)

console.log(user)
return (



<div>


<Navbar className = {styles.navBar}  expand="lg">
<Navbar.Brand><Link className = {styles.navBarHomeHeading} to = "/">{data.site.siteMetadata.title}</Link></Navbar.Brand>
 
  <Navbar.Toggle className = {styles.toggle} aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className = {styles.navBarHeadingsContainer}>

    <div className = {styles.ButtonsInnerContainer}>
    <Link className = {styles.otherHeadigs}  activeClassName = {styles.otherHeadingsActive}  to = '/'>Home</Link>

 <Link className = {styles.otherHeadigs}  activeClassName = {styles.otherHeadingsActive}  to = '/blogs/'>Blogs</Link>

 <Link className = {styles.otherHeadigs} activeClassName = {styles.otherHeadingsActive} to = '/about/'>About</Link>  
</div>
 {!!user?
 <Dropdown className = {styles.profileButton} > 
 <Dropdown.Toggle  className = {styles.profileButtonToggle} variant="primary" id="dropdown-basic">
  {user.displayName}
 </Dropdown.Toggle>

 <Dropdown.Menu>
   <Dropdown.Item onClick = {()=>{SignoutUser().then(()=>{console.log("signed out")})}}>Logout</Dropdown.Item>
  
 </Dropdown.Menu>
</Dropdown>
 
 :
 <Button  onClick = {()=>{store.dispatch(changeAuthPageState("Login"))
 store.dispatch(setShowAuthPage(true))

 }} className = {styles.signinButton}  >Login/Signup</Button>}



    
   
    </Nav>
  </Navbar.Collapse>
 
</Navbar>


{!!user && !user.emailVerified && <div className = {styles.verificationMsg}>Your account is not verified! <span onClick = {handleVerificationEmail} className = {styles.verificationLink} > Send a verification link to my email.</span></div>}





<div className = {styles.contentAndFooterContainer}>

<Container className ={styles.mainContent} fluid>

{children}

<LoginOrSignup/>
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


