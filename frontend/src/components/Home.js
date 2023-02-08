import React from "react";
import TabX from "./pages/Home/Tab";
import { Container, Row, Col, Card} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import "./css/MainPage.css";
import { Link } from "react-router-dom";
import { ImQuotesLeft } from "react-icons/im";
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

  const responsiveClients = {
    desktop: {
      breakpoint: { max: 3000, min: 1214 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1214, min: 866 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 866, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    }
  };
  
  return (
    <>
      <Container fluid className="p-0 mt-5" style={{ zIndex: 7 }}>
        <div className="d-flex flex-row bothUnits">
          <div className="warehouseImages">
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
                        <h5 className="text-white text-uppercase mb-md-3 responsiveWarehouseFontH5">
                          Best Service Providers in India
                        </h5>
                        <h1 className="display-3 text-white mb-md-4 responsiveWarehouseFontH1">
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
                        <h5 className="text-white text-uppercase mb-md-3 responsiveWarehouseFontH5">
                          Leading Warehousing Platform
                        </h5>
                        <h1 className="display-3 text-white mb-md-4 responsiveWarehouseFontH1">
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
                        <h5 className="text-white text-uppercase mb-md-3 responsiveWarehouseFontH5">
                          Best Service Providers in India
                        </h5>
                        <h1 className="display-3 text-white mb-md-4 responsiveWarehouseFontH1">
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
          </div>
          <div className="nextPage">
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
          </div>
        </div>
        <Row className="d-flex" style={{margin:"10rem 3rem"}}>
          <Col md={3} xs={12} className="px-0 mb-2">
          <card className="d-flex h-100 justify-content-center align-items-center mr-2" style={{boxShadow: "#49505766 2px 0px 10px -1px"}}><h3 className="h-auto text-center mb-0  my-4">Our Supporters</h3></card>
          </Col>
          <Col md={9} xs={12} className="px-0 mb-2"><Carousel 
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
              style={{ height: "100%", objectFit: "contain" }}
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
          </Col>
        </Row>
        <header className="">
          <div className="headerClass d-flex flex-column justify-content-around">
              <h5 className="textBox">TESTIMONIALS</h5>
              <h1 className="textBox heading">WHAT CLIENTS SAY</h1>
              <p className="textBox">leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus</p>
          </div>
        </header>
        <div className="d-flex" style={{margin:"10rem 3rem",padding:"0 0rem", marginLeft:"3rem"}}>
          <div className="w-100"><Carousel 
          responsive={responsiveClients}
          infinite={true}
          arrows={true}
          // showDots={true}
          removeArrowOnDeviceType={["mobile"]}
          customTransition="transform 1s ease-in-out"
          transitionDuration={1000}
          deviceType={props.deviceType}
          keyBoardControl={true}
          itemClass="carousel-item-padding-40-px"
          // className="clientsBar"
          >
            <div className="cardStyle" >
              <img className="profileStyle" src="images/testimonial-3.jpg"></img>
              <h6 className="textBox nameSize">TIM DAVID1</h6>
              <p className="textBox companyName">ROBO CONSTRUCTION</p>
              <i className="d-flex flex-row justify-content-around iconStyle"><ImQuotesLeft/></i>
              <p className="para textBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum velit. Eleifend donec pretium vulputate sapien. At volutpat diam ut venenatis tellus in metus. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Id volutpat lacus laoreet non curabitur.</p>
            </div>
            <div className="cardStyle" >
              <img className="profileStyle" src="images/testimonial-3.jpg"></img>
              <h6 className="textBox nameSize">TIM DAVID2</h6>
              <p className="textBox companyName">ROBO CONSTRUCTION</p>
              <i className="d-flex flex-row justify-content-around iconStyle"><ImQuotesLeft/></i>
              <p className="para textBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum velit. Eleifend donec pretium vulputate sapien. At volutpat diam ut venenatis tellus in metus. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Id volutpat lacus laoreet non curabitur.</p>
            </div>
            <div className="cardStyle" >
              <img className="profileStyle" src="images/testimonial-3.jpg"></img>
              <h6 className="textBox nameSize">TIM DAVID3</h6>
              <p className="textBox companyName">ROBO CONSTRUCTION</p>
              <i className="d-flex flex-row justify-content-around iconStyle"><ImQuotesLeft/></i>
              <p className="para textBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum velit. Eleifend donec pretium vulputate sapien. At volutpat diam ut venenatis tellus in metus. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Id volutpat lacus laoreet non curabitur.</p>
            </div>
            <div className="cardStyle" >
              <img className="profileStyle" src="images/testimonial-3.jpg"></img>
              <h6 className="textBox nameSize">TIM DAVID4</h6>
              <p className="textBox companyName">ROBO CONSTRUCTION</p>
              <i className="d-flex flex-row justify-content-around iconStyle"><ImQuotesLeft/></i>
              <p className="para textBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum velit. Eleifend donec pretium vulputate sapien. At volutpat diam ut venenatis tellus in metus. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Id volutpat lacus laoreet non curabitur.</p>
            </div>
            <div className="cardStyle" >
              <img className="profileStyle" src="images/testimonial-3.jpg"></img>
              <h6 className="textBox nameSize">TIM DAVID5</h6>
              <p className="textBox companyName">ROBO CONSTRUCTION</p>
              <i className="d-flex flex-row justify-content-around iconStyle"><ImQuotesLeft/></i>
              <p className="para textBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum velit. Eleifend donec pretium vulputate sapien. At volutpat diam ut venenatis tellus in metus. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Id volutpat lacus laoreet non curabitur.</p>
            </div>
          </Carousel>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MainPage;
