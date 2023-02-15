import React, { useState, useEffect } from 'react'
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
import { FcOk, FcPlus } from "react-icons/fc";
import { FaTags } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./listedspace.css";
import axios from 'axios';
import UnitSection from "./UnitSection.js";
import filterData from '../../../assets/filter';


const ListedSpace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);

  const id = location.state;

  const [warehouse, setWarehouse] = useState(null);
  const [subunit, setSubunit] = useState(null);

  const fetchData = async (id) => {
    try {
      console.log(id);
      let res = await axios.post("/getWarehouseWithSubunit", { data: id });
      console.log(res.data);
      setWarehouse(res.data.warehouse);
      setSubunit(res.data.subunits)
    } catch (err) {
      console.log("Error in fetching data" + err);
    }
  }


  useEffect(() => {
    const usertoken = localStorage.getItem("token");
    if (!usertoken) {
      navigate("/login");
    } else {
      fetchData(id);
    }
  }, []);

  if (!warehouse) {
    return (
      <>
        <h2>Please Wait.....</h2>
      </>
    );
  } else {
    console.log(warehouse);
    return (
      <>
        <Container>
          <Form>
            <Card className="mt-5 cardX">
              <Card.Header className='shadow p-3 bg-white rounded'>
                <Row>
                  <Col md={6} className="text-center d-flex flex-column">
                    <h2>{warehouse.name}</h2>
                    <h6><u> <i><BiCurrentLocation />  </i>{warehouse.
                      businessAddress
                    }, {warehouse.city}, {warehouse.state}</u></h6>
                  </Col>
                  <Col md={6} className="text-center d-flex flex-column">
                    <Button className="my-1" variant="dark">Edit Name</Button>
                    <Button className="my-1" variant="dark">Edit Location</Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="cardStorageBody">
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12} className="shadow-sm p-3 rounded text-center">
                    <Form.Group controlId="formFile" className="mb-3 imgSquareBig">
                      <Form.Label>
                        Add Image
                        <h2><FcPlus className="plusButton" /></h2>
                      </Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Row className=''>
                      <Col md={6} className="d-block w-100 imgSquare text-center">
                        <h2> <FcPlus className="plusButton2" /></h2>Add Image
                      </Col>
                      <Col md={6} className="d-block w-100 imgSquare text-center">
                        <h2> <FcPlus className="plusButton2" /></h2>Add Image
                      </Col>
                      <Col md={6} className="d-block w-100 imgSquare text-center">
                        <h2> <FcPlus className="plusButton2" /></h2>Add Image
                      </Col>
                      <Col md={6} className="d-block w-100 imgSquare text-center">
                        <h2> <FcPlus className="plusButton2" /></h2>Add Image
                      </Col>
                    </Row>
                  </Col>
                  <Link to="/allImages">
                    <Button className='float-right mt-2' variant='secondary' size="small"> <FcPlus />&nbsp; Add more Images</Button>
                  </Link>
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
                    {warehouse?.features?.map((el, ind) => {
                      if (el % 3 === 0) {
                        return (
                          <p><FcOk /> {filterData[el].name}</p>
                        )
                      }
                    })}
                  </Col>
                  <Col md={4} className="">
                    {warehouse?.features?.map((el, ind) => {
                      if (el % 3 === 1) {
                        return (
                          <p><FcOk /> {filterData[el].name}</p>
                        )
                      }
                    })}
                  </Col>
                  <Col md={4} className="">
                    {warehouse?.features?.map((el, ind) => {
                      if (el % 3 === 2) {
                        return (
                          <p><FcOk /> {filterData[el].name}</p>
                        )
                      }
                    })}
                  </Col>
                  <Col md={6}></Col>
                </Row>
              </Card.Body>
            </Card>
            {subunit?.map((ele, ind) => {
              let section_props = {
                warehouseID: warehouse._id,
                id: ele._id,
                length: parseInt(ele.length),
                width: parseInt(ele.width),
                height: parseInt(ele.height),
                price: parseInt(ele.price),
                fromOcc: parseInt(ele.occFrom),
                toOcc: parseInt(ele.occTo),
                status: ele.status
              }
              return (<UnitSection key={ind} id={ind} sectionDetails={section_props} facilities={warehouse.features} />);
            })}

          </Form>
        </Container>
      </>
    );
  }
}

export default ListedSpace

