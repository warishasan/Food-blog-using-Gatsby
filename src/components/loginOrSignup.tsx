import React from "react"
import Modal from 'react-bootstrap/Modal'
import Signup from './login-signup/signup'
import Login from './login-signup/login'
const styles = require('./loginOrSignup.module.css');
import { useSelector } from "react-redux"
import { store, changeAuthPageState, setShowAuthPage, authPage } from "../redux/reducer"




  export default function LoginOrSignup (){

    const {authPageState, showAuthPage} = useSelector((state) => state);

  





    return (
 




<Modal
        show={showAuthPage}
        centered
        backdrop="static"
        size = "lg"
        onHide={()=>{store.dispatch(setShowAuthPage(false))
        store.dispatch(changeAuthPageState("Login"))
       
        }}
      >
        <Modal.Header closeButton>
       <div className = {styles.title} >  <Modal.Title >{authPageState}</Modal.Title> </div> 
        </Modal.Header>
        <Modal.Body >

        {authPageState === "Login"?
        <Login/> : <Signup />}
        
        </Modal.Body>

        <Modal.Footer>
        {authPageState === "Login"? <div><span>Don't have an account?</span> <span className = {styles.linkButton} onClick = {()=>{store.dispatch(changeAuthPageState("Signup"))}}>Click here to signup</span> <span> and get free access to the blogs.</span></div>:
        <div><span>Already have an account?</span> <span  className = {styles.linkButton} onClick = {() =>{store.dispatch(changeAuthPageState("Login"))}} >Click here to login.</span></div>}

          
        </Modal.Footer>
      
      </Modal>








    )
  }