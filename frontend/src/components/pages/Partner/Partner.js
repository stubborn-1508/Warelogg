import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import {
  GiTruck,
  GiHandTruck,
  GiCctvCamera,
  GiElevator,
  GiMovementSensor,
  GiCube,
} from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { Ri24HoursFill, RiVideoDownloadLine } from "react-icons/ri";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FaFireExtinguisher, FaTruckLoading, FaUpload } from "react-icons/fa";
import { CiVault } from "react-icons/ci";
import { BiRectangle } from "react-icons/bi";
import ImageUploading from "react-images-uploading";
import { Context } from "../../../Contexts/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BecomePartner = () => {
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("token");

  const [wareHouse, setWareHouse] = useState({
    user_id: "",
    name: "",
    email: "",
    businessName: "",
    contactNumberMobile: "",
    businessAddress: "",
    city: "",
    state: "",
    zip: "",
    features: [],
  });

  const [length, setLength] = useState(new Array(100000).fill(""));
  const [width, setWidth] = useState(new Array(100000).fill(""));
  const [height, setHeight] = useState(new Array(100000).fill(""));
  const [area, setArea] = useState(new Array(100000).fill("0"));
  const [volume, setVolume] = useState(new Array(100000).fill("0"));
  const [totalPrice,setTotalPrice]=useState();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [disabled, setDisabled] = useState(true);

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const [files, setFiles]= useState([]);
  const hiddenFileInput = useRef(null);

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0].name;
    let flag=false;
    for(let i=0;i<files.length;i++){
      if(files[i]===''){
      files[i]=fileUploaded;
      flag=true;
      break;
      }
    }
    if(flag===false)
    {
    files.push(fileUploaded);
    }
    setFiles([...files]);
    console.log(files);
  };

  const areaChangeHandler=(event)=>{
    let temp=event.target.value;
    setTotalPrice(25*temp);
  };

  const [unit, setUnit] = useState({
    counter: 1,
    arrTemp: new Array(1).fill(""),
  });

  const checkDisablehandler = (e) => {
    setDisabled(!disabled);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const videoRemoveHandler=(index)=>{
    files.splice(index,1);
    console.log(files);
    console.log(files.length);
    setFiles([...files]);
  }
  const videoUpdateHandler=(index)=>{
    files[index]="";
    handleFileClick();
  }

  const add = (e) => {
    e.preventDefault();
    const current_unit = unit;
    const cnt = unit.counter + 1;
    setUnit({
      counter: cnt,
      arrTemp: new Array(cnt).fill(""),
    });
  };

  const remove = (e) => {
    e.preventDefault();
    const current_unit = unit;
    const cnt = unit.counter - 1;
    if (cnt < 0) {
      setUnit({
        counter: 0,
        arrTemp: new Array(0).fill(""),
      });
    } else {
      setUnit({
        counter: cnt,
        arrTemp: new Array(cnt).fill(""),
      });
    }
  };

  const clear = (e) => {
    e.preventDefault();
    const ind = parseInt(e.target.id.split("$")[0]);
    console.log(ind);
    let templength = length;
    let tempwidth = width;
    let tempheight = height;
    let temparea = area;
    let tempvol = volume;
    templength[ind] = "";
    tempwidth[ind] = "";
    tempheight[ind] = "";
    temparea[ind] = "0";
    tempvol[ind] = "0";
    setLength([...templength]);
    setWidth([...tempwidth]);
    setHeight([...tempheight]);
    setArea([...area]);
    setVolume([...volume]);
  };

  const fetchData = async (usertoken) => {
    try {
      const res = await axios.get("/getAllUsers", {
        headers: { "x-auth-token": usertoken },
      });
      setWareHouse({ ...wareHouse, user_id: res.data.user_id });
    } catch (err) {
      console.log("Error in fetching data" + err);
    }
  };

  useEffect(() => {
    const usertoken = localStorage.getItem("token");
    if (!usertoken) {
      navigate("/login");
    } else {
      fetchData(usertoken);
    }
    setShow(true);
  }, []);

  const styles = {
    backgroundColor: "yellow",
    color: "purple",
  };
  const bgCo = {
    backgroundColor: "",
    color: "black",
  };

  const [featureArr, setFeatureArr] = useState({
    cctv: false,
    indoor: false,
    outdoor: false,
    climate: false,
  });

  const handleChange = (e) => {
    setWareHouse({ ...wareHouse, [e.target.id]: e.target.value });
  };

  const handleChangeLength = (e) => {
    const ind = parseInt(e.target.id.split("$")[0]);
    let iniArr = length;
    let iniArea = area;
    let iniVol = volume;
    iniArr[ind] = e.target.value;
    iniArea[ind] = e.target.value * width[ind];
    iniVol[ind] = e.target.value * width[ind] * height[ind];
    setArea([...iniArea]);
    setLength([...iniArr]);
    console.log(area[ind]);
    setVolume([...iniVol]);
  };

  const handleChangeWidth = (e) => {
    const ind = parseInt(e.target.id.split("$")[0]);
    let iniArr = width;
    let iniArea = area;
    let iniVol = volume;
    iniArr[ind] = e.target.value;
    iniArea[ind] = e.target.value * length[ind];
    iniVol[ind] = e.target.value * length[ind] * height[ind];
    setWidth([...iniArr]);
    setArea([...iniArea]);
    console.log(width);
    console.log(area);
    setVolume([...iniVol]);
  };

  const handleChangeHeight = (e) => {
    const ind = parseInt(e.target.id.split("$")[0]);
    let iniArr = height;
    let iniVol = volume;
    iniVol[ind] = e.target.value * length[ind] * width[ind];
    iniArr[ind] = e.target.value;
    setVolume([...iniVol]);
    setHeight([...iniArr]);
  };

  const handleChangeCheck = (e) => {
    setFeatureArr((featureArr) => ({
      ...featureArr,
      [e.target.id]: !featureArr[e.target.id],
    }));
  };

  const wareHouseReg = async (userData) => {
    try {
      const res = await axios({
        url: "/warehouseRegister",
        data: userData,
        method: "post",
      });
      return [res.data, res.status];
    } catch (e) {
      console.log(e);
      return [e.response.data, e.response.status];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalArr = [];
    for (const [key, value] of Object.entries(featureArr)) {
      if (value) {
        finalArr.push(key);
      }
    }

    let finalArr2 = [];

    for (let i = 0; i < unit.counter; i++) {
      let subunit = {};
      subunit.length = length[i];
      subunit.width = width[i];
      subunit.height = height[i];
      finalArr2.push(subunit);
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
      subUnits: finalArr2,
      features: finalArr,
    };

    // console.log(wareHouseDetails);
    const waitWareReg = await wareHouseReg(wareHouseDetails);
    console.log(waitWareReg);
    if (waitWareReg[1] == 200) {
      alert(waitWareReg[0]);
      navigate("/allListedSpace");
    } else {
      alert(waitWareReg[0]);
    }
    setWareHouse({
      user_id: "",
      name: "",
      email: "",
      businessName: "",
      contactNumberMobile: "",
      businessAddress: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="mx-auto">
            Woohoo! you are three steps away to become warelogg's partner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-between">
            <Col xs={3}>
              <p>
                <h4>Step 1:</h4>Fill out the form details.Check out the
                additional features you would like.
              </p>
              <div>
                <img src="images/fill_form.gif" width="100%"></img>
              </div>
            </Col>
            <Col xs={1}>
              <div className="d-flex h-100 align-items-center">
                <img src="images/right_arrow.png" width={50} height={50}></img>
              </div>
            </Col>
            <Col xs={3}>
              <p>
                <h4>Step 2:</h4>Get your details verified.
                <b>
                  (Our personnel will contact you shortly after filling the
                  form.)
                </b>
              </p>
              <div>
                <img src="images/verified.gif" width="100%"></img>
              </div>
            </Col>
            <Col xs={1}>
              <div className="d-flex h-100 align-items-center">
                <img src="images/right_arrow.png" width={50} height={50}></img>
              </div>
            </Col>
            <Col xs={3}>
              <p>
                <h4>Step3:</h4>Congratulations, you are all set.
                <b>Warelogg welcomes you as a partner.</b>
              </p>
              <div>
                <img src="images/handshake.gif" width="100%"></img>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container className="my-5" style={bgCo} fluid>
        <Row>
          <img
            className="w-100 rounded position-absolute"
            src="images/partner.jpg"
            alt="First slide"
            style={{
              zIndex: "-7",
              opacity: "0.1",
              top: "5rem",
              height: "100rem",
              objectFit: "fill",
            }}
          />
          <Form className="text-center mt-5 d-flex">
            <Row className="justify-content-center">
              <h3 className="mb-5">
                Become a&nbsp;
                <b>
                  <u>
                    <mark style={styles}>Warelogg Partner</mark>
                  </u>
                </b>
                &nbsp; and make your business more profitable.
              </h3>
              <Col sm={10} md={8} className="text-left">
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    onChange={handleChange}
                    required
                  ></Form.Control>
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
                  <Form.Control
                    id="email"
                    type="email"
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    id="businessName"
                    type="text"
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-3">Business Address</Form.Label>
                  <Form.Control
                    id="businessAddress"
                    type="text"
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    id="city"
                    type="text"
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    id="state"
                    type="text"
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Zip/Postal</Form.Label>
                  <Form.Control
                    id="zip"
                    type="zip"
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <div
                  style={{
                    border: "1px solid black",
                    borderRadius:"0.25rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {unit.arrTemp.map((ele, ind) => {
                    return (
                      <>
                        <div
                          key={ind}
                          style={{
                            border: "2px solid black",
                            margin: "5px",
                            padding: "10px",
                            borderRadius: "20px",
                            width: "95%",
                          }}
                        >
                          {ind === 0 ? (
                            <h4 className="text-center">
                              Dimensions of main unit
                            </h4>
                          ) : (
                            <h4 style={{ textAlign: "center" }}>
                              Dimensions of sub-unit {ind}
                            </h4>
                          )}

                          <Form.Group className="mb-3">
                            <Form.Label>Length (in ft)</Form.Label>
                            <Form.Control
                              id={ind + "$l"}
                              type="text"
                              value={length[ind]}
                              onChange={handleChangeLength}
                              required
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Width (in ft)</Form.Label>
                            <Form.Control
                              id={ind + "$w"}
                              type="text"
                              value={width[ind]}
                              onChange={handleChangeWidth}
                              required
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Height (in ft)</Form.Label>
                            <Form.Control
                              id={ind + "$h"}
                              type="text"
                              value={height[ind]}
                              onChange={handleChangeHeight}
                              required
                            ></Form.Control>
                          </Form.Group>
                          <div className="d-flex justify-content-around">
                            <div>
                              <BiRectangle style={{ color: "red" }} />
                              &nbsp; Area:{area[ind]} sq. ft.
                            </div>
                            <div>
                              <GiCube style={{ color: "#70c1db" }} />
                              &nbsp; Volume: {volume[ind]} cubic ft
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <button
                            style={{
                              width: "80%",
                              height: "40px",
                              margin: "10px",
                              padding: "2px",
                              borderRadius: "10px",
                            }}
                            onClick={add}
                          >
                            Add
                          </button>
                          {ind === 0 ? (
                            <></>
                          ) : (
                            <button
                              style={{
                                width: "50%",
                                height: "40px",
                                margin: "10px",
                                padding: "2px",
                                borderRadius: "10px",
                              }}
                              onClick={remove}
                            >
                              Remove
                            </button>
                          )}
                          <button
                            id={ind + "$remove"}
                            style={{
                              width: "80%",
                              height: "40px",
                              margin: "10px",
                              padding: "2px",
                              borderRadius: "10px",
                            }}
                            onClick={clear}
                          >
                            Clear
                          </button>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="mt-2 p-2 rounded-2" style={{border:"1px solid black"}}>
                <h5 className="text-center mt-2 mb-2">Rates:</h5>
                <Form.Group as={Row} className="mb-3 p-1" controlId="Price">
                  <Form.Label column sm={3} >Price(per sq. ft)</Form.Label>
                  <Col sm={9}>
                  <InputGroup>
                  <InputGroup.Text>₹</InputGroup.Text>
                  <Form.Control
                  plaintext
                  readOnly
                  defaultValue="25"
                  style={{padding:"0.5rem"}}
                  />
                  </InputGroup>
                  </Col>
                  </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="Area">
                  <Form.Label column sm={3} >Area(in sq. ft)</Form.Label>
                  <Col sm={9}>
                  <InputGroup>
                  <InputGroup.Text>ft²</InputGroup.Text>
                  <Form.Control
                  type="text"
                  onChange={areaChangeHandler}
                  />
                  </InputGroup>
                  </Col>
                  </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="Total_price">
                  <Form.Label column sm={3} >Total Price</Form.Label>
                  <Col sm={9}>
                  <InputGroup>
                  <InputGroup.Text>₹</InputGroup.Text>
                  <Form.Control
                  type="text"
                  value={totalPrice}
                  />
                  </InputGroup>
                  </Col>
                  </Form.Group>
                </div>
                <div className="mt-2 p-2 rounded-2" style={{ border: "1px solid black" }}>
                  <h5 className="text-center mt-2 mb-2">Features:</h5>
                  <Form.Group className="d-flex flex-wrap">
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="fire"
                          class="form-check-input"
                        />
                        <label title="" for="fire" class="form-check-label">
                          Fire Protected &nbsp;
                          <FaFireExtinguisher
                            style={{
                              color: "red",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="climate"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="climate" class="form-check-label">
                          Climate Control &nbsp;
                          <BsFillCloudSunFill
                            style={{
                              color: "#0dcefdb0",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="elevator"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="elevator" class="form-check-label">
                          Elevator Access &nbsp;
                          <GiElevator
                            style={{
                              color: "grey",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="availaibility"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label
                          title=""
                          for="availaibility"
                          class="form-check-label"
                        >
                          Open 7 Days &nbsp;
                          <Ri24HoursFill
                            style={{
                              color: "black",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="indoor"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="indoor" class="form-check-label">
                          Indoor Storage &nbsp;
                          <GiHandTruck
                            style={{
                              color: "#ffb905",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="outdoor"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="outdoor" class="form-check-label">
                          Outdoor Storage &nbsp;
                          <GiTruck
                            style={{
                              color: "rgb(255 93 5 / 80%)",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="cctv"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="cctv" class="form-check-label">
                          CCTV Surveillance &nbsp;
                          <GiCctvCamera
                            style={{
                              color: "rgb(255 5 5 / 93%)",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="secure"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="secure" class="form-check-label">
                          Clean-Dry-Secure &nbsp;
                          <GrSecure
                            style={{
                              color: "#ffb905",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="protection"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label
                          title=""
                          for="protection"
                          class="form-check-label"
                        >
                          SafeStore Protection &nbsp;
                          <CiVault
                            style={{
                              color: "darkgreen",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="motion"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="motion" class="form-check-label">
                          Motion Sensor Lighting &nbsp;
                          <GiMovementSensor
                            style={{
                              color: "#e82e2e",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="monitor"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="monitor" class="form-check-label">
                          Live video Monitoring &nbsp;
                          <RiVideoDownloadLine
                            style={{
                              color: "rgb(255 5 5 / 93%)",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-25 d-flex flex-wrap p-1">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="driveup"
                          class="form-check-input"
                          onChange={handleChangeCheck}
                        />
                        <label title="" for="driveup" class="form-check-label">
                          Drive-Up facility &nbsp;
                          <FaTruckLoading
                            style={{
                              color: "rgb(255 93 5 / 80%)",
                              height: "1.25rem",
                              width: "1.25rem",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <Form.Check
                      className="w-100 mx-1"
                      id="newFeature"
                      type="checkbox"
                      onChange={checkDisablehandler}
                      label="Other features:"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter the feature"
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
                <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper mt-2">
            <button className="p-2 w-100 mx-auto rounded-2 fw-bold"
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload images here(For verification)&nbsp;
              <FaUpload style={{color:"#FF6600"}}/>
            </button>
            <div className="d-flex">
            {imageList.map((image, index) => (
              <div key={index} className="image-item mx-2 text-center">
                <img src={image['data_url']} alt="" height="100" />
                <div className="image-item__btn-wrapper mt-1">
                  <button className="p-1 mr-1 rounded-2" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="p-1 ml-1 rounded-2" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </ImageUploading>
                <div className="mt-2">
                  <button
                    className="w-100 p-2 mx-auto rounded-2 fw-bold"
                    onClick={handleFileClick}
                  >
                    Upload videos here(For verification)&nbsp;
                    <FaUpload style={{ color: "#FF6600" }} />
                  </button>
                  <input
                    type="file"
                    accept="video/*"
                    ref={hiddenFileInput}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <div className="d-flex">
                    {files.map((file, index) => (
                      <div key={index} className="text-center" style={{width:"200px"}}>
                        <img className="d-block mx-auto" src="images/video_icon.png" width={100}/>
                        {file}
                        <div className="image-item__btn-wrapper mt-1">
                  <button className="p-1 mr-1 rounded-2" onClick={() => videoUpdateHandler(index)}>Update</button>
                  <button className="p-1 ml-1 rounded-2" onClick={() => videoRemoveHandler(index)}>Remove</button>
                </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <div>
                    <Button
                      onClick={handleSubmit}
                      variant="blue"
                      className="my-3"
                      size="lg"
                    >
                      Submit
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
