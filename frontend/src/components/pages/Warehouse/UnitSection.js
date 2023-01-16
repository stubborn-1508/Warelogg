import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Tooltip, OverlayTrigger, Image, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FcPicture } from "react-icons/fc";
import { FaCheckCircle, FaWarehouse } from "react-icons/fa";
import { BsFillLockFill, BsFillUnlockFill, BsFillCloudSunFill } from "react-icons/bs";
import { GiLockedChest, GiCctvCamera } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import context from '../../../Contexts/context';
import axios from 'axios';

const convertNumToDate = (num) => {
    let result = "";
    let d = new Date(num);
    result += d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    return result;
}

const convertDateToNum = (date) => {
    let num = new Date(date);
    num = Date.parse(num);
    return num;
}

const UnitSection = ({ subUnit, feature, warehouse_id, name }) => {
    const ctx = useContext(context);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [selectUnit, setSelectUnit] = useState(false);


    const [status, setStatus] = useState(subUnit.toOcc === subUnit.fromOcc ? 'Available' : `Occupied from ${convertNumToDate(subUnit.fromOcc)} to ${convertNumToDate(subUnit.toOcc)}`);

    const facilityObj = {
        'cctv': 'CCTV Monitering',
        'indoor': 'Indoor Storage',
        'outdoor': 'Outdoor Storage',
        'climate': 'Climate Control'
    };

    const fetchData = async (usertoken) => {
        const res1 = await axios.get("/getAllUsers", {
            headers: { "x-auth-token": usertoken },
        });
        const id = subUnit._id;
        const res2 = await axios({ url: "/assignCarts", data: { user_id: res1.data._id, subUnit_id: id }, method: 'post' });
        setSelectUnit(res2.data.message);
        setUserId(res1.data._id);
    }

    useEffect(() => {
        // get user_id
        const usertoken = localStorage.getItem("token");
        if (!usertoken) {
            setSelectUnit(false);
        } else {
            fetchData(usertoken);
        }
    }, []);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChangeEndDate = (e) => {
        const num = convertDateToNum(e.target.value);
        if (!startDate || startDate === '') {
            alert('First Choose starting Date');
            setEndDate(null);
            return;
        }
        if (subUnit.toOcc === subUnit.fromOcc) {
            setStatus('Available');
            setEndDate(num);
        } else if ((startDate <= subUnit.fromOcc && num > subUnit.fromOcc) || (num <= startDate)) {
            setStatus('Choose the correct ending date');
            setEndDate(null);
        } else {
            setStatus(`Occupied from ${convertNumToDate(subUnit.fromOcc)} to ${convertNumToDate(subUnit.toOcc)}`);
            setEndDate(num);
        }

    }

    const handleChangeStartDate = (e) => {
        const num = convertDateToNum(e.target.value);
        if (subUnit.toOcc === subUnit.fromOcc) {
            setStatus('Available');
            setStartDate(num);
        } else if (num > subUnit.fromOcc && num < subUnit.toOcc) {
            setStatus('Choose the correct starting date');
            setStartDate(null);
        } else {
            setStatus(`Occupied from ${convertNumToDate(subUnit.fromOcc)} to ${convertNumToDate(subUnit.toOcc)}`);
            setStartDate(num);
        }
        // setStartDate(e.target.value);
    }


    const handleSelectWarehouse = (e) => {
        if (selectUnit == false) {
            handleAddToCart(e);
            // setSelectUnit(!selectUnit);
        } else {
            navigate('/cart', { state: userId });
        }
    }

    const add = async (userData) => {
        try {
            const res = await axios({ url: "/addToCart", data: userData, method: "post" });
            console.log(res);
            return [res.data, res.status];
        } catch (e) {
            console.log(e);
            return [e.response.data, e.response.status];
        }
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        const usertoken = localStorage.getItem("token");
        if(!usertoken){
            navigate('/login');
            return;
        }
        const CartData = {
            user_id: userId,
            cartContent: {
                warehouse_id: warehouse_id,
                subUnit_id: subUnit._id,
                Name: name,
                Size: subUnit.length + 'x' + subUnit.width + 'x' + subUnit.height,
                OccFrom: startDate,
                OccTo: endDate,
                Price: subUnit.price
            }
        }

        const waitRes = await add(CartData);
        if (waitRes[1] === 200) {
            setSelectUnit(true);
        } else {
            setSelectUnit(false);
            alert(waitRes[0]);
        }
    }

    return (
        <>
            <Card className='my-5 shadow mb-5 bg-white rounded '>
                <Card.Body className="">
                    <Row className="h-50 text-dark  rounded-3 text-center">
                        <Col md={5} className="">
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src="/images/s6.jpg" alt="" />
                            </div>
                            <Link to="/allImages" className='d-grid text-decoration-none'>
                                <Button className='mt-2 btn btn-secondary' variant='secondary' size="md" block><FcPicture /> All Images</Button>
                            </Link>
                        </Col>
                        <Col md={4} className="">
                            <Row className="">
                                <Col lg={12} md={12} className="d-grid gap-1 my-2">
                                    <h3 className="text-dark">
                                        {subUnit.length}' x {subUnit.width}' x {subUnit.height}'
                                    </h3>
                                    <ul className='list-unstyled d-flex flex-row justify-content-center'>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">Indoor Storage</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    {...triggerHandler}
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ref}><h3 className="text-dark mx-2 text-center"><GiLockedChest /></h3></li>
                                                </Button>
                                            )}
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">CCTV Camera</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    {...triggerHandler}
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ref}><h3 className="text-dark mx-2"><GiCctvCamera /></h3></li>
                                                </Button>
                                            )}
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">Out Door/ Drive Up</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    {...triggerHandler}
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ref}><h3 className="text-dark mx-2"><FaWarehouse /></h3></li>
                                                </Button>
                                            )}
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">Climate Control</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    {...triggerHandler}
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ref}><h3 className="text-dark mx-2"><BsFillCloudSunFill /></h3></li>
                                                </Button>
                                            )}
                                        </OverlayTrigger>
                                    </ul>
                                    <div className='list-unstyled d-flex flex-column justify-content-right'>
                                        {feature?.map((ele) => {
                                            return (<p className='float-left'><FaCheckCircle className='mx-2' />{facilityObj[ele]}</p>);
                                        })}
                                    </div>
                                    {selectUnit === true ? <>
                                    </> :  <>
                                        <div>
                                            <Form.Group className="mb-3 text-center d-flex">
                                                <div style={{ marginRight: "50px" }}>
                                                    <Form.Label>Start Booking Date</Form.Label>
                                                    <Form.Control type="date"
                                                        autoComplete='on' onChange={handleChangeStartDate} />
                                                </div>
                                                <div style={{ marginRight: "50px",position:"relative",zIndex:"10"}}>
                                                    <Form.Label>End Booking Date</Form.Label>
                                                    <Form.Control type="date"
                                                        placeholder='dd-mm-yy' autoComplete='on' onChange={handleChangeEndDate} />
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </>}
                                    <div className='list-unstyled d-flex flex-column justify-content-right'>
                                        {status}
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={3}>
                            {<>
                                    <div className="pt-2">
                                        <div className="d-grid gap-1 my-3">
                                            <h5 className="mt-4">
                                                ₹{subUnit.price}/<span>day</span>
                                            </h5>
                                            <Button
                                                className="text-center shadow"
                                                variant={selectUnit === false ? "success" : "warning"
                                                } size="md" block
                                                onClick={handleSelectWarehouse}
                                            >{selectUnit ? <><h5 className='text-center'>Go to Cart &nbsp;<BsFillLockFill /></h5></> : <><h5 className='text-white text-center'>Add to Cart &nbsp;<BsFillUnlockFill /></h5></>}</Button>
                                        </div>
                                    </div>
                                </>}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default UnitSection;
