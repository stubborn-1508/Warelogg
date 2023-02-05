import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tooltip,
  OverlayTrigger,
  Image,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FcPicture } from "react-icons/fc";
import {
  BsFillLockFill,
  BsFillUnlockFill,
  BsFillCloudSunFill,
  GoCalendar,
} from "react-icons/bs";
import { GiTruck, GiHandTruck, GiCctvCamera } from "react-icons/gi";
import { FcInspection } from "react-icons/fc";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { CartContext } from "../../../Contexts/CartContextHolder";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const convertNumToDate = (num) => {
  let result = "";
  let d = new Date(num);
  result += d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  return result;
};

const convertDateToNum = (date) => {
  let num = new Date(date);
  num = Date.parse(num);
  return num;
};

const UnitSection = ({ subUnit, feature, warehouse_id, name }) => {
  const ctx = useContext(CartContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [selectUnit, setSelectUnit] = useState(false);

  const [status, setStatus] = useState(
    subUnit.toOcc === subUnit.fromOcc
      ? "Available"
      : `Occupied from ${convertNumToDate(
          subUnit.fromOcc
        )} to ${convertNumToDate(subUnit.toOcc)}`
  );

  const facilityObj = {
    cctv: "CCTV Monitering",
    indoor: "Indoor Storage",
    outdoor: "Outdoor Storage",
    climate: "Climate Control",
  };

  const fetchData = async (usertoken) => {
    const res1 = await axios.get("/getAllUsers", {
      headers: { "x-auth-token": usertoken },
    });
    const id = subUnit._id;
    const res2 = await axios({
      url: "/assignCarts",
      data: { user_id: res1.data._id, subUnit_id: id },
      method: "post",
    });
    setSelectUnit(res2.data.message);
    setUserId(res1.data._id);
  };

  useEffect(() => {
    // get user_id
    const usertoken = localStorage.getItem("token");
    if (!usertoken) {
      setSelectUnit(false);
    } else {
      fetchData(usertoken);
    }
  }, []);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChangeEndDate = (date) => {
    const num = convertDateToNum(date);
    if (!startDate || startDate === "") {
      alert("First Choose starting Date");
      setEndDate(null);
      return;
    }
    // if (subUnit.toOcc === subUnit.fromOcc) {
    //   setStatus("Available");
    //   setEndDate(num);
    // } else if (
    //   (startDate <= subUnit.fromOcc && num > subUnit.fromOcc) ||
    //   num <= startDate
    // ) {
    //   setStatus("Choose the correct ending date");
    //   setEndDate(null);
    // } else {
    //   setStatus(
    //     `Occupied from ${convertNumToDate(
    //       subUnit.fromOcc
    //     )} to ${convertNumToDate(subUnit.toOcc)}`
    //   );
    //   setEndDate(num);
    // }
    if (
      (num >= subUnit.fromOcc && num <= subUnit.toOcc) ||
      (startDate <= subUnit.fromOcc && num > subUnit.fromOcc) ||
      num <= startDate
    ) {
      setStatus("Choose the correct starting date");
      setStatus(
        `Occupied from ${convertNumToDate(
          subUnit.fromOcc
        )} to ${convertNumToDate(subUnit.toOcc)}`
      );
      setStartDate(null);
      setEndDate(null);
    } else {
      setStatus("Available");
      setEndDate(num);
    }
  };

  const handleChangeStartDate = (date) => {
    const num = convertDateToNum(date);
    // if (subUnit.toOcc === subUnit.fromOcc) {
    //   setStatus("Available");
    //   setStartDate(num);
    // } else if (num > subUnit.fromOcc && num < subUnit.toOcc) {
    //   setStatus("Choose the correct starting date");
    //   setStartDate(null);
    // } else {
    //   setStatus(
    //     `Occupied from ${convertNumToDate(
    //       subUnit.fromOcc
    //     )} to ${convertNumToDate(subUnit.toOcc)}`
    //   );
    //   setStartDate(num);
    // }
    // // setStartDate(e.target.value);

    if (num >= subUnit.fromOcc && num <= subUnit.toOcc) {
      setStatus("Choose the correct starting date");
      setStatus(
        `Occupied from ${convertNumToDate(
          subUnit.fromOcc
        )} to ${convertNumToDate(subUnit.toOcc)}`
      );
      setStartDate(null);
      setEndDate(null);
    } else {
      setStatus("Available");
      setStartDate(num);
    }
  };

  const handleSelectWarehouse = (e) => {
    if (selectUnit == false) {
      handleAddToCart(e);
      // setSelectUnit(!selectUnit);
    } else {
      navigate("/cart", { state: userId });
    }
  };

  const add = async (userData) => {
    try {
      const res = await axios({
        url: "/addToCart",
        data: userData,
        method: "post",
      });
      console.log(res);
      ctx.changeCartHandler(ctx.cartValue + 1);

      return [res.data, res.status];
    } catch (e) {
      console.log(e);
      return [e.response.data, e.response.status];
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const usertoken = localStorage.getItem("token");
    if (!usertoken) {
      navigate("/login");
      return;
    }
    const CartData = {
      user_id: userId,
      cartContent: {
        warehouse_id: warehouse_id,
        subUnit_id: subUnit._id,
        Name: name,
        Size: subUnit.length + "x" + subUnit.width + "x" + subUnit.height,
        OccFrom: startDate,
        OccTo: endDate,
        Price: subUnit.price,
      },
    };

    const waitRes = await add(CartData);
    if (waitRes[1] === 200) {
      setSelectUnit(true);
    } else {
      setSelectUnit(false);
      alert(waitRes[0]);
    }
  };

  const getStrDate = (num) => {
    let date = new Date(num);
    let strday = date.getDate().toString();
    if (strday.length === 1) {
      strday = "0" + date.getDate().toString();
    }

    let strmonth = date.getMonth().toString();
    if (strmonth.length === 1) {
      strmonth = "0" + (date.getMonth() + 1).toString();
    }

    let strdate = date.getFullYear().toString() + "-" + strmonth + "-" + strday;

    return strdate;
  };

  const disableDatesInterval = [
    // {
    //   start: subDays(new Date(), 5),
    //   end: addDays(new Date(), 5),
    // },
    // {
    //   start: new Date(),
    //   end: addDays(new Date(), 15),
    // },
    {
      start: new Date(getStrDate(subUnit.fromOcc - 1)),
      end: new Date(getStrDate(subUnit.toOcc)),
    },
    // {
    //   start: new Date("2023-01-03"),
    //   end: new Date("2023-01-08"),
    // },
    // {
    //   start: new Date("2023-02-12"),
    //   end: new Date("2023-02-21"),
    // },
  ];

  return (
    <>
      <Card className="my-5 shadow mb-5 bg-white rounded ">
        <Card.Body className="">
          <Row className="text-dark  rounded-3 text-center">
            <Col md={7} className="" style={{ height: "446px" }}>
              <div
                className="rounded overflow-hidden mb-2"
                style={{ height: "calc(100% - 62px)" }}
              >
                <img className="w-100 h-100" src="/images/s6.jpg" alt="" />
              </div>
              <Link to="/allImages" className="d-grid text-decoration-none">
                <Button
                  className="mt-2 btn btn-secondary"
                  variant="secondary"
                  size="md"
                  block
                >
                  <FcPicture /> All Images
                </Button>
              </Link>
            </Col>
            <Col md={5} className="">
              <Row className="">
                <Col lg={12} md={12} className="d-grid gap-1 my-2">
                  <h3 className="text-dark">
                    {subUnit.length}' x {subUnit.width}' x {subUnit.height}'
                  </h3>
                  <ul className="list-unstyled d-flex flex-row justify-content-center">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">Indoor Storage</Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <Button
                          variant="light"
                          {...triggerHandler}
                          className="d-inline-flex align-items-center"
                        >
                          <li ref={ref}>
                            <h3 className="text-dark mx-2 text-center">
                              <GiHandTruck style={{ color: "#ffb905" }} />
                            </h3>
                          </li>
                        </Button>
                      )}
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">CCTV Camera</Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <Button
                          variant="light"
                          {...triggerHandler}
                          className="d-inline-flex align-items-center"
                        >
                          <li ref={ref}>
                            <h3 className="text-dark mx-2">
                              <GiCctvCamera
                                style={{ color: "rgb(255 5 5 / 93%)" }}
                              />
                            </h3>
                          </li>
                        </Button>
                      )}
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          Out Door/ Drive Up
                        </Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <Button
                          variant="light"
                          {...triggerHandler}
                          className="d-inline-flex align-items-center"
                        >
                          <li ref={ref}>
                            <h3 className="text-dark mx-2">
                              <GiTruck
                                style={{ color: "rgb(255 93 5 / 80%)" }}
                              />
                            </h3>
                          </li>
                        </Button>
                      )}
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">Climate Control</Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <Button
                          variant="light"
                          {...triggerHandler}
                          className="d-inline-flex align-items-center"
                        >
                          <li ref={ref}>
                            <h3 className="text-dark mx-2">
                              <BsFillCloudSunFill
                                style={{ color: "#0dcefdb0" }}
                              />
                            </h3>
                          </li>
                        </Button>
                      )}
                    </OverlayTrigger>
                  </ul>
                  {/* <div className='list-unstyled d-flex flex-column justify-content-right'>
                                        {feature?.map((ele) => {
                                            return (<p className='float-left'><FcInspection className='mx-2' />{facilityObj[ele]}</p>);
                                        })}
                                    </div> */}
                  {selectUnit === true ? (
                    <></>
                  ) : (
                    <>
                      <div>
                        <Form.Group className="mb-3 text-center d-flex justify-content-between flex-wrap">
                          <div
                            style={{
                              width: "48%",
                            }}
                          >
                            <Form.Label>Start Booking Date</Form.Label>
                            {/* <Form.Control
                              type="date"
                              autoComplete="on"
                              onChange={handleChangeStartDate}
                            /> */}
                            <div>
                              <DatePicker
                                // wrapperClassName="date-picker"
                                className="form-control"
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                // endDate={endDate}
                                onChange={(date) => handleChangeStartDate(date)}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="dd-mm-yyyy"
                                // filterDate={(date) => disableDates(date)}
                                excludeDateIntervals={disableDatesInterval}
                                showYearDropdown
                                showMonthDropdown
                                scrollableMonthYearDropdown
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              width: "48%",
                            }}
                          >
                            <Form.Label>End Booking Date</Form.Label>
                            {/* <Form.Control
                              type="date"
                              placeholder="dd-mm-yy"
                              autoComplete="on"
                              onChange={handleChangeEndDate}
                            /> */}
                            <div>
                              <DatePicker
                                className="form-control"
                                selected={endDate}
                                selectsEnd
                                // startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="dd-mm-yyyy"
                                minDate={startDate}
                                onChange={(date) => handleChangeEndDate(date)}
                                // filterDate={(date) => disableDates(date)}
                                excludeDateIntervals={disableDatesInterval}
                                showYearDropdown
                                showMonthDropdown
                                scrollableMonthYearDropdown
                                // isClearable
                              />
                            </div>
                          </div>
                        </Form.Group>
                      </div>
                    </>
                  )}
                  <div className="list-unstyled d-flex flex-column justify-content-right">
                    {status}
                  </div>
                  {
                    <>
                      <div className="pt-2">
                        <div className="d-grid gap-1 my-3">
                          <h5 className="mt-4">
                            ₹{subUnit.price}/<span>day</span>
                          </h5>
                          <Button
                            className="text-center shadow"
                            variant={
                              selectUnit === false ? "success" : "warning"
                            }
                            size="md"
                            block
                            onClick={handleSelectWarehouse}
                          >
                            {selectUnit ? (
                              <>
                                <h5 className="text-center">
                                  Go to Cart &nbsp;
                                  {/* <BsFillLockFill /> */}
                                </h5>
                              </>
                            ) : (
                              <>
                                <h5 className="text-white text-center">
                                  Add to Cart &nbsp;
                                  {/* <BsFillUnlockFill /> */}
                                </h5>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  }
                </Col>
              </Row>
            </Col>

            {/* <Col md={3}>
                            {<>
                                    <div className="pt-2">
                                        <div className="d-grid gap-1 my-3">
                                            <h5 className="mt-4">
                                                ₹{subUnit.price}/<span>day</span>
                                            </h5>
                                            <Button
                                                className="text-center shadow"
                                                variant={selectUnit === false ? "success" : "warning"
                                                } size="md" block
                                                onClick={handleSelectWarehouse}
                                            >{selectUnit ? <><h5 className='text-center'>Go to Cart &nbsp;<BsFillLockFill /></h5></> : <><h5 className='text-white text-center'>Add to Cart &nbsp;<BsFillUnlockFill /></h5></>}</Button>
                                        </div>
                                    </div>
                                </>}
                        </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default UnitSection;
