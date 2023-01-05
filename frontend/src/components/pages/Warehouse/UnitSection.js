import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcPicture } from "react-icons/fc";
import { FaCheckCircle, FaWarehouse } from "react-icons/fa";
import { BsFillLockFill, BsFillUnlockFill, BsFillCloudSunFill } from "react-icons/bs";
import { GiLockedChest, GiCctvCamera } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";

const UnitSection = ({subUnit, feature}) =>
{
    const [ selectUnit, setSelectUnit ] = useState(0);
    const facilityObj = {
        'cctv': 'CCTV Monitering',
        'indoor': 'Indoor Storage',
        'outdoor': 'Outdoor Storage',
        'climate': 'Climate Control'
    };

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
                                        {subUnit.length}' x {subUnit.width}' x {subUnit.height}'
                                    </h3>
                                    <ul className='list-unstyled d-flex flex-row justify-content-center'>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={ <Tooltip id="button-tooltip-2">Indoor Storage</Tooltip> }
                                        >
                                            { ({ ref, ...triggerHandler }) => (
                                                <Button
                                                    variant="light"
                                                    { ...triggerHandler }
                                                    className="d-inline-flex align-items-center"
                                                >
                                                    <li ref={ ref }><h3 className="text-dark mx-2 text-center"><GiLockedChest /></h3></li>
                                                </Button>
                                            ) }
                                        </OverlayTrigger>
                                        <OverlayTrigger
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
                                        </OverlayTrigger>
                                    </ul>
                                    <div className='list-unstyled d-flex flex-column justify-content-right'>
                                        {feature?.map((ele) => {
                                            return (<p className='float-left'><FaCheckCircle className='mx-2' />{facilityObj[ele]}</p>);
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={ 3 }>
                            <div className="pt-2">
                                <div className="d-grid gap-1 my-3">
                                    <h5 className="mt-4">
                                        ₹{subUnit.price}/<span>day</span>
                                    </h5>
                                    <Button
                                        className="text-center shadow"
                                        variant={ selectUnit === 0 ? "success" : "warning"
                                        } size="md" block
                                        onClick={ () =>
                                        {
                                            if (selectUnit === 0)
                                            {
                                                setSelectUnit(1);
                                            }
                                            else
                                            {
                                                setSelectUnit(0);
                                            }
                                        } }
                                    >{ selectUnit ? <><h5 className='text-center'>Selected &nbsp;<BsFillLockFill /></h5></> : <><h5 className='text-white text-center'>Select Unit &nbsp;<BsFillUnlockFill /></h5></> }</Button>
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
