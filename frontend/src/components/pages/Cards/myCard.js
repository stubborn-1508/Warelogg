import React from "react";
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

const MyCardSection = ({ warehouseInfo }) =>
{
    function WarehouseArea(x, y)
    {
        const totalArea = parseInt(x);
        const area = parseInt(y);
        const percentage = (area/totalArea)*100;
        return (
            <>
                <span className="fs-6 float-left">Booked</span>
                <span className="fs-6 float-right">Vacant</span>
                <ProgressBar className="progressContainer">
                    <ProgressBar now={ percentage } label={ `${ area }sqft` } className="text-dark fw-bold fs-6" variant="warning" key={ 1 } />
                    <ProgressBar now={ 100 - percentage } label={ `${ totalArea - area }sqft` } className="text-light fw-bold fs-6" variant="success" animated key={ 2 } />
                </ProgressBar >
            </>
        );
    }

    let navigate = useNavigate();
    const routeChange = (id) =>
    {
        let path = `/listedSpace`;
        navigate(path, {state: id});
    }

    // for pagination
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++)
    {
        items.push(number);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    { warehouseInfo.map((warehouse, key) =>
                    {
                        const id = warehouse._id;
                        return (<Col lg={ 6 } md={ 9 } sm={ 9 } xs={ 12 } key={ key }>
                            <Card className="rounded shadow bg-white overflow-hidden mb-2 my-4 cardHover" onClick={() => {
                                    routeChange(id);
                                }}>
                                    <img className="img-fluid" src="images/s5.jpg" alt="" />
                                <div className="bg-secondary p-4">
                                    <b className=" text-dark h5">{ warehouse.name }</b>
                                    <div className="d-flex flex-column justify-content-between mb-3">
                                        <h6 className="m-1">
                                            <i className="h4"><IoMdPin className="text-primary mr-1" /></i>
                                            { warehouse.businessAddress + ", " + warehouse.city + ", " +warehouse.state }
                                        </h6>
                                        {/* <h6 className="m-1">
                                            <i className="h4">{ facility[ 0 ] ? <FcCamcorderPro className="text-blue mr-1" /> : <BsCloudLightningRainFill className="text-blue mr-1" /> }</i>
                                            { warehouse.facility }
                                        </h6> */}
                                        <h6 className="m-1">
                                            <i className="h4"><FcOrgUnit className="text-blue mr-1" /> </i>
                                            { warehouse.size } sq ft
                                        </h6>
                                    </div>
                                    {/* <div className="border-top pt-2">
                                        <h6 className="m-1">{ WarehouseArea(warehouse.totalArea, warehouse.area) }</h6>
                                    </div> */}
                                </div>
                            </Card>
                        </Col>)
                    })}
                </Row>
            </Container>
        </>
    );
}
export default MyCardSection;
