import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axiosWithAuth from "../helpers/axiosWithAuth";


const Login = () => {
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  })

  const { push } = useHistory()

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // useEffect(()=>{
   
  // }, []);

  const handleClick = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axiosWithAuth()
      .post('/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
      .then(res => {
        // if (formValues.username === 'Lambda School' && formValues.password === 'i<3Lambd4') {
        //   return 
          localStorage.setItem("token", res.data.payload)
        // }
         push('/bubblepage')
      })
      .catch(err => {
        console.log(err)   
      })

      if (formValues.username !== 'Lambda School' || formValues.password !== 'i<3Lambd4') {
        setError("Username or Password not valid")
      } 
  }


  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <form onSubmit={handleSubmit}>
          <label> username
            <input 
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleClick}
            />
          </label>
          <label> password
            <input 
            type="text"
            name="password"
            value={formValues.password}
            onChange={handleClick}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>{error}</p>
      </h1>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.