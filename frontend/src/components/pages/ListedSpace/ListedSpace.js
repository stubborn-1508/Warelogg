import React, { useState, useEffect } from 'react'
import
{
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


const ListedSpace = () =>
{
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);

  const id = location.state;

  const [warehouse, setWarehouse] = useState(null);

  const fetchData = async (id) => {
    try{
      console.log(id);
      let res = await axios.post("/getMyWareHouses", {data: id});
      console.log(res.data);
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


  return (
    <>
      <Container>
        <Form>
          <Card className="mt-5 cardX">
            <Card.Header className='shadow p-3 bg-white rounded'>
              <Row>
                <Col md={ 6 } className="text-center d-flex flex-column">
                  <h2>Shree Warehouse</h2>
                  <h6><u> <i><BiCurrentLocation />  </i>Lonavla, Maharashtra, India</u></h6>
                  <p>200 sq ft Area</p>
                  <p>1200 cu ft Volume</p>
                </Col>
                <Col md={ 6 } className="text-center d-flex flex-column">
                  <Button className="my-1" variant="dark">Edit Name</Button>
                  <Button className="my-1" variant="dark">Edit Location</Button>
                  <Button className="my-1" variant="dark">Edit Size</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="cardStorageBody">
              <Row>
                <Col lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 } className="shadow-sm p-3 rounded text-center">
                  <Form.Group controlId="formFile" className="mb-3 imgSquareBig">
                    <Form.Label>
                      Add Image
                      <h2><FcPlus className="plusButton" /></h2>
                    </Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col md={ 6 }>
                  <Row className=''>
                    <Col md={ 6 } className="d-block w-100 imgSquare text-center">
                      <h2> <FcPlus className="plusButton2" /></h2>Add Image
                    </Col>
                    <Col md={ 6 } className="d-block w-100 imgSquare text-center">
                      <h2> <FcPlus className="plusButton2" /></h2>Add Image
                    </Col>
                    <Col md={ 6 } className="d-block w-100 imgSquare text-center">
                      <h2> <FcPlus className="plusButton2" /></h2>Add Image
                    </Col>
                    <Col md={ 6 } className="d-block w-100 imgSquare text-center">
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
                <Col md={ 12 }>
                  <h2 className='text-warning mb-5'>Features Available at this Facility :</h2>
                </Col>
                <Col md={ 4 } className="">
                  <p><FcOk /> No Deposit or Admin Fee</p>
                  <p><FcOk /> Clean - Dry - Secure</p>
                  <p><FcOk /> Free Automatic Payment Plans</p>
                  <p><FcOk /> Move-In Trucks</p>
                  <p><FcOk /> Free Online Account Management</p>
                  <p><FcOk /> Make Your Payment Online!</p>
                  <p><FcOk /> Individually timed lighting in most spaces</p>
                </Col>
                <Col md={ 4 } className="">
                  <p><FcOk /> rive-Up Loading and Unloading</p>
                  <p><FcOk /> Package Signing and Receiving</p>                                <p><FcOk /> Package Signing and Receiving</p>
                  <p><FcOk /> 24-Hour Video Monitoring</p>
                  <p><FcOk /> Motion Sensor Lighting</p>
                  <p><FcOk /> Electronically Controlled Access</p>
                  <p><FcOk /> Fire Protected: Sprinklers and Alarms</p>
                  <p><FcOk /> Convenient Elevator Access</p>
                </Col>
                <Col md={ 4 } className="">
                  <p><FcOk /> Climate Control</p>
                  <p><FcOk /> SafeStor Protection</p>
                  <p><FcOk /> Indoor Storage: Twice the Protection and Security</p>
                  <p><FcOk /> Open 7 Days</p>
                  <p><FcOk /> Controlled Access for Your Protection</p>
                </Col>
                <Col md={ 6 }></Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </>
  )
}

export default ListedSpace

