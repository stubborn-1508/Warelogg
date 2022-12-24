import React, {useState, useContext, useEffect} from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Context } from "../../../Contexts/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BecomePartner = () => {
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("token");
  const [wareHouse, setWareHouse] = useState({
    user_id: '',
    name: '',
    email: '',
    businessName: '',
    contactNumberMobile: '',
    businessAddress: '',
    city: '',
    state: '',
    zip: '',
    length: '',
    width: '',
    height: ''
  });

  const fetchData = async (usertoken) => {
    try {
        const res = await axios.get("/getAllUsers", {
            headers: { "x-auth-token": usertoken },
        });
        setWareHouse({...wareHouse, user_id: res.data.user_id});
    } catch (err) {
        console.log("Error in fetching data" + err);
    }
  };


  useEffect(() => {
    const usertoken = localStorage.getItem("token");
    if (!usertoken) {
      navigate("/login");
    }else{
      fetchData(usertoken);
    }
  }, []);

  const styles = {
    backgroundColor: "yellow",
    color: "purple"
  }
  const bgCo = {
    backgroundColor: "",
  }

  const [featureArr, setFeatureArr] = useState({
    'cctv': false,
    'indoor': false,
    'outdoor': false,
    'climate': false
  });

  const handleChange = (e) => {
    setWareHouse({...wareHouse, [e.target.id]: e.target.value});
  }

  const handleChangeCheck = (e) => {
    setFeatureArr(featureArr => ({...featureArr,[e.target.id]: !(featureArr[e.target.id])}));
  }

  const wareHouseReg = async (userData) => {
    try{
      const res = await axios({ url: "/warehouseRegister", data: userData, method: "post" });
      return [res.data, res.status];
    }catch (e){
      console.log(e);
      return [e.response.data, e.response.status];
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var finalArr = []
    for (const [key,value] of Object.entries(featureArr)){
      if(value){
        finalArr.push(key);
      }
    }
    const wareHouseDetails = {
      user_id: wareHouse.user_id,
      name: wareHouse.name,
      email: wareHouse.email,
      businessName: wareHouse.businessName,
      contactNumberMobile: wareHouse.contactNumberMobile,
      businessAddress: wareHouse.businessAddress,
      city: wareHouse.city,
      state: wareHouse.state,
      zip: wareHouse.zip,
      length: wareHouse.length,
      width: wareHouse.width,
      height: wareHouse.height,
      features: finalArr
    }

    const waitWareReg = await wareHouseReg(wareHouseDetails);
    console.log(waitWareReg);
    if(waitWareReg[1] == 200){
      alert(waitWareReg[0]);
      navigate("/allListedSpace");
    }else{
      alert(waitWareReg[0]);
    }

    setWareHouse({
      user_id: '',
      name: '',
      email: '',
      businessName: '',
      contactNumberMobile: '',
      businessAddress: '',
      city: '',
      state: '',
      zip: '',
      length: '',
      width: '',
      height: ''
    });
  }


  return (
    <>
      <Container className="my-5" style={bgCo} fluid>
        <Row>
          <Form className="text-center my-5">
            <Row>
              <Col md={6}>
                <h3>
                  Become a&nbsp;
                  <b>
                    <u><mark style={styles}>Let's Go Pal Partner</mark></u>
                  </b>
                  &nbsp; and make your business more profitable.
                </h3>
                <img
                  className="d-block w-100 rounded my-5"
                  src="images/partner.jpg"
                  alt="First slide"
                />
              </Col>
              <Col md={6} className="text-left">
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control id="name" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup id="contactNumberMobile" className="mb-3">
                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                    <Form.Control
                      id="contactNumberMobile"
                      onChange={handleChange}
                      placeholder="Mobile"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control id="email" type="email" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control id="businessName" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-3">Business Address</Form.Label>
                  <Form.Control id="businessAddress" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control id="city" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control id="state" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Zip/Postal</Form.Label>
                  <Form.Control id="zip" type="zip" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Length (in ft)</Form.Label>
                  <Form.Control id="length" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Width (in ft)</Form.Label>
                  <Form.Control id="width" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Height (in ft)</Form.Label>
                  <Form.Control id="height" type="text" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Features</Form.Label>
                  <Form.Check onChange={handleChangeCheck} id='cctv' type="checkbox" label="CCTV Survillance"/>
                  <Form.Check onChange={handleChangeCheck} id='indoor' type="checkbox" label="Indoor Storage"/>
                  <Form.Check onChange={handleChangeCheck} id='outdoor' type="checkbox" label="Outdoor Storage"/>
                  <Form.Check onChange={handleChangeCheck} id='climate' type="checkbox" label="Climate Control"/>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <div>
                    <Button onClick={handleSubmit} variant="blue" className="btn-block my-3" size="lg">
                      Become Partner
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default BecomePartner;
