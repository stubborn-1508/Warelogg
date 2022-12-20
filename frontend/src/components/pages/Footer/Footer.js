import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const FooterSection = () =>
{
    return (
        <>
            <div
                className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5"
                style={ { marginTop: 90 } }
            >
                <div className="row pt-5">
                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <h5
                                    className="text-primary text-uppercase mb-4"
                                    style={ { letterSpacing: 5 } }
                                >
                                    Get In Touch
                                </h5>
                                <p>
                                    <i className="fa fa-map-marker-alt mr-2" />
                                    South Delhi, Delhi-India
                                </p>
                                <p>
                                    <i className="fa fa-phone-alt mr-2" />
                                    +91 86384 40694
                                </p>
                                <p>
                                    <i className="fa fa-envelope mr-2" />
                                    letsgopal@gmail.com
                                </p>
                                <div className="d-flex justify-content-start mt-4">
                                    <Link className="btn btn-outline-light btn-square mr-2" to="#">
                                        <i className="fab fa-twitter" />
                                    </Link>
                                    <Link className="btn btn-outline-light btn-square mr-2" to="#">
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                    <Link className="btn btn-outline-light btn-square mr-2" to="#">
                                        <i className="fab fa-linkedin-in" />
                                    </Link>
                                    <Link className="btn btn-outline-light btn-square" to="#">
                                        <i className="fab fa-instagram" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-6 mb-5">
                                <h5
                                    className="text-primary text-uppercase mb-4"
                                    style={ { letterSpacing: 5 } }
                                >
                                    Our Services
                                </h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-white mb-2" to="#">
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
                                    <Link className="text-white mb-2" to="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        INTERNATIONAL SHIPPING
                                    </Link>
                                    <Link className="text-white" to="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        RETURNS
                                    </Link>
                                    <Link className="text-white" to="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        PAYMENT OPTIONS
                                    </Link>
                                    <Link className="text-white" to="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        TRACK ORDER
                                    </Link>
                                    <Link className="text-white" to="/about">
                                        <i className="fa fa-angle-right mr-2" />
                                        ABOUT
                                    </Link>
                                    <Link className="text-white" to="/careers">
                                        <i className="fa fa-angle-right mr-2" />
                                        CAREERS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 mb-5">
                        <h5
                            className="text-primary text-uppercase mb-4"
                            style={ { letterSpacing: 5 } }
                        >
                            Newsletter
                        </h5>
                        <p>
                            Rebum labore lorem dolores kasd est, et ipsum amet et at kasd, ipsum
                            sea tempor magna tempor. Accu kasd sed ea duo ipsum. Dolor duo eirmod
                            sea justo no lorem est diam
                        </p>
                        <div className="w-100">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control border-light"
                                    style={ { padding: 30 } }
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
                className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5"
                style={ { borderColor: "rgba(256, 256, 256, .1) !important" } }
            >
                <div className="row">
                    <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white">
                            © <Link to="#">Letsgopal.com </Link>All Rights Reserved. Designed by{ " " }
                            <Link to="/">Let's Go Pal Privated Limited</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="fa fa-angle-double-up"></i></Link>
        </>
    );
}

export default FooterSection;
