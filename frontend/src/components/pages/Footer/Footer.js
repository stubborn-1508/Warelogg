import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const FooterSection = () => {
  return (
    <>
      <div
        className="container-fluid border-top py-4 px-sm-3 px-md-5"
        style={{marginTop: 90 ,color:"black",background: "rgb(23,100,171)",
          background: "linear-gradient(90deg, rgb(251 243 230) 25%, rgb(254 199 108) 59%, rgb(255 161 63) 75%)" ,borderColor: "rgba(256, 256, 256, .1)" }}
      >
        <div className="row">
          <div className="d-flex justify-content-center text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 h-6">
              © 2023<Link style={{color:"inherit",textTransform:"capitalize"}} to="#">Warelogg &#160;</Link>All Rights Reserved.
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
