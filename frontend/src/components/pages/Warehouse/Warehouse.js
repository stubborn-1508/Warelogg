import React, { useState, Fragment, useContext, useEffect } from 'react';
import { useLocation,useNavigate, useNavigation } from 'react-router-dom';
import {
Container,
Row,
Col,
Card,
Button,
Form,
Modal,
Carousel
} from "react-bootstrap";
import { BsFillCartPlusFill, BsFillBookmarksFill } from "react-icons/bs";
import { BiCurrentLocation } from 'react-icons/bi';
import { FcOk, FcPicture } from "react-icons/fc";
import { FaTags } from "react-icons/fa";
import RatingBar from "./RattingBar";
import { Link } from 'react-router-dom';
import "./WarehouseDetails.css";
import UnitSection from "./UnitSection.js";
import ReviewSection from "./ReviewSection";
// import WarehouseDetails from "./WarehouseDetails";
// import { CartContext } from "../../../Contexts/GlobalContextHolder";
import Context from "../../../Contexts/context";
import axios from 'axios';

const Warehouse = () => {
    const ctx = useContext(Context);
    // const { cartValue, changeCartHandler } = useContext(CartContext);
    const loc = useLocation();
    const id = loc.state;

    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(null);

    const fetchData = async (id) => {
        try{
        console.log(id);
        let res = await axios.post("/getMyWareHouses", {data: id});
        // console.log(res.data);
        setWarehouse(res.data);
        }catch(err){
        console.log("Error in fetching data" + err);
        }
    }


    useEffect(() => {
        const usertoken = localStorage.getItem("token");
        if (!usertoken) {
            navigate("/login");
        }else{
            fetchData(id);
        }
    }, []);
    

    const changeCartHandler = () => {
        let param;
        if (ctx.data.cart > 0) {
            param = {
                cart: 1
            }
        } else {
            const tempCart = ctx.data.cart;
            param = {
                cart: tempCart + 1
            }
        }
        ctx.update(param);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleCart = () => {
        setShow(true);
        changeCartHandler();
    }

    console.log(warehouse);

    if(warehouse){
        return (<>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Add to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to continue shopping ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success"><Link to="/storage" className='text-light text-decoration-none'>Continue Shopping</Link></Button>
                    <Button variant="warning">
                        <Link to="/cart" className='text-dark text-decoration-none'>Go to Cart</Link>
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Form>
                    <Card className="mt-5 cardX">
                        <Card.Header className='shadow p-3 bg-white rounded'>
                            <Row>
                                <Col md={6} className="text-center d-flex flex-column">
                                    <h2>ShiNivas Warehouse</h2>
                                    <h6><u> <i><BiCurrentLocation /> </i>Lonavla, Maharashtra, India</u></h6>
                                    <p><u>6 review</u></p>
                                </Col>
                                <Col md={6} className="text-center d-flex flex-column">
                                    <p>200 sq ft Area</p>
                                    <p>1200 cu ft Volume</p>
                                    <h4>
                                        <RatingBar readonly="true" />
                                    </h4>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className="cardStorageBody">
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12} className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <Carousel>
                                        <Carousel.Item className="warehouseCarousel">
                                            <img
                                                className="d-block w-100 h-100"
                                                src="images/s3.jpg"
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item className="warehouseCarousel">
                                            <img
                                                className="d-block w-100 h-100"
                                                src="images/s4.jpg"
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item className="warehouseCarousel">
                                            <img
                                                className="d-block w-100 h-100"
                                                src="images/s6.jpg"
                                                alt="Third slide"
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>
                                            <img
                                                className="d-block w-100 imgSquare mb-2"
                                                src="images/s5.jpg"
                                                alt="First slide"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <img
                                                className="d-block w-100 imgSquare"
                                                src="images/s2.jpg"
                                                alt="First slide"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <img
                                                className="d-block w-100 imgSquare"
                                                src="images/s4.jpg"
                                                alt="First slide"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <img
                                                className="d-block w-100 imgSquare"
                                                src="images/s5.jpg"
                                                alt="First slide"
                                            />
                                        </Col>
                                    </Row>
                                    <Link to="/allImages">
                                        <Button className='float-right mt-2' variant='secondary' size="small"><FcPicture /> All Images</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
    
                    <Card className="shadow p-3 bg-white rounded">
                        <Card.Body>
                            <Row className='my-2'>
                                <Col md={12}>
                                    <h2 className='text-warning mb-5'>Features Available at this Facility :</h2>
                                </Col>
                                <Col md={4} className="">
                                    <p><FcOk /> No Deposit or Admin Fee</p>
                                    <p><FcOk /> Clean - Dry - Secure</p>
                                    <p><FcOk /> Free Automatic Payment Plans</p>
                                    <p><FcOk /> Move-In Trucks</p>
                                    <p><FcOk /> Free Online Account Management</p>
                                    <p><FcOk /> Make Your Payment Online!</p>
                                    <p><FcOk /> Individually timed lighting in most spaces</p>
                                </Col>
                                <Col md={4} className="">
                                    <p><FcOk /> rive-Up Loading and Unloading</p>
                                    <p><FcOk /> Package Signing and Receiving</p> <p><FcOk /> Package Signing and Receiving</p>
                                    <p><FcOk /> 24-Hour Video Monitoring</p>
                                    <p><FcOk /> Motion Sensor Lighting</p>
                                    <p><FcOk /> Electronically Controlled Access</p>
                                    <p><FcOk /> Fire Protected: Sprinklers and Alarms</p>
                                    <p><FcOk /> Convenient Elevator Access</p>
                                </Col>
                                <Col md={4} className="">
                                    <p><FcOk /> Climate Control</p>
                                    <p><FcOk /> SafeStor Protection</p>
                                    <p><FcOk /> Indoor Storage: Twice the Protection and Security</p>
                                    <p><FcOk /> Open 7 Days</p>
                                    <p><FcOk /> Controlled Access for Your Protection</p>
                                </Col>
    
                                <Col md={6}></Col>
                            </Row>
                        </Card.Body>
                    </Card>
    
                    <Row className='mt-3'>
                        <Col md={12} xs={12}>
                            <div className="jumbotron text-center text-dark">
                                <h2 className="text-dark-50">Available Units<span className='mx-3 h6 text-dark'>(All Sizes are approximate)</span></h2>
                                <hr className="" />
                                <p className="lead">
                                    <Row className='my-3'>
                                        <Col md={6}>
                                            <Form.Label>Select Unit Type:</Form.Label>
                                            <Form.Select size="sm">
                                                <option>Split Level Storage</option>
                                                <option>Storage Locker</option>
                                            </Form.Select>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Sort By:</Form.Label>
                                            <Form.Select size="sm">
                                                <option>Price</option>
                                                <option>Size</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </p>
                            </div>
                            {warehouse?.subUnits.map((ele, ind) => {
                                return (<UnitSection subUnit={ele} feature={warehouse.features}/>)
                            })}
                        </Col>
                    </Row>
    
                    <Card className='bg-light text-dark mb-5'>
                        <Card.Body>
                            <Row className='my-5'>
                                <Col
                                    md={6}
                                    className="text-center align-items-center justify-content-center"
                                >
                                    <Form.Group className="mb-3 text-center">
                                        <Form.Label>Start Booking Date</Form.Label>
                                        <Form.Control type="date"
                                            autoComplete='on' />
                                        <Form.Label>End Booking Date</Form.Label>
                                        <Form.Control type="date"
                                            placeholder='dd-mm-yy' autoComplete='on' />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3 text-center">
                                        <Form.Label>Start Booking Time</Form.Label>
                                        <Form.Control type="time" autoComplete='on' />
                                        <Form.Label>End Booking Time</Form.Label>
                                        <Form.Control type="time" autoComplete='on' />
                                    </Form.Group>
                                </Col>
                                <Col lg={12} md={6} sm={12} xs={12}>
                                    <Form.Group className='d-grid gap-1'>
                                        <Button className="mt-5" variant="warning" block onClick={handleCart}>
                                            <h6>Add to Cart &nbsp;<BsFillCartPlusFill /> </h6>
                                        </Button>
                                        <Link to="/cart" className='text-decoration-none' ><Button className=" btn-md btn-block" variant="success" size='large' block onClick={() => changeCartHandler()}>
                                            <h6 className='text-white'>Book Now &nbsp;<FaTags /></h6>
                                        </Button></Link>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </Container>
            <hr className='my-5' />
            <ReviewSection />
        </>
        );
    }else{
        return (<>
        </>);
    }
}
export default Warehouse;

