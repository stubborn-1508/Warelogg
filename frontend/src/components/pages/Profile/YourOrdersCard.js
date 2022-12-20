import React from 'react'
import { Link } from "react-router-dom";
import { FcClock, FcRating, FcGlobe, FcCamcorderPro, FcRuler, FcCurrencyExchange } from "react-icons/fc";
import { Row, Col, Card, Button } from "react-bootstrap";
const YourOrdersCard = ({ muted }) =>
{
    return (
        <>
            <Card className='my-5 shadow p-3 mb-5 bg-white rounded'>
                <Card.Header className="text-center text-dark bg-warning h4 ">
                    <b>Shree Warehouse</b>
                </Card.Header>
                <Card.Body className="">
                    <Row md={ 12 } className="h-100 text-dark  rounded-3 text-center">
                        <Col md={ 4 }>
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src="/images/s6.jpg" alt="" />
                            </div>
                        </Col>
                        <Col md={ 4 }>
                            <div className="d-flex flex-column justify-content-between mb-3">
                                <h5 className="m-1">
                                    <i><FcGlobe /> </i>
                                    Nagpur-Maharashtra
                                </h5>
                                <h6 className="m-1">
                                    <i><FcCamcorderPro /> </i>
                                    CCTV Monitoring
                                </h6>
                                <h6 className="m-1">
                                    <i><FcRuler /> </i>
                                    4000sq.ft Volume
                                </h6>
                                <h6 className="m-1">
                                    <i><FcRating /> </i>
                                    4.5
                                </h6>
                                <h6 className="m-1">
                                    <i><FcCurrencyExchange /> </i>
                                    { 9000 } ₹
                                </h6>
                            </div>
                        </Col>
                        <Col md={ 4 }>
                            <div className="pt-2">
                                <div className="d-grid gap-1">
                                    <Link to="/live" style={ { textDecoration: "none" } }
                                        onClick={ e => muted ? e.preventDefault() : '' }
                                    ><Button
                                        className={ muted ? "btn btn-block text-white text-decoration-line-through" : "btn btn-block text-white" } variant={ muted ? "dark" : "blue" } size="md" block disabled={ muted ? true : false }>Live Footage</Button></Link>
                                </div>
                                <div className="d-grid gap-1 my-2">
                                    <Link to="/warehouse" style={ { textDecoration: "none" } }><Button
                                        className="btn btn-block text-white" variant="success" size="md" block>Book Again</Button></Link>
                                </div>
                                <div className="d-grid gap-1 my-2">
                                    <Link to="/refund" style={ { textDecoration: "none" } }><Button
                                        className={ muted ? "d-none" : "btn btn-block text-white" } variant="danger" size="md" block>Cancel Your Booking</Button></Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default YourOrdersCard;
