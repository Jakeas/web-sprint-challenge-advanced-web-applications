import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import { useHistory } from "react-router";

const initialValues = {
  username: "",
  password: "",
}

const Login = () => {

  const { push } = useHistory()

  const [ formValues, setFormValues ] = useState(initialValues)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

   
  useEffect(()=>{
    axiosWithAuth()
      .post('/api/login', {username: 'Lambda School', password: 'i<3Lambd4'})
      .then(res => {
        console.log({res})
        window.localStorage.setItem('token', res.data.payload)
        push('/bubble-page') 
      })
      .catch(err => {
        console.log({err})
      }) 
  }, []);

    const handleSubmit = e => {
       e.preventDefault()
  }  

    const handleChange = e => {
      setFormValues({...formValues, [e.target.name]: e.target.value })
    }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input 
            type="text"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. ***If either the username or password is not displayed display EXACTLY the following words: Username or Password not valid.***
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.