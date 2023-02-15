import filterData from '../../../assets/filter';
import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcPicture } from "react-icons/fc";
import { FaCheckCircle, FaWarehouse } from "react-icons/fa";
import { BsFillLockFill, BsFillUnlockFill, BsFillCloudSunFill } from "react-icons/bs";
import { GiLockedChest, GiCctvCamera } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";

const UnitSection = (props) =>
{
    const [ selectUnit, setSelectUnit ] = useState(0);

    const [price, setPrice] = useState(props.sectionDetails.price);

    const convertNumToDate = (num) => {
        let result = "";
        let d = new Date(num);
        result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()
        return result;
    }

    const handleInput = (e) => {
        // const id = e.target.id.spilt('$')[1];
        setPrice(e.target.value);
    }

    const edit = async (userData) => {
        try{
          const res = await axios({ url: "/editPrice", data: userData, method: "post" });
          return [res.data, res.status];
        }catch (e){
          console.log(e);
          return [e.response.data.message, e.response.status];
        }
      }

    const editPrice = async (e) => {
        const id = e.target.id;
        const data = {
            warehouseID: props.sectionDetails.warehouseID,
            id: id,
            price: price
        }

        const waitRes = await edit(data);
        if(waitRes[1] !== 200){
            alert(waitRes[0]);
        }
    }
    console.log(props.facilities);

    return (
        <>
            <Card className='my-5 shadow mb-5 bg-white rounded '>
                <Card.Body className="">
                    <Row className="h-50 text-dark  rounded-3 text-center">
                        <Col md={ 5 } className="">
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src="/images/s6.jpg" alt="" />
                            </div>
                            <Link to="/allImages" className='d-grid text-decoration-none'>
                                <Button className='mt-2 btn btn-secondary' variant='secondary' size="md" block><FcPicture /> All Images</Button>
                            </Link>
                        </Col>
                        <Col md={ 4 } className="">
                            <Row className="">
                                <Col lg={ 12 } md={ 12 } className="d-grid gap-1 my-2">
                                    <h3 className="text-dark">
                                        {props.sectionDetails.length}' x {props.sectionDetails.width}' x {props.sectionDetails.height}'
                                    </h3>
                                    <ul className='list-unstyled d-flex flex-row justify-content-center'>
                                        { props?.facilities?.map((el, ind) => {
                                            return (<OverlayTrigger
                                                placement="bottom"
                                                overlay={ <Tooltip id="button-tooltip-2">{filterData[el].name}</Tooltip> }
                                            >
                                                { ({ ref, ...triggerHandler }) => (
                                                    <Button
                                                        variant="light"
                                                        { ...triggerHandler }
                                                        className="d-inline-flex align-items-center"
                                                    >
                                                        <li ref={ ref }><h3 className="text-dark mx-2 text-center">{filterData[el].icon}</h3></li>
                                                    </Button>
                                                ) }
                                            </OverlayTrigger>);
                                        }) }
                                        {/* <OverlayTrigger
                                            placement="bottom"
                                            overlay={ <Tooltip id="button-tooltip-2">CCTV Camera</Tooltip> }
                                        >
                                            { ({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    { ...triggerHandler }
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ ref }><h3 className="text-dark mx-2"><GiCctvCamera /></h3></li>
                                                </Button>
                                            ) }
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={ <Tooltip id="button-tooltip-2">Out Door/ Drive Up</Tooltip> }
                                        >
                                            { ({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    { ...triggerHandler }
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ ref }><h3 className="text-dark mx-2"><FaWarehouse /></h3></li>
                                                </Button>
                                            ) }
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={ <Tooltip id="button-tooltip-2">Climate Control</Tooltip> }
                                        >
                                            { ({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    { ...triggerHandler }
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ ref }><h3 className="text-dark mx-2"><BsFillCloudSunFill /></h3></li>
                                                </Button>
                                            ) }
                                        </OverlayTrigger> */}
                                    </ul>
                                    {/* <div className='list-unstyled d-flex flex-column justify-content-right'>
                                        {props.sectionDetails.facility.map((ele, ind) => {
                                            return (
                                                <p id={ind} key={ind} className='float-left'><FaCheckCircle className='mx-2' />{featureArr[ele]}</p>
                                            );
                                        })}
                                    </div> */}
                                </Col>
                            </Row>
                        </Col>

                        <Col md={ 3 }>
                            <div className="pt-2">
                                <div className="d-grid gap-1 my-3">
                                    <h5 className="mt-4">
                                        ₹<input id={props.sectionDetails.id+'$input'} defaultValue={price} style={{display:"inline",width:"150px",textAlign:"right"}} onChange={handleInput}/>/<span>day</span>
                                    </h5>
                                    <Button
                                        id={props.sectionDetails.id}
                                        className="text-center shadow"
                                        onClick={editPrice}
                                    >Edit Price</Button>
                                </div>
                            </div>
                            {/* <div className="pt-2">
                                <div className="d-grid gap-1 my-3">
                                    <h5>Space Occupied: {props.sectionDetails.spaceOccupied} sq ft</h5>
                                </div>
                            </div> */}
                            <div className="pt-2" style={{border: "2px solid black"}}>
                                <div className="d-grid gap-1 my-3">
                                    {(props.sectionDetails.status === "0")?(<><h6>--Not Occupied--</h6></>):(<>
                                    <h6>Occupied From: {convertNumToDate(props.sectionDetails.fromOcc)}</h6>
                                    <h6>Occupied To: {convertNumToDate(props.sectionDetails.toOcc)}</h6>
                                    </>)}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default UnitSection;
