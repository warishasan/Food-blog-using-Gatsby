import React from "react"
import PageLayout from '../pageLayouts/pageLayout'
import {Link} from 'gatsby'
const styles = require('./404.module.css');
import Head from '../components/head'


export default function NotFound() {


  return (
    <PageLayout>
        <Head title= "Page not found"/>
        <h1 className = {styles.heading}>Page not found</h1>
        <p  className = {styles.link}  > < Link to = "/" >go back to home</Link></p>
    </PageLayout>
  );
}