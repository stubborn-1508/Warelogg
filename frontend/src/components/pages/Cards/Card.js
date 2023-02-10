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
import { BsCloudLightningRainFill, BsFillCloudSunFill } from "react-icons/bs";
import { GiCctvCamera, GiLockedChest } from "react-icons/gi";
import { AiFillStar, AiOutlineExpand } from "react-icons/ai";
import { GrLocation, GrUpdate } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { Ri24HoursFill } from "react-icons/ri"
import { FaWarehouse, FaExpandArrowsAlt } from "react-icons/fa";
import "./StorageCard.css"
import "../../css/Card.css"
import "./progresssbar.css";
import axios from "axios";
import { IconContext } from "react-icons/lib";

const CardSection = ({ warehouseInfo }) =>
{

    function WarehouseArea(x, y)
    {
        const totalArea = parseInt(x);
        const area = parseInt(y);
        let percentage = (area/totalArea)*100;
        if(percentage<=8 && percentage>0){
            percentage = 8;
        }
        let remArea = "Vacant: "
        let occArea = "Booked: "
        remArea += `${totalArea-area} sqft`
        occArea += `${area} sqft`
        return (
            <>
                <div className="nonLaptopView">{remArea}</div>
                <ProgressBar className="progressContainer progressBorder textProgrees">
                    <ProgressBar title={remArea} now={100 - percentage }  className="text-black fs-6" variant="success" animated key={ 2 } />
                    <ProgressBar title={occArea} now={ percentage } className="text-dark fs-6" variant="warning" key={ 1 } />
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
    console.log(warehouseInfo)
    const adminPath = window.location.pathname;
    const facilityObj = {
        'cctv': 'CCTV Monitering',
        'indoor': 'Indoor Storage',
        'outdoor': 'Outdoor Storage',
        'climate': 'Climate Control'
    };

    const fac = new Map([
        ["CCTV Monitering", 
            <IconContext.Provider
                value={{ color: '#059EAE' , size: '35px' }}
            >
            <div>
                <GiCctvCamera/>
            </div>
            </IconContext.Provider>],
        ["Indoor Storage",
            <IconContext.Provider
                value={{ color: '#FF782C', size: '35px' }}
            >
            <div>
                <GiLockedChest/>
            </div>
            </IconContext.Provider>],
        ["Outdoor Storage",
            <IconContext.Provider
                value={{ color: '#FF3030', size: '35px' }}
            >
            <div>
                {/* <RiTruckLine/> */}
                <ImTruck/>
                {/* <FaWarehouse/> */}
            </div>
            </IconContext.Provider>],
        ["Climate Control",
            <IconContext.Provider
                value={{ color: '#F2C719', size: '35px' }}
            >
            <div>
                <BsFillCloudSunFill/>
            </div>
            </IconContext.Provider>]
    ]);
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
                    { (warehouseInfo = adminPath==='/admin' ? warehouseInfo : warehouseInfo.filter(el => el.isVerified===true)).map((warehouse, key) =>
                    {
                        let facility = [];
                        let length = 0;
                        let width = 0;
                        let height = 0;
                        let occ = 0;

                        warehouse.features.map((ele)=>{
                            facility.push(facilityObj[ele]);
                        });
                        let subUnitStr = "";
                        let totArea = 0;
                        // for(var it = 0; it<warehouse.subUnits.length; it++){
                        //     subUnitStr += `SubUnit ${it+1}: ${warehouse.subUnits[it].length} x ${warehouse.subUnits[it].width} x ${warehouse.subUnits[it].height}`;
                        //     subUnitStr += '\n';
                        //     totArea += (warehouse.subUnits[it].length*warehouse.subUnits[it].width);
                        // }

                        // warehouse.subUnits.map((ele) => {
                        //     length = length + parseInt(ele.length);
                        //     width = width + parseInt(ele.width);
                        //     height = height + parseInt(ele.height);
                        //     occ = occ + parseInt(ele.spaceOccupied);
                        // });
                        return <Col lg={ 3 } md={ 4 } sm={ 6 } xs={ 12 } key={ key } >
                            <Card className={adminPath==="/admin"?"rounded shadow bg-white overflow-hidden mb-2 my-4":"rounded shadow bg-white overflow-hidden mb-2 my-4 cardHover"} onClick={ () =>
                                routeChange(warehouse._id) }>
                                <img className="img-fluid" src="images/s5.jpg" alt="" />
                                    <div className="bg-secondary d-flex paddingInCity justify-content-between">
                                        <div>
                                            <i className="h4"><MdOutlineLocationOn className="text-primary mr-1" /></i>
                                                { warehouse.city }
                                        </div>
                                        <div>
                                            <i className="h4 justify-content"><AiFillStar className="text-warning" /> </i>
                                                {warehouse.rating}/5
                                        </div>
                                    </div>
                                    {/* <div className="distanceStyle bg-secondary">x kms away</div> */}
                                    <div className="bg-secondary heightdiv paddingInName d-flex flex-column justify-content-around">
                                        <div className = "d-flex flex-row justify-content-between "> 
                                            <b className="text-dark warehouseNameStyle">{ warehouse.name } Warehouse</b>
                                        </div>
                                        <div>
                                            <div className="d-flex flex-row justify-content-around">
                                                {facility.map((ele, id)=>{
                                                    return (
                                                        <span key={id} title={ele}>
                                                        {fac.get(ele)}
                                                        {/* <i className="h4">{ facility[ 0 ] ? <GiCctvCamera className="text-blue mr-1" /> : <BsCloudLightningRainFill className="text-blue mr-1" /> }</i> */}
                                                        {/* <h6 className="m-1">
                                                            { ele }
                                                        </h6> */}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                            <div title = {subUnitStr} className="d-flex justify-content-flex-start">
                                                <i className="h4"><FaExpandArrowsAlt className="areaIcon" /> </i>
                                                <h6 className="areaText">
                                                    Total Area: {totArea} sqft
                                                </h6>
                                            </div>
                                            <div className="d-flex flex-row justify-content-start">
                                                <i><GrUpdate/></i>
                                                <div className="realtimeUpdates" style={{marginLeft:"0.7rem", fontSize:"0.9rem"}}>Realtime updates</div>
                                            </div>
                                            <div className="d-flex flex-row justify-content-start">
                                                <i className="updatesIcon"><Ri24HoursFill/></i>
                                                <div className="realtimeUpdates" style={{marginLeft:"0.5rem", fontSize:"0.9rem"}}>Updated 24hrs ago</div>
                                            </div>
                                    </div>
                                <div className="border-top pt-2 prgbar bg-secondary">
                                    <h6 className="m-1">{ WarehouseArea(totArea, occ) }</h6>
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
                        {/* <Pagination size="lg" variant="success">
                            <Pagination.First className="" />
                            { items.map((number, key) =>
                            {
                                return <Pagination.Item className="" key={ key } active={ number === active } >
                                    { number }
                                </Pagination.Item>
                            }) }
                            <Pagination.Last />
                        </Pagination> */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default CardSection;
