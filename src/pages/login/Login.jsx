import React, { useState } from 'react'
import "./login.css";

export default function Login() {
  const [emailNumber, setEmailNumber] = useState(" ");
  const [password, setPassword] = useState(" ");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(emailNumber, password);
      // api call for login
      let items = { emailNumber, password };
      let result = await fetch("https://genxhire-esurveillance-api.azurewebsites.net/api/user/login/admin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "accept": "application/json"
        },
        body: JSON.stringify(items)
      });
      if (!result.ok) {
        throw new Error(`Error! status: ${result.status}`)
      }
      result = await result.json();
      alert("login Successful")
      console.log("Success:", result);
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("userId", JSON.stringify(result.id));
      window.location.href = '/dashboard'
    }
    catch (error) {
      alert('Invalid email or password')
      console.log(error)
    }

  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">GenXhire</h3>
          <span className="loginDes">
            Login To Your Account
          </span>
        </div>
        
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick} >
            <input type="email" name="email" required placeholder="Email" className="loginInput"
              onChange={(e) => setEmailNumber(e.target.value)} />

            <input type="password" name="password" required
              minLength="6" placeholder="password" className="loginInput"
              onChange={(e) => setPassword(e.target.value)} />

            <button className="loginButton">Sign In</button>
            <span className="loginForgot">Forgot Password?</span>


            {/* <button className="loginRegister">
              <a href="/register">
               Sign Up
              </a>
            </button> */}

          </form>
        </div>
       
      </div>
    </div>
  )
}
