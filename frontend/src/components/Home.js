import React from "react";
import TabX from "./pages/Home/Tab";
import { Container, Row, Col, Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import "./css/MainPage.css";
import { Link } from "react-router-dom";
import "./Home.css";

const MainPage = (props) => {
  console.log(props);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    }
  };
  return (
    <>
      <Container fluid className="p-0 mt-5" style={{ zIndex: 7 }}>
        <Row>
          <Col md={8} sm={12} xs={12}>
            <div className="container-fluid p-0 h-100">
              <div
                id="header-carousel"
                className="carousel slide carousel-fade h-100"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#header-carousel"
                    data-slide-to={0}
                    className="active"
                  />
                  <li data-target="#header-carousel" data-slide-to={1} />
                  <li data-target="#header-carousel" data-slide-to={2} />
                </ol>
                <div className="carousel-inner h-100">
                  <div className="carousel-item active img-1">
                    <img
                      className="position-relative w-100"
                      src="/images/s3.jpg"
                      style={{ height: "100%", objectFit: "cover" }}
                      alt="cover"
                    />
                    <div className="carousel-caption d-flex align-items-center justify-content-center">
                      <div
                        className="p-5"
                        style={{ width: "100%", maxWidth: 900 }}
                      >
                        <h5 className="text-white text-uppercase mb-md-3">
                          Best Service Providers in India
                        </h5>
                        <h1 className="display-3 text-white mb-md-4">
                          Now Stock closer to your customers for faster delivery
                        </h1>
                        {/* <Link
                          to="/"
                          className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                        >
                          Learn More
                        </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item img-2">
                    <img
                      className="position-relative w-100"
                      src="/images/s6.jpg"
                      style={{ height: "100%", objectFit: "cover" }}
                      alt="cover"
                    />
                    <div className="carousel-caption d-flex align-items-center justify-content-center">
                      <div
                        className="p-5"
                        style={{ width: "100%", maxWidth: 900 }}
                      >
                        <h5 className="text-white text-uppercase mb-md-3">
                          Leading Warehousing Platform
                        </h5>
                        <h1 className="display-3 text-white mb-md-4">
                          Best Warehousing & logistics Platform
                        </h1>
                        {/* <Link
                          to="/"
                          className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                        >
                          Learn More
                        </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item img-3">
                    <img
                      className="position-relative w-100"
                      src="/images/s1.jpg"
                      style={{ height: "100%", objectFit: "cover" }}
                      alt="cover"
                    />
                    <div className="carousel-caption d-flex align-items-center justify-content-center">
                      <div
                        className="p-5"
                        style={{ width: "100%", maxWidth: 900 }}
                      >
                        <h5 className="text-white text-uppercase mb-md-3">
                          Best Service Providers in India
                        </h5>
                        <h1 className="display-3 text-white mb-md-4">
                          Way To Book Warehouse From Home
                        </h1>
                        {/* <Link
                          to="/"
                          className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                        >
                          Learn More
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Card
              style={{ zIndex: 7 }}
              className="shadow p-3 bg-white rounded card-1"
            >
              <Card.Body className="cardStorageBody">
                <Row>
                  <Col md={12} className="mx-3">
                    <TabX></TabX>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="d-flex" style={{margin:"10rem 0",padding:"0 2rem", marginLeft:"-2rem"}}>
          <card className="w-25 d-flex justify-content-center align-items-center mr-2" style={{boxShadow: "#49505766 2px 0px 10px -1px"}}><h3 className="h-auto text-center mb-0">Our Supporters</h3></card>
          <div className="w-75"><Carousel 
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={3000}
          customTransition="transform 1s ease-in-out"
          transitionDuration={1000}
          containerClass="carousel-container"
          deviceType={props.deviceType}
          itemClass="carousel-item-padding-40-px"
          >
            <div className="sup-items"><img
              className="d-block w-100"
              src="/images/sup-1.png"
              alt="First slide"
              style={{ height: "100%", objectFit: "fill" }}
            /></div>
            <div className="sup-items"><img
              className="d-block w-100"
              src="/images/IIT_MANDI_CATALYST.jpg"
              alt="Second slide"
              style={{ height: "100%", objectFit: "cover" }}
            /></div>
            <div className="sup-items"><img
              className="d-block w-100"
              src="/images/iit_mandi.png"
              alt="Third slide"
              style={{ height: "100%", objectFit: "fill" }}
            /></div>
            <div className="sup-items"><img
              className="d-block w-100"
              src="/images/sup-4.png"
              alt="Fourth slide"
              style={{ height: "100%", objectFit: "fill",backgroundColor:"white" }}
            /></div>
            <div className="sup-items"><img
              className="d-block w-100"
              src="/images/sup-5.webp"
              alt="Fifth slide"
              style={{ height: "100%", objectFit: "fill",backgroundColor:"white" }}
            /></div>
          </Carousel>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MainPage;
