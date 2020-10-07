import React from "react"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const styles = require('./signupLogin.module.css');
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {LoginUser} from '../auth'
import Spinner from 'react-bootstrap/Spinner'
import { store, setShowAuthPage, authState, setForgotPassword,  } from "../../redux/reducer"
import { useSelector } from "react-redux"
import ForgotPassword from '../forgotPassword'

  export default function Login (){
    
    const forgotPassword:Boolean = useSelector<authState,Boolean>((state) => state.forgotPassword);

    const [loading,setLoading]= React.useState(false);
    const [error,setError]= React.useState<null|String>(null);




    
    const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
      
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8,'Password is too short - should be 8 chars minimum.')
          .required('Required'),
      }),
      onSubmit: values => {
        setLoading(true);
        
        const loggedinUser = LoginUser(values.email, values.password)
        loggedinUser.then((user)=>{
          console.log(user);
          store.dispatch(setShowAuthPage(false))
         
        }).catch((err)=>{
          setError(err.message)
          console.log(err)
          setLoading(false);
        })
         
      },
    });





    return (
      <div>
  {forgotPassword? <ForgotPassword/> :

        <Form className = {styles.formContainer}  noValidate onSubmit={formik.handleSubmit} >
      
<div className = {styles.formInnerContainer} >
     
      
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
        <Button className = {styles.button} variant="primary" type="submit" disabled = {loading? true : false}>
       {loading? <span><Spinner size = "sm" animation="grow" variant="dark" /> loading</span>   : "Login" }
        </Button> 
        <Button onClick = {() => {store.dispatch(setShowAuthPage(false))}} className = {styles.button} disabled = {loading? true : false} >
          Cancel
        </Button>
        <p className = {styles.forgotPassword} onClick = {()=>{store.dispatch(setForgotPassword(true))}}>Forgot Password?</p>
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