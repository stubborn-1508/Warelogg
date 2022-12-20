import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ContactSection = () =>
{
    return (
        <>
            <Container className="my-5">
                <Row className="">
                    <Col lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 } className="">
                        <div className="text-center mb-5">
                            <h5
                                className="text-primary text-uppercase mb-3"
                                style={ { letterSpacing: 5 } }
                            >
                                Contact
                            </h5>
                            <h1>Contact For Any Query</h1>
                        </div>
                        <img
                            className="d-block w-100 rounded"
                            src="images/hello.jpg"
                            alt="First slide"
                        />
                    </Col>
                    <Col lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                        <div className="contact-form bg-secondary rounded p-5">
                            <div id="success" />
                            <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control border-0 p-4"
                                        id="name"
                                        placeholder="Your Name"
                                        required="required"
                                        data-validation-required-message="Please enter your name"
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="email"
                                        className="form-control border-0 p-4"
                                        id="email"
                                        placeholder="Your Email"
                                        required="required"
                                        data-validation-required-message="Please enter your email"
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control border-0 p-4"
                                        id="subject"
                                        placeholder="Subject"
                                        required="required"
                                        data-validation-required-message="Please enter a subject"
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <textarea
                                        className="form-control border-0 py-3 px-4"
                                        rows={ 5 }
                                        id="message"
                                        placeholder="Message"
                                        required="required"
                                        data-validation-required-message="Please enter your message"
                                        defaultValue={ "" }
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary py-3 px-5"
                                        type="submit"
                                        id="sendMessageButton"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="container-fluid py-5 bg-dark">
                
            </div>
        </>
    );
}

export default ContactSection;
