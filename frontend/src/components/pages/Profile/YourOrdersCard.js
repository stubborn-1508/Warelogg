import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { FcClock, FcRating, FcGlobe, FcCamcorderPro, FcRuler, FcCurrencyExchange } from "react-icons/fc";
import { BiCuboid } from "react-icons/bi";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from 'axios';


const convertNumToDate = (num) => {
    let result = "";
    let d = new Date(num);
    result += d.getDate() + "/" + (d.getMonth() + 1) +  "/" + d.getFullYear() 
    console.log(num);
    return result;
}

const YourOrdersCard = ({ muted, bookData }) =>
{
    const [orderCard,setOrderCard] = useState(null);

    const fetchSubUnit = async (id) => {
        const res = await axios({url: '/getSubunit', data:{id: id}, method:'post'});
        if(res.status !== 200){
            alert('Try Again!!');
        }
        setOrderCard(res.data);
    }

    useEffect(() => {
        let id = bookData.subUnit_id;
        fetchSubUnit(id);
        console.log(bookData);
        console.log('hello');
        console.log(bookData.OccFrom);
        console.log(bookData.OccTo);

    }, []);

    const cancelBooking = async(subUnit_id) => {
        const res = await axios({url: '/cancelBooking', data: {id: subUnit_id}, method: 'post'});
        if(res.status!==200){
            alert('Try Again!!');
        }
        muted = true;
    }

    if(!orderCard){
        // Apply Loader
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
                                        <i><BiCuboid/> </i>
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
    }else{
        return (
            <>
                <Card className='my-5 shadow p-3 mb-5 bg-white rounded'>
                    <Card.Header className="text-center text-dark bg-warning h4 ">
                        <b>{orderCard.Name}</b>
                    </Card.Header>
                    <Card.Body className="">
                        <Row md={ 12 } className="h-100 text-dark  rounded-3 text-center">
                            <Col md={ 4 }>
                                <div className="rounded overflow-hidden mb-2">
                                    <img className="img-fluid" src="/images/s6.jpg" alt="" />
                                </div>
                            </Col>
                            <Col md={ 5 } className=" ">
                                <div className="d-flex flex-wrap justify-content-between mt-4 mb-5">
                                    <h6 className="m-1">
                                        <i><FcGlobe /> </i>
                                        {orderCard.city}-{orderCard.state}
                                    </h6>
                                    <h6 className="m-1">
                                        <i><BiCuboid style={{color:"blue"}}/> </i>
                                        {parseInt(orderCard.length)*parseInt(orderCard.width)*parseInt(orderCard.height)}sq.ft Volume
                                    </h6>
                                    <h6 className="m-1">
                                        <i><FcRating /> </i>
                                        4.5
                                    </h6>
                                    <h6 className="m-1">
                                        <i><FcCurrencyExchange /> </i>
                                        { orderCard.price } ₹
                                    </h6>
                                </div>
                                <div className='text-center mb-5'>
                                    {bookData.isActive==true?
                                <>
                                <h5 className="mb-0">Occupied From - {convertNumToDate(bookData.fromOcc)}</h5>
                                <h5 className="mb-0">To - {convertNumToDate(bookData.toOcc)}</h5>
                                </>:<></>
                                }
                                </div>
                            </Col>
                            <Col md={3}>
                            <div className="pt-2">
                                    <div className="d-grid gap-1 my-2">
                                        <Link to="/live" style={ { textDecoration: "none" } }
                                            onClick={ e => muted ? e.preventDefault() : '' }
                                        ><Button
                                            className={ muted ? "btn btn-block text-white text-decoration-line-through" : "btn btn-block text-white" } variant={ muted ? "dark" : "blue" } size="md" block disabled={ muted ? true : false }>Live Footage</Button></Link>
                                    </div>
                                    { muted ? <div className="d-grid gap-1 my-2">
                                        <Link to="/warehouse" style={ { textDecoration: "none" } }><Button
                                            className="btn btn-block text-white" variant="success" size="md" block>Book Again</Button></Link>
                                    </div>: <div className="d-grid gap-1 my-2">
                                        <Link to="/refund" style={ { textDecoration: "none" } }><Button
                                            className={ muted ? "d-none" : "btn btn-block text-white" } variant="danger" size="md" block onClick={() => {cancelBooking(orderCard._id)}}>Cancel Your Booking</Button></Link>
                                    </div> }
                                       <div className="d-grid gap-1 my-2">
                                       <Link to="/" style={ { textDecoration: "none" } }><Button
                                            className="btn btn-block text-white" variant="warning" size="md" block>Give feedback here</Button></Link>
                                       </div>
                                </div>
                            </Col>
                            {/* <Col md={ 4 }>
                                <div className="pt-2">
                                    <div className="d-grid gap-1">
                                        <Link to="/live" style={ { textDecoration: "none" } }
                                            onClick={ e => muted ? e.preventDefault() : '' }
                                        ><Button
                                            className={ muted ? "btn btn-block text-white text-decoration-line-through" : "btn btn-block text-white" } variant={ muted ? "dark" : "blue" } size="md" block disabled={ muted ? true : false }>Live Footage</Button></Link>
                                    </div>
                                    { muted ? <div className="d-grid gap-1 my-2">
                                        <Link to="/warehouse" style={ { textDecoration: "none" } }><Button
                                            className="btn btn-block text-white" variant="success" size="md" block>Book Again</Button></Link>
                                    </div>: <div className="d-grid gap-1 my-2">
                                        <Link to="/refund" style={ { textDecoration: "none" } }><Button
                                            className={ muted ? "d-none" : "btn btn-block text-white" } variant="danger" size="md" block onClick={() => {cancelBooking(orderCard._id)}}>Cancel Your Booking</Button></Link>
                                    </div> }   
                                </div>
                            </Col> */}
                        </Row>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default YourOrdersCard;
