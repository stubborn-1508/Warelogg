import Modal from "react-bootstrap/Modal";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge,
} from "react-bootstrap";
import "./Register.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";

const RegisterModal = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const reg = async (userData) => {
    try {
      const res = await axios({
        url: "/register",
        data: userData,
        method: "post",
      });
      console.log(res);
      return [res.data, res.status];
    } catch (e) {
      console.log(e);
      return [e.response.data, e.response.status];
    }
  };

  const log = async (userData) => {
    try {
      const res = await axios({
        url: "/loginUser",
        data: userData,
        method: "post",
      });
      console.log(res);
      return [res.data, res.status];
    } catch (e) {
      console.log(e);
      return [e.response.data.message, e.response.status];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regUser = {
      name: user.name,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
    };

    const logUser = {
      email: user.email,
      password: user.password,
    };

    const waitRes1 = await reg(regUser);

    alert(waitRes1[0]);

    if (waitRes1[1] === 200) {
      const waitRes2 = await log(logUser);
      if (waitRes2[1] === 200) {
        localStorage.setItem("token", waitRes2[0].token);
        if (logUser.email === "admin@warelogg.com") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        alert(waitRes2[0]);
      }
    }

    setUser({
      name: "",
      email: "",
      password: "",
      mobile: "",
      username: "",
    });

    props.onHide(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <main
          style={{
            position: "relative",
            marginBottom: "-5.7rem",
            marginTop: "-1rem",
          }}
        >
          <section
            style={{
              marginTop: "1rem",
              paddingBottom: "2rem",
              //   border: "2px solid red",
            }}
          >
            <div className="back-image"></div>
            <div className="flex-container">
              <div className="container">
                <div
                  style={{
                    width: "100%",
                    padding: "0 1rem",
                    maxWidth: "32rem",
                  }}
                >
                  <div className="signup-form-container">
                    <figure className="spirit-logo">
                      <img
                        src="/images/logo.png"
                        alt="logo spirit"
                        loading="lazy"
                        className="logo"
                      />
                      <figcaption>𝕎𝕒𝕣𝕖𝕝𝕠𝕘𝕘</figcaption>
                    </figure>
                    <div className="google-sign-in">
                      <h6
                        style={{
                          lineHeight: "1.25rem",
                          padding: "0.75rem 0",
                          color: "rgba(75,85,99,1)",
                          fontWeight: "700",
                        }}
                      >
                        SIGN UP WITH
                      </h6>
                      <div style={{ textAlign: "center" }}>
                        <button className="google-button" type="button">
                          <FcGoogle />
                          <span style={{ marginLeft: "3px", fontSize: "18px" }}>
                            Google
                          </span>
                        </button>
                      </div>
                      <hr style={{ margin: "0.75rem" }} />
                    </div>
                    <div style={{ flex: "1 1 auto", padding: "0 1rem 2.5rem" }}>
                      <div
                        style={{
                          textAlign: "center",
                          color: "rgba(107, 114, 128, 1)",
                          marginBottom: "0.75rem",
                          fontWeight: "700",
                        }}
                      >
                        <small>or sign up with credentials</small>
                      </div>
                      <form>
                        <div style={{ width: "100%", marginBottom: "0.75rem" }}>
                          <i
                            className="bx bxs-user"
                            style={{ color: "black" }}
                          ></i>
                          <input
                            className="input-field"
                            name="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="Your Name"
                            required="required"
                            value={user.name}
                          />
                        </div>
                        <div style={{ width: "100%", marginBottom: "0.75rem" }}>
                          <i
                            className="bx bxs-user"
                            style={{ color: "black" }}
                          ></i>
                          <input
                            className="input-field"
                            name="username"
                            onChange={handleChange}
                            type="text"
                            placeholder="Your Username"
                            defaultValue={user.username}
                            value={user.username}
                          />
                        </div>
                        <div style={{ width: "100%", marginBottom: "0.75rem" }}>
                          <i
                            className="bx bxs-envelope"
                            style={{ color: "black" }}
                          ></i>
                          <input
                            className="input-field"
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Your Email"
                            required="required"
                            value={user.email}
                          />
                        </div>
                        {/* <div style={{ width: "100%", marginBottom: "0.75rem" }}>
                          <i
                            className="bx bxs-user"
                            style={{ color: "black" }}
                          ></i>
                          <select
                            className="input-field"
                            name="state"
                            onChange={handleChange}
                          >
                            <option selected="">Select State</option>
                            <option value={"Delhi"}>Delhi</option>
                            <option value={"Gujurat"}>Gujarat</option>
                            <option value={"Maharashtra"}>Maharashtra</option>
                          </select>
                        </div> */}
                        <div style={{ width: "100%", marginBottom: "0.75rem" }}>
                          <i
                            className="bx bxs-contact"
                            style={{ color: "black" }}
                          ></i>
                          <input
                            className="input-field"
                            name="mobile"
                            onChange={handleChange}
                            type="number"
                            placeholder="Mobile Number"
                            value={user.mobile}
                          />
                        </div>
                        <div style={{ width: "100%", marginBottom: "0.75rem" }}>
                          <i
                            className="bx bxs-lock-alt"
                            style={{ color: "black" }}
                          ></i>
                          <input
                            className="input-field"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Your Password"
                            required="required"
                            value={user.password}
                          />
                        </div>
                        <div
                          style={{ textAlign: "center", marginTop: "1.5rem" }}
                        >
                          <button
                            type="submit"
                            className="reg-signup-button"
                            onClick={handleSubmit}
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ width: "40%", textAlign: "left" }}>
                      <input type="checkbox" />
                      Remember me
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
