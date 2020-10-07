import firebase from "gatsby-plugin-firebase"
import React from "react"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const styles = require('./signupLogin.module.css');
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {SignupUser, updateUserProfile} from '../auth'
import Spinner from 'react-bootstrap/Spinner'
import { store, setShowAuthPage, authPage } from "../../redux/reducer"


  export default function Signup (){





    
    const [loading,setLoading]= React.useState(false);
    const [error,setError]= React.useState<null|String>(null);
    const [errorVerification, setErrorVerification] = React.useState<null|String>(null);
    const [verificationPage, setVerificationPage] = React.useState(false);

    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
        firstName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8,'Password is too short - should be 8 chars minimum.')
          .required('Required'),
      }),
      onSubmit: values => {
        setLoading(true)
        const signedupUser = SignupUser(values.email, values.password);
        signedupUser
        .then((user)=>{
          updateUserProfile(values.firstName + " " + values.lastName).then (()=> { 
            var currentUser = firebase.auth().currentUser;
            currentUser.sendEmailVerification().then(function() {
              setVerificationPage(true);
              
            }).catch(function(error) {
              setErrorVerification(error.message);
              setLoading(false)
            });
           
        })
        .catch((err)=>{
          setError(err.message);
          setLoading(false);
          console.log(err)})
      }).catch((err) =>{
        setError(err.message)
        setLoading(false);
      }
      )
     
      }
      });


   /*
    firebase.auth().signInWithEmailAndPassword("waris.hasan00@gmail.com", "Boogieman").then((yolo)=>{console.log(yolo)
    
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
  })
        
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
          });
        

         
*/


    return (
   

      <div>

        {verificationPage? <div> <h4  className = {styles.verificationHeading} >Please verify your account by clicking on the link sent to you</h4>


        <Button onClick = {()=> {store.dispatch(setShowAuthPage(false))}}>Close</Button>
        </div> :
        <Form className = {styles.formContainer}  noValidate onSubmit={formik.handleSubmit} >
      
<div className = {styles.formInnerContainer} >
      <Row  className = {styles.formRowContainer} >
      
      <Col md = {6} sm = {true}>
          <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
          type="text" 
          isInvalid={!!formik.errors.firstName && !!formik.touched.firstName}
          onChange={formik.handleChange}
          name="firstName"
          onBlur={formik.handleBlur}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.firstName}</Form.Control.Feedback>
      
        </Form.Group>
        </Col>
        <Col  md = {6} sm = {true}  >
      
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
          type="text" 
          isInvalid={!!formik.errors.lastName && !!formik.touched.lastName}
          onChange={formik.handleChange}
          name="lastName"
          onBlur={formik.handleBlur}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.lastName}</Form.Control.Feedback>
      
        </Form.Group>
        </Col>
        </Row >
      
        <Row className = {styles.formRowContainer}  >
          <Col md = {12} sm = {true}  >
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          isInvalid={!!formik.errors.email && !!formik.touched.email}
          onChange={formik.handleChange}
          name="email"
          onBlur={formik.handleBlur}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.email}</Form.Control.Feedback>
      
        </Form.Group>
        </Col>
        </Row>
        <Row className = {styles.formRowContainer} >
          <Col   md = {12} sm = {true}  >
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          isInvalid={!!formik.errors.password && !!formik.touched.password}
          onChange={formik.handleChange}
          name="password"
          onBlur={formik.handleBlur}
          />
        <Form.Control.Feedback type = "invalid">{ formik.errors.password}</Form.Control.Feedback>
      
        
        <div className = {styles.buttonsContainer}>
        <Button className = {styles.button} variant="primary" type="submit"  disabled = {loading? true : false}>
        {loading? <span><Spinner size = "sm" animation="grow" variant="dark" /> loading</span>   : "Signup" }
        </Button>
        <Button onClick = {() => {store.dispatch(setShowAuthPage(false))}} className = {styles.button}  disabled = {loading? true : false}>
          Cancel
        </Button>
        </div>
           
        {!!error && <p className = {styles.error}>{error}</p> }

        </Form.Group>
        </Col>
        </Row>
        </div>
      
      

          
        
      
      </Form>



}
      </div>



    )
  }