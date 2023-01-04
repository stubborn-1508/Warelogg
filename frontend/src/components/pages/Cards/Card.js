import React, {useState} from "react";
import StorageCard from "./StorageCard.js";
import
{
    Container,
    Row,
    Col,
    Card,
    ProgressBar,
    Pagination
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FcClock, FcRating, FcGlobe, FcCamcorderPro, FcOrgUnit, FcHome } from "react-icons/fc";
import { IoMdPin } from "react-icons/io";
import { BsCloudLightningRainFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import "./StorageCard.css"
import "./progresssbar.css";
import axios from "axios";

const CardSection = ({ warehouseInfo }) =>
{

    function WarehouseArea()
    {
        const totalArea = warehouseInfo.totalArea;
        const area = warehouseInfo.area;
        const percentage = warehouseInfo.percentage;
        return (
            <>
                <span className="fs-6 float-left">{ percentage }Booked</span>
                <span className="fs-6 float-right">Vacant</span>
                <ProgressBar className="progressContainer">
                    <ProgressBar now={ 100 - percentage } label={ `${ area }sqft` } className="text-dark fw-bold fs-6" variant="warning" key={ 1 } />
                    <ProgressBar now={ 100 } label={ `${ totalArea - area }sqft` } className="text-light fw-bold fs-6" variant="success" animated key={ 2 } />
                </ProgressBar >
            </>
        );
    }

    let navigate = useNavigate();
    const routeChange = () =>
    {
        let path = `/warehouse`;
        navigate(path);
    }

    // for pagination
    let active = 1;
    let items = [];
    for (let number = 1; number <= warehouseInfo.size; number++)
    {
        items.push(number);
    }
    const adminPath = window.location.pathname;
    const facility = [ "CCTV Monitoring", "Climate Control", "Indoor Storage", "Outdoor/Drive Up" ];

    // const 

    const verifyWarehouse = async (id) => {
        try{
            const res = await axios({ url: "/verifyWarehouse", data: {id: id}, method: "post" });
            return res.data;
        }catch (e){
            return [e.response.data, e.response.status];
        }
    }

    const handleVerify = async (id, ind) => {
        const waitRes = await verifyWarehouse(id);

        if(waitRes){
            window.location.reload();
        }
    }
    return (
        <>
            <Container fluid>
                <Row>
                    { warehouseInfo.map((warehouse, key) =>
                    {
                        return <Col lg={ 4 } md={ 6 } sm={ 6 } xs={ 12 } key={ key }>
                            <Card className={adminPath==="/admin"?"rounded shadow bg-white overflow-hidden mb-2 my-4":"rounded shadow bg-white overflow-hidden mb-2 my-4 cardHover"} onClick={ () =>
                                routeChange() }>
                                <img className="img-fluid" src="images/s5.jpg" alt="" />
                                <div className="bg-secondary p-4">
                                    <b className=" text-dark h5">{ warehouse.name } Warehouse</b>
                                    <div className="d-flex flex-column justify-content-between mb-3">
                                        <h6 className="m-1">
                                            <i className="h4"><IoMdPin className="text-primary mr-1" /></i>
                                            { warehouse.city }
                                        </h6>
                                        <h6 className="m-1">
                                            <i className="h4">{ facility[ 0 ] ? <FcCamcorderPro className="text-blue mr-1" /> : <BsCloudLightningRainFill className="text-blue mr-1" /> }</i>
                                            { warehouse.facility }
                                        </h6>
                                        <h6 className="m-1">
                                            <i className="h4"><FcOrgUnit className="text-blue mr-1" /> </i>
                                            { warehouse.size }
                                        </h6>
                                        <h6 className="m-1">
                                            <i className="h4"><AiFillStar className="text-warning" /> </i>
                                            { warehouse.rating }
                                            <p className="m-0 float-right">from { warehouse.price } ₹</p>
                                        </h6>
                                    </div>
                                    <div className="border-top pt-2">
                                        <h6 className="m-1">{ WarehouseArea(70, 50) }</h6>
                                    </div>
                                </div>
                            </Card>
                            {adminPath==="/admin" ? (warehouse.isVerified==true ? <h6>Verified </h6>:<button onClick={()=>{
                                handleVerify(warehouse._id, key);
                            }}>Verify</button>) : <></>}
                        </Col>
                    }) }
                </Row>
                <Row>
                    <Col md={ 12 } xs={ 12 } className="">
                        <Pagination size="lg" variant="success">
                            <Pagination.First className="" />
                            { items.map((number, key) =>
                            {
                                return <Pagination.Item className="" key={ key } active={ number === active } >
                                    { number }
                                </Pagination.Item>
                            }) }
                            <Pagination.Last />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default CardSection;
