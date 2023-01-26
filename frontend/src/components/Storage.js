import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Offcanvas,
  Card,
  Badge,
} from "react-bootstrap";

import Map from "./pages/Map/Map";
import CardSection from "./pages/Cards/Card";
import { FcSearch } from "react-icons/fc";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import Context from "../Contexts/context";
import FilterModal from "./pages/Storage/FilterModal";
import "./filters.css";

const Storage = (props) => {
  const ctx = useContext(Context);
  const contextfacility = ctx.data.facalities;
  const [currLoc, setCurrLoc] = useState({
    latitude: null,
    longitude: null,
  });
  const defaultData = {
    cctv: false,
    indoor: false,
    outdoor: false,
    climate: false,
    sortBy: "",
    bookType: "",
  };

  const [filterItems, setFilterItems] = useState({
    cctv: false,
    indoor: false,
    outdoor: false,
    climate: false,
    sortBy: false,
    bookType: false,
  });

  const position = async () => {
    // navigator.geolocation.getCurrentPosition(
    // 	position => setCurrLoc({
    // 		latitude: position.coords.latitude,
    // 		longitude: position.coords.longitude
    // 	}, newState => console.log(newState)),
    // 	err => console.log(err)
    // );
    if (navigator.geolocation) {
      var location_timeout = setTimeout(() => {
        alert("Timeout!!");
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        function (position) {
          clearTimeout(location_timeout);

          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          setCurrLoc({
            latitude: lat,
            longitude: lng,
          });
        },
        function (error) {
          clearTimeout(location_timeout);
          alert("Error!!");
        }
      );
    } else {
      // Fallback for no geolocation
      alert("Error!!");
    }
  };

  if (contextfacility.length > 0) {
    contextfacility.forEach((ele1, ind1) => {
      defaultData[ele1] = !defaultData[ele1];
    });
  }
  const facVal = ["cctv", "indoor", "outdoor", "climate"];
  const facility = [
    "CCTV Monitoring",
    "Indoor Storage",
    "Outdoor/Drive Up",
    "Climate Control",
  ];
  // Got all the data

  const filterNames = {
    cctv: facility[0],
    indoor: facility[1],
    outdoor: facility[2],
    climate: facility[3],
  };

  // console.log(ctx.data);
  // console.log("===>" + ctx.data);
  // States for filtering actions
  const [data, setData] = useState(defaultData);

  // console.log(data);

  const onCheckChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked });
    setFilterItems({
      ...filterItems,
      [event.target.name]: event.target.checked,
    });
    // console.log("-"+data);
  };

  const onRadioSelect = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setFilterItems({ ...filterItems, [event.target.name]: true });
    // console.log("->" + data);
  };

  const removerFilter = (key) => {
    setData({ ...data, [key]: false });
    setFilterItems({ ...filterItems, [key]: false });
  };

  const [toggle, setToggle] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSave = () => {
    setData(data);
    handleClose();
  };

  const onClear = () => {
    const defaultData1 = {
      cctv: false,
      indoor: false,
      outdoor: false,
      climate: false,
      sortBy: "",
      bookType: "",
    };
    setFilterItems({
      cctv: false,
      indoor: false,
      outdoor: false,
      climate: false,
      sortBy: false,
      bookType: false,
    });
    setData(defaultData1);
  };

  // filters it Contains all Current applied Filters.
  // useEffect(() =>
  // {
  // 	console.log("Filters Updated");
  // }, [ filters ]);

  const [warehouseInfo, setWarehoueseInfo] = useState([]);

  const getAds = async () => {
    axios
      .get("/getAllWarehouse")
      .then((res) => {
        console.log(res.data);
        setWarehoueseInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAds();
    position();
  }, []);

  // search bar begins
  let loc;
  ctx.data.location == null ? (loc = "") : (loc = ctx.data.location);
  const [locationInput, setLocationInput] = useState(loc);
  // search bar ends

  const handleChange = (e) => {
    e.preventDefault();
    setLocationInput(e.target.value);
  };

  // if (locationInput.length > 0)
  // {
  // 	warehouseInfo.filter((warehouse) =>
  // 	{
  // 		console.log(warehouse.name);
  // 		return warehouse.location.match(locationInput);
  // 	});
  // }

  return (
    <>
      {console.log("called 1st")}

      <FilterModal
        data={data}
        onCheckChange={onCheckChange}
        onRadioSelect={onRadioSelect}
        onClear={onClear}
        onSave={onSave}
        show={show}
        onHide={handleClose}
      />

      <Container className="my-5" fluid>
        <Row>
          <Col md={12} sm={12}>
            <Row className="">
              <Col lg={2} md={2} sm={2} xs={12} className="">
                <Button
                  variant="primary"
                  className="my-2 text-light btn-block py-2"
                  onClick={handleShow}
                >
                  <VscSettings className="text-white mx-1" />
                  Filters
                  <Badge bg="light" pill className="mx-1 text-dark">
                    {
                      Object.values(filterItems).filter((f) => f === true)
                        .length
                    }
                  </Badge>
                </Button>
              </Col>
              <Col lg={2} md={2} sm={2} xs={12}>
                <Button
                  className="my-2 text-light btn-block"
                  variant="success"
                  onClick={() => {
                    setToggle(1);
                  }}
                >
                  <FaMap className="mx-1" />
                  Map
                </Button>
              </Col>
              <Col lg={2} md={2} sm={2} xs={12}>
                <Button
                  className="my-2 btn-block"
                  variant="warning"
                  onClick={() => {
                    setToggle(0);
                  }}
                >
                  <BsFillGrid3X2GapFill className="mx-1" />
                  GridView
                </Button>
              </Col>
              <Col md={1} className="my-2 btn-block"></Col>
              <Col md={5}>
                <Form className="d-flex my-2">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 rounded-5"
                    aria-label="Search"
                    onChange={handleChange}
                    value={locationInput}
                  />
                  <Button variant="secondary" className="text-white">
                    <FcSearch />
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col lg={8} md={8} sm={12} xs={12} className="">
                <Row>
                  <Col md={12} className="appliedFilters my-3">
                    {Object.entries(filterItems).map((filter, ind) => {
                      if (ind < 4 && filter[1] == true) {
                        return (
                          <div
                            key={ind}
                            className="alert alert-dark alert-dismissible fade show mx-2 py-2 col-xs-12"
                          >
                            {filterNames[filter[0]]}
                            <button
                              type="button"
                              className="close py-2"
                              aria-label="Close"
                            >
                              <span
                                onClick={removerFilter.bind(null, filter[0])}
                                aria-hidden="true"
                              >
                                &times;
                              </span>
                            </button>
                          </div>
                        );
                      } else {
                        if (ind >= 4 && filter[1] == true) {
                          return (
                            <div
                              key={ind}
                              className="alert alert-dark alert-dismissible fade show mx-2 py-2 col-xs-12"
                            >
                              {data[filter[0]]}
                              <button
                                type="button"
                                className="close py-2"
                                aria-label="Close"
                              >
                                <span
                                  onClick={removerFilter.bind(null, filter[0])}
                                  aria-hidden="true"
                                >
                                  &times;
                                </span>
                              </button>
                            </div>
                          );
                        } else {
                          return <></>;
                        }
                      }
                    })}
                  </Col>
                </Row>
              </Col>
              <Col lg={2} md={2}></Col>
            </Row>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Col md={12} className="my-5">
              {toggle ? (
                <div
                  style={{
                    width: "90%",
                    height: "700px",
                    position: "relative",
                    margin: "auto",
                  }}
                >
                  <Map current_location={currLoc} />
                </div>
              ) : (
                <CardSection warehouseInfo={warehouseInfo}></CardSection>
              )}
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Storage;
