import React from "react";
import TabX from "./pages/Home/Tab";
import
{
    Container,
    Row,
    Col,
    Card,
    Carousel
} from "react-bootstrap";

// import "./css/MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () =>
{
    return (
        <>
            <Container fluid className="p-0 mt-5" style={ { zIndex: 7 } }>
                <Row>
                    <Col md={ 8 } sm={ 12 } xs={ 12 }>
                      <div className="container-fluid p-0">
                            <div
                                id="header-carousel"
                                className="carousel slide carousel-fade"
                                data-ride="carousel"
                            >
                                <ol className="carousel-indicators">
                                    <li data-target="#header-carousel" data-slide-to={ 0 } className="active" />
                                    <li data-target="#header-carousel" data-slide-to={ 1 } />
                                    <li data-target="#header-carousel" data-slide-to={ 2 } />
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" style={ { minHeight: 300 } }>
                                        <img
                                            className="position-relative w-100"
                                            src="/images/s3.jpg"
                                            style={ { minHeight: 250, objectFit: "cover" } }
                                            alt="cover"
                                        />
                                        <div className="carousel-caption d-flex align-items-center justify-content-center">
                                            <div className="p-5" style={ { width: "100%", maxWidth: 900 } }>
                                                <h5 className="text-white text-uppercase mb-md-3">
                                                    Best Service Providers in India
                                                </h5>
                                                <h1 className="display-3 text-white mb-md-4">
                                                    Way To Book Warehouse From Home
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={ { minHeight: 300 } }>
                                        <img
                                            className="position-relative w-100"
                                            src="/images/s6.jpg"
                                            style={ { minHeight: 250, objectFit: "cover" } }
                                            alt="cover"
                                        />
                                        <div className="carousel-caption d-flex align-items-center justify-content-center">
                                            <div className="p-5" style={ { width: "100%", maxWidth: 900 } }>
                                                <h5 className="text-white text-uppercase mb-md-3">
                                                    Leading Warehousing Platform
                                                </h5>
                                                <h1 className="display-3 text-white mb-md-4">
                                                    Best Warehousing & logistics Platform
                                                </h1>
                                                <Link
                                                    to="/"
                                                    className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={ { minHeight: 300 } }>
                                        <img
                                            className="position-relative w-100"
                                            src="/images/s2.jpg"
                                            style={ { minHeight: 250, objectFit: "cover" } }
                                            alt="cover"
                                        />
                                        <div className="carousel-caption d-flex align-items-center justify-content-center">
                                            <div className="p-5" style={ { width: "100%", maxWidth: 900 } }>
                                                <h5 className="text-white text-uppercase mb-md-3">
                                                    Best Service Providers in India
                                                </h5>
                                                <h1 className="display-3 text-white mb-md-4">
                                                    Way To Book Warehouse From Home
                                                </h1>
                                                <Link
                                                    to="/"
                                                    className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={ 4 } sm={ 12 } xs={ 12 }>
                        <Card style={ { zIndex: 7 } } className="shadow p-3 mb-5 bg-white rounded">
                            <Card.Body className="cardStorageBody">
                                <Row>
                                    <Col md={ 12 } className="mx-3">
                                        <TabX></TabX>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MainPage;
