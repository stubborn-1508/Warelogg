import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const FooterSection = () => {
  return (
    <>
      <div
        className="container-fluid py-5 px-sm-3 px-lg-5"
        style={{ marginTop: 90 ,color:"black",background: "rgb(23,100,171)",
        background: "linear-gradient(90deg, rgb(251 243 230) 25%, rgb(254 199 108) 59%, rgb(255 161 63) 75%)"}}
      >
        <div className="row pt-5">
          <div className="col-lg-7 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5
                  className="text-uppercase mb-4"
                  style={{color:"black", letterSpacing: 5 }}
                >
                  Get In Touch
                </h5>
                <p>
                  <i className="fa fa-map-marker-alt mr-2" />
                  New Coworking Space <br/> IIT Mandi North Campus, Salgi
                  <br/>Mandi, Himachal Pradesh - 175005
                </p>
                <p>
                  <i className="fa fa-phone-alt mr-2" />
                  <a href="tel:+918638440694" style={{fontSize:"inherit", color:"inherit"}}>+91 86384 40694</a>
                </p>
                <p>
                  <i className="fa fa-envelope mr-2" />
                  <a href="mailto:warelogg@gmail.com" style={{fontSize:"inherit", color:"inherit", textTransform:"lowercase"}}>warelogg@gmail.com</a>
                </p>
                <div className="d-flex justify-content-start mt-4">
                  <a
                    style={{color:"#ff6600", borderColor:"black"}}
                    className="btn btn-outline-light btn-square mr-2"
                    href="https://twitter.com/warelogg?t=i103g2CtU2UwrDnD8VIgwA&s=09"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    style={{color:"#ff6600", borderColor:"black"}}
                    className="btn btn-outline-light btn-square mr-2"
                    href="#"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    style={{color:"#ff6600", borderColor:"black"}}
                    className="btn btn-outline-light btn-square mr-2"
                    href="#"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a
                   style={{color:"#ff6600", borderColor:"black"}}
                   className="btn btn-outline-light btn-square"
                   href="http://www.instagram.com/warelogg"
                   target="_blank"
                   >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h5
                  className="text-uppercase mb-4"
                  style={{ color:"black",letterSpacing: 5 }}
                >
                  Our Services
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  {/* <Link className="text-white mb-2" to="#">
                    <i className="fa fa-angle-right mr-2" />
                    HELP &amp; CONTACT
                  </Link>
                  <Link className="text-white mb-2" to="#">
                    <i className="fa fa-angle-right mr-2" />
                    OFFERS TERMS AND CONDITIONS
                  </Link>
                  <Link className="text-white mb-2" to="#">
                    <i className="fa fa-angle-right mr-2" />
                    DELIVERY INFORMATION
                  </Link>
                  <Link className="text-white" to="#">
                    <i className="fa fa-angle-right mr-2" />
                    PAYMENT OPTIONS
                  </Link>
                  <Link className="text-white" to="#">
                    <i className="fa fa-angle-right mr-2" />
                    TRACK ORDER
                  </Link> */}
                  <Link style={{color:"black"}} className="" to="/about">
                    <i className="fa fa-angle-right mr-2" />
                    ABOUT
                  </Link>
                  <Link  style={{color:"black"}} className="" to="/careers">
                    <i className="fa fa-angle-right mr-2" />
                    CAREERS
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 mb-5">
            <h5
              className="text-uppercase mb-4"
              style={{ color:"black",letterSpacing: 5 }}
            >
              Newsletter
            </h5>
            <p>
              Subscribe to our newsletter to get more information on latest
              updates via emails and get special exclusive offers.
            </p>
            <div className="w-100">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-light"
                  style={{ padding: 30 }}
                  placeholder="Your Email Address"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid border-top py-4 px-sm-3 px-md-5"
        style={{color:"black",background: "rgb(23,100,171)",
          background: "linear-gradient(90deg, rgb(251 243 230) 25%, rgb(254 199 108) 59%, rgb(255 161 63) 75%)" ,borderColor: "rgba(256, 256, 256, .1)" }}
      >
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0">
              © 2023<Link style={{color:"inherit"}} to="#">warelogg.com &#160;</Link>All Rights Reserved. Designed
              by<Link style={{color:"inherit"}} to="/">Warelogg Privated Limited</Link>
            </p>
          </div>
        </div>
      </div>
      <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </Link>
    </>
  );
};

export default FooterSection;
