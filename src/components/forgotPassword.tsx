import firebase from "gatsby-plugin-firebase"
import React from "react"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const styles = require('./login-signup/signupLogin.module.css');
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import { store, setForgotPassword } from "../redux/reducer"
import { useSelector } from "react-redux"


  export default function ForgotPassword (){
    
    const {showAuthPage} = useSelector((state) => state);
  

    const [loading,setLoading]= React.useState(false);
    const [error,setError]= React.useState<null|String>(null);
    const [showTooltip,setShowTooltip] = React.useState(false);



    
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: Yup.object({
      
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
    
      }),
      onSubmit: values => {
        setLoading(true)
        var auth = firebase.auth();
        var emailAddress = values.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
        setLoading(false)
        setShowTooltip(true)
        }).catch(function(error) {
        setError(error.message)
        setLoading(false)
        });
     
      },
    });





    return (
   

<div>
   
        <Form className = {styles.formContainer}  noValidate onSubmit={formik.handleSubmit} >
      
<div className = {styles.formInnerContainer} >
<h2 className = {styles.forgotPasswordHeader}>Send password reset link</h2>
      
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
       
      
      <div className = {styles.buttonsContainer}>
        <Button className = {styles.button} variant="primary" type="submit" disabled = {loading? true : false}>
       {loading? <span><Spinner size = "sm" animation="grow" variant="dark" /> loading</span>   : "Send" }
        </Button> 
        <Button onClick = {() => {store.dispatch(setForgotPassword(false))}} className = {styles.button} disabled = {loading? true : false} >
          Login
        </Button>
        </div>

        {!!error && <p className = {styles.error}>{error}</p> }
        
        </div>
      
        

       
        
      
      </Form>


<Toast onClose={() => setShowTooltip(false)} show={showTooltip} delay={3000} autohide>
<Toast.Header>

  <strong className="mr-auto">Password Reset Link sent</strong>
</Toast.Header>
</Toast>

</div>



    )
  }