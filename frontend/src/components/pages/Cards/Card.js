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
import { GiCctvCamera } from "react-icons/gi";
import { AiFillStar,AiOutlineExpand } from "react-icons/ai";
import "./StorageCard.css"
import "../../css/Card.css"
import "./progresssbar.css";
import axios from "axios";

const CardSection = ({ warehouseInfo }) =>
{

    function WarehouseArea(x, y)
    {
        const totalArea = parseInt(x);
        const area = parseInt(y);
        const percentage = (area/totalArea)*100;
        return (
            <>
                <span className="fs-6 float-right margin-left-5px bookedspan">{ `${ totalArea - area } sqft` }</span>
                <span className="fs-6 float-left margin-right-5px bookedspan ">Vacant :</span>
                <ProgressBar className="progressContainer progressBorder textProgrees">
                    {/* <ProgressBar now={ percentage } className="text-dark fs-6" variant="warning" key={ 1 } /> */}
                    <ProgressBar now={100 - percentage }  className="text-black fs-6" variant="success" animated key={ 2 } />
                </ProgressBar >
            </>
        );
    }
    
    let navigate = useNavigate();
    const routeChange = (id) =>
    {
        let path = `/warehouse`;
        navigate(path, {state: id});
    }

    // for pagination
    let active = 1;
    let items = [];
    for (let number = 1; number <= warehouseInfo.size; number++)
    {
        items.push(number);
    }
    const adminPath = window.location.pathname;
    const facilityObj = {
        'cctv': 'CCTV Monitering',
        'indoor': 'Indoor Storage',
        'outdoor': 'Outdoor Storage',
        'climate': 'Climate Control'
    };

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
                        let facility = '';
                        let length = 0;
                        let width = 0;
                        let height = 0;
                        let occ = 0;

                        warehouse.features.map((ele)=>{
                            facility = facility + facilityObj[ele] + ', ';
                        });

                        warehouse.subUnits.map((ele) => {
                            length = length + parseInt(ele.length);
                            width = width + parseInt(ele.width);
                            height = height + parseInt(ele.height);
                            occ = occ + parseInt(ele.spaceOccupied);
                        });
                        return <Col lg={ 3 } md={ 1 } sm={ 6 } xs={ 12 } key={ key }>
                            <Card className={adminPath==="/admin"?"rounded shadow bg-white overflow-hidden mb-2 my-4":"rounded shadow bg-white overflow-hidden mb-2 my-4 cardHover"} onClick={ () =>
                                routeChange(warehouse._id) }>
                                <img className="img-fluid" src="images/s5.jpg" alt="" />
                                <div className="bg-secondary p-4">
                                    <b className="text-dark h6">{ warehouse.name } Warehouse</b>
                                    <div className="d-flex flex-column justify-content-between mb-3 card-content-4 ">
                                        <div className="d-flex justify-content-flex-start h-20%">
                                            <i className="h4"><IoMdPin className="text-primary mr-1" /></i>
                                            <h6 className="m-1">
                                                { warehouse.city }
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-flex-start h-20%">
                                            <i className="h4">{ facility[ 0 ] ? <GiCctvCamera className="text-blue mr-1" /> : <BsCloudLightningRainFill className="text-blue mr-1" /> }</i>
                                            <h6 className="m-1">
                                                { facility }
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-flex-start h-40%">
                                            <i className="h4"><AiOutlineExpand className="text-blue mr-1" /> </i>
                                            <h6 className="m-1">
                                                { length + 'x' + width + 'x' + height }
                                            </h6>

                                        </div>
                                        <div className="d-flex justify-content-flex-start h-20%">
                                            <i className="h4"><AiFillStar className="text-warning" /> </i>
                                            <h6 className="m-1">
                                                { warehouse.rating }
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="border-top pt-2">
                                        <h6 className="m-1">{ WarehouseArea(length*width, occ) }</h6>
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
