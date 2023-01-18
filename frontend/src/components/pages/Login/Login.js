import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import context from "../../../Contexts/context";
import { FcGoogle } from "react-icons/fc";
import "./Login.css"

const LoginSection = () => {
  const navigate = useNavigate();
  const ctx = useContext(context);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  
  const log = async (userData) => {
    try{
      const res = await axios({ url: "/loginUser", data: userData, method: "post" });
      return [res.data, res.status];
    }catch (e){
      console.log(e);
      return [e.response.data, e.response.status];
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logUser = {
      email: userDetails.email,
      password: userDetails.password,
    };

    const waitRes = await log(logUser);

    if(waitRes[1] === 200){
      localStorage.setItem('token', waitRes[0].token);
      console.log(waitRes[0].id);
      ctx.update({user_id: waitRes[0].id});
      alert(waitRes[0].message);
      if(logUser.email === "admin@warelogg.com"){
        navigate(-1);
      }else{
        navigate(-1);
      }
    }else{
      alert(waitRes[0]);
    }

    setUserDetails({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <main style={{position: "relative",marginBottom:"-5.7rem",marginTop:"-1rem"}}>
        <section class="main-section">
            <div class="back-image"></div>
            <div class="flex-container">
                <div class="container">
                    
                    <div style={{width: "100%", padding: "0 1rem", maxWidth: "32rem"}}>
                        <div class="login-form-container">
                            <figure class="spirit-logo">
                                <img src="/images/logo.png" alt="logo spirit" loading="lazy" class="logo" />
                                <figcaption>𝕎𝕒𝕣𝕖𝕝𝕠𝕘𝕘</figcaption>
                            </figure>
                            <div class="google-sign-in">
                                <h6 style={{lineHeight: "1.25rem", padding: "0.75rem 0",color: "rgba(75,85,99,1)",fontWeight: "700"}}>
                                    SIGN IN WITH
                                </h6>
                                <div style={{textAlign: "center"}}>
                                    <button class="google-button" type="button">
                                    <FcGoogle />
                                          <span style={{marginLeft:"3px", fontSize:"18px"}}>Google</span>
                                    </button>
                                </div>
                                <hr style={{margin: "0.75rem"}} />
                            </div>
                            <div style={{flex: "1 1 auto", padding: "0 1rem 2.5rem"}}>
                                <div style={{
                      textAlign: "center",
                      color: "rgba(107, 114, 128, 1)",
                      marginBottom: "0.75rem",
                      fontWeight: "700"
                                }}>
                                    <small>or sign in with credentials</small>
                                </div>
                                <form>
                                    <div style={{width: "100%", marginBottom: "0.75rem"}}>
                                        <i class="bx bxs-user" style={{color:"black"}}></i>
                                        <input class="input-field" 
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Your Email"
                                        required="required" />
                                    </div>
                                    <div style={{width: "100%", marginBottom: "0.75rem"}}>
                                        <i class="bx bxs-lock-alt" style={{color:"black"}}></i>
                                        <input class="input-field" 
                                        name="password"
                                        value={userDetails.password}
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="Your Password"
                                        required="required" />
                                    </div>
                                    <div style={{textAlign: "center", marginTop: "1.5rem"}}>
                                        <button type="submit" class="log-login-button" onClick={handleSubmit}>
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            <div style={{width: "40%", textAlign: "left"}}>
                                <input type="checkbox" />Remember me
                            </div>
                            <div style={{width: "60%", textAlign: "right"}}>
                            <button class="log-signup-button"><Link style={{color:"white"}} to="/register" >
                            Don't have id? Sign up!
                            </Link>
                            </button>
                            </div>
                            <button style={{border: "none"}} class="forgot-password-button">
                                <small>Forgot Password?</small>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    </>
  );
};

export default LoginSection;
