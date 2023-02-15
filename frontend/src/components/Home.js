import React from "react";
import TabX from "./pages/Home/Tab";
import { Container, Row, Col, Card} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import "./css/MainPage.css";
import { Link } from "react-router-dom";
import { ImQuotesLeft } from "react-icons/im";
import { GiCheckMark } from "react-icons/gi";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const MainPage = (props) => {
  const Navigate = useNavigate()
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

  const responsiveWarehouse = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1,
    }
  };
  
  return (
    <>
      <Container fluid className="p-0 mt-5" style={{ zIndex: 7 }}>
        <div className="d-flex flex-row bothUnits">
          <div className="nextPage bg-white">
            <Card className="bg-white">
              <Card.Body className="cardStorageBody">
                <Row>
                  <Col md={12} className="mx-3">
                    <TabX></TabX>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          <div className="warehouseImages" >
            <div className="d-flex warehouseImgCarouselStyle" style={{margin:"0rem 0 0 -2rem ",padding:"0 0rem", marginLeft:"-2rem"}}>
              <div className="w-100" style={{paddingLeft:"2rem", borderRadius:"2rem", boxShadow:"6rem"}}>
                <Carousel 
                  responsive={responsiveWarehouse}
                  infinite={true}
                  arrows={false}
                  autoPlay={props.deviceType !== "mobile" ? true : false}
                  autoPlaySpeed={5000}
                  customTransition="transform 1s ease-in-out"
                  transitionDuration={1000}
                  containerClass="carousel-container"
                  deviceType={props.deviceType}
                  itemClass="carousel-item-padding-40-px"
                >
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      NOW STOCK CLOSER TO YOUR CUSTOMERS FOR FASTER DELIVERY
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/warehouseimg4.jpg"
                      alt="First slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      LEADING WAREHOUSING PLATFORM
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/warehouseimg1.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      BEST WAREHOUSING & LOGISTICS PLATFORM
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/s3.jpg"
                      alt="Third slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      WAY TO BOOK WAREHOUSE FROM HOME
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/s4.jpg"
                      alt="Fourth slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      BEST SERVICE PROVIDERS IN INDIA
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/s5.jpg"
                      alt="Fifth slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      REDUCING POST HARVEST LOSSES AND INCREASING MARKET ACCESS FOR RURAL FARMERS
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/warehouseimg5.jpg"
                      alt="sixth slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      EXPAND YOUR STORAGE CAPACITY
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/warehouseimg2.jpg"
                      alt="seventh slide"
                    />
                  </div>
                  <div className="frontCar-items" onClick={()=>{Navigate('/storage')}}>
                    <div className="frontCar-itemsText">
                      CENTRE PLANS THE WORLD'S LARGEST GRAIN STORAGE PROGRAMME FOR FOOD SECURITY: REPORTS
                    </div>
                    <img
                      className="d-block w-100 frontCar-itemsImg"
                      src="/images/warehouseimg3.jpg"
                      alt="eighth slide"
                    />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="benifitsBar">
            <div className="benifitsHeading">
              THE WARELOGG BENIFITS TO YOUR BUSINESS
            </div>
            <div className="benifitsSubunitsContainer">
              <div className="benifitsSubunit">
                <div className="benifitsSubunitsHeading">RETAILER & ENTERPRISES</div>
                <div className="benifitsSubunitsContent">
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Develop An Agile Distribution Network With Flexible Space & Freight</div></div>
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Manage Your Inventory Overflow, Reduce Distribution Cost</div></div>
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> A-Grade Facilities With All Compliances, Integrated Tech To Manage Vendors & Distributors</div></div>
                </div>
              </div>
              <div className="benifitsSubunit">
                <div className="benifitsSubunitsHeading">SMALL SIZE COMPANIES AND FARMERS</div>
                <div className="benifitsSubunitsContent">
                <div className="benifitsSubunitsContent">
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Access To High Class Infrastructure At Lower Price</div></div>
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Reduce Warehousing Cost. Use Sub-Units Only When Required & As Much Needed</div></div>
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Reduce Losses And Easier Market Access For Rural Farmers</div></div>
                </div>
                </div>
              </div>
              <div className="benifitsSubunit">
                <div className="benifitsSubunitsHeading">E-COMMERCE PLAYERS</div>
                <div className="benifitsSubunitsContent">
                <div className="benifitsSubunitsContent">
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Network Of Smart & Scalable Fulfilment Centres Integrated With Marketplaces & Last Mile</div></div>
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Listing And Booking Warehouses Is Easier Now</div></div>
                  <div className="benifitsSubunitsPoints"><i className="benifitsSubunitsPointsIcon"><GiCheckMark/></i><div> Fast Growing Network Provides Easy Access.</div></div>
                </div>
                </div>
              </div>
            </div>
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
            <div className="sup-items"><img
              className="d-block w-100"
              src="/images/sup-6.jpeg"
              alt="Sixth slide"
              style={{ height: "100%", objectFit: "fill",backgroundColor:"white" }}
            /></div>
          </Carousel>
          </Col>
        </Row>
      </Container>
      <div
        className="container-fluid py-5 px-sm-3 px-lg-5"
        style={{ marginTop: 90 ,marginBottom:-90, color:"black",background: "rgb(23,100,171)",
        background: "linear-gradient(90deg, rgb(251 243 230) 25%, rgb(254 199 108) 59%, rgb(255 161 63) 75%)"}}
      >
        <div className="row pt-5">
          <div className="col-lg-6 col-md-12">
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
          <div className="col-lg-6 col-md-12 mb-5">
            <Row>
              <Col md={6} className="mb-5" >
              <h5
                  className="text-uppercase mb-4"
                  style={{ color:"black",letterSpacing: 5 }}
                >
                  Resources
                </h5>
                <div className="d-flex flex-column justify-content-start">
                <Link style={{color:"black"}} className="" to="/featured">
                    <i className="fa fa-angle-right mr-2" />
                    FEATURED
                  </Link>
                  <Link  style={{color:"black"}} className="" to="/articles">
                    <i className="fa fa-angle-right mr-2" />
                    ARTICLES
                  </Link>
                  <Link  style={{color:"black"}} className="" to="/videos">
                    <i className="fa fa-angle-right mr-2" />
                    VIDEOS
                  </Link>
                </div>
              </Col>
              <Col md={6}>
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
            </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
