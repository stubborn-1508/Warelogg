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
import { BiSearchAlt, BiRightArrow } from "react-icons/bi"
import { GiCctvCamera, GiLockedChest, GiCargoShip, GiGears } from "react-icons/gi"
import { FaTruckMoving, FaMapMarkerAlt, FaBoxes, FaWarehouse } from "react-icons/fa";
import { BsCloudSunFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi"
import { TbSunOff } from "react-icons/tb"
import { IoSnow } from "react-icons/io"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import Icon from '@mdi/react';
import { mdiForklift, mdiHours24, mdiShieldCheck, mdiAirport, mdiStarCheckOutline, mdiAccountHardHat, mdiSnowflakeThermometer, mdiFireExtinguisher, mdiDolly } from '@mdi/js';
import "./FilterSlider.css"
import { IconContext } from "react-icons/lib";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import filterData from "../assets/filter";

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

        // const position = async () => {
        //         // navigator.geolocation.getCurrentPosition(
        //         // 	position => setCurrLoc({
        //         // 		latitude: position.coords.latitude,
        //         // 		longitude: position.coords.longitude
        //         // 	}, newState => console.log(newState)),
        //         // 	err => console.log(err)
        //         // );
        //         if (navigator.geolocation) {
        //                 var location_timeout = setTimeout(() => {
        //                         alert("Timeout!!");
        //                 }, 10000);

        //                 navigator.geolocation.getCurrentPosition(
        //                         function (position) {
        //                                 clearTimeout(location_timeout);

        //                                 var lat = position.coords.latitude;
        //                                 var lng = position.coords.longitude;
        //                                 setCurrLoc({
        //                                         latitude: lat,
        //                                         longitude: lng,
        //                                 });
        //                         },
        //                         function (error) {
        //                                 clearTimeout(location_timeout);
        //                                 alert("Error!!");
        //                         }
        //                 );
        //         } else {
        //                 // Fallback for no geolocation
        //                 alert("Error!!");
        //         }
        // };

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
        const [filterArr, setFilterArr] = useState([]);
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
                                setWarehoueseInfo(res.data.data);
                        })
                        .catch((err) => {
                                console.log(err);
                        });
        };

        useEffect(() => {
                getAds();
                // position();
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
        function MapButton() {
                return <button className="button-77" onClick={() => { setToggle(1); }}>
                        <IconContext.Provider
                                value={{ size: '1.8rem' }}
                        >
                                <div>
                                        <FaMapMarkerAlt />
                                        Map
                                </div>
                        </IconContext.Provider>
                </button>
        }

        function GridButton() {
                return <button className="button-77" onClick={() => { setToggle(0); }}>
                        <IconContext.Provider
                                value={{ size: '1.8rem' }}
                        >
                                <div>
                                        <BsFillGrid3X2GapFill />
                                        Grid
                                </div>
                        </IconContext.Provider>
                </button>
        }

        const responsive = {
                superLargeDesktop: {
                        // the naming can be any, depends on you.
                        breakpoint: { max: 4000, min: 3000 },
                        items: 9
                },
                desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 7
                },
                tablet: {
                        breakpoint: { max: 1024, min: 780 },
                        items: 4
                },
                mobile: {
                        breakpoint: { max: 780, min: 612 },
                        items: 3
                },
                mediumDesktop: {
                        breakpoint: { max: 1450, min: 1250 },
                        items: 6
                },
                smallDesktop: {
                        breakpoint: { max: 1250, min: 1024 },
                        items: 5
                },
                smallMobile: {
                        breakpoint: { max: 612, min: 585 },
                        items: 3
                },
                miniature: {
                        breakpoint: { max: 585, min: 450 },
                        items: 4
                },
                least: {
                        breakpoint: { max: 450, min: 436 },
                        items: 3
                },
                last: {
                        breakpoint: { max: 436, min: 0 },
                        items: 3
                }
        };


        const CustomLeftArrow = ({ onClick }) => (
                <i onClick={() => onClick()} className="custom-left-arrow" />
        );
        const CustomRightArrow = ({ onClick }) => {
                return <i className="custom-right-arrow" onClick={() => onClick()} />;
        };
        // if (locationInput.length > 0)
        // {
        // 	warehouseInfo.filter((warehouse) =>
        // 	{
        // 		console.log(warehouse.name);
        // 		return warehouse.location.match(locationInput);
        // 	});
        // }
        const [rand, setRand] = useState(0);
        const handleCheckChange = (e) => {
                const index = filterArr.indexOf(parseInt(e.target.id));
                if (index > -1) {
                        let tempArr = filterArr;
                        tempArr.splice(index, 1);
                        console.log(tempArr);
                        setFilterArr(tempArr);
                } else {
                        let tempArr = filterArr;
                        tempArr.push(parseInt(e.target.id));
                        console.log(tempArr);
                        setFilterArr(tempArr);
                }
                setRand(rand + 1)
        }
        return (
                <>
                        {/* {console.log(warehouseInfo)} */}

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
                                                <div>
                                                        <div className="search-bar">
                                                                {toggle ? <GridButton /> : <MapButton />}
                                                        </div>
                                                        <div className="Icon-filters p-3 bg-white rounded shadow-sm" style={{ width: "100%", marginLeft:"-1rem" }}>
                                                                <div className="slider">
                                                                        <Carousel responsive={responsive} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />}>
                                                                                {filterData.map((ele, ind) => {
                                                                                        return (<div className="filter-adjuster">
                                                                                                <div className="pretty p-icon p-toggle p-plain icon-style-a" >
                                                                                                        <input type="checkbox" title={ele.name} id={ele.code} onChange={handleCheckChange} />
                                                                                                        <div className="state p-on custom-icon icon-style-b filter-align" >
                                                                                                                <div>
                                                                                                                        {ele.on_icon}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600" }}>{ele.name}</label>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <div className="state p-off custom-icon">
                                                                                                                <div>
                                                                                                                        {ele.icon}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <label className="icon-style-c" >{ele.name}</label>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>);
                                                                                })}
                                                                                {/* <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="CCTV Monitoring"/>
                                        <div className="state p-on custom-icon icon-style-b" >
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <GiCctvCamera/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>CCTV Monitoring</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <GiCctvCamera/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">CCTV Monitoring</label>
                                                </div>
                                        </div>
                                </div>
                               </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Outdoor Storage"/>
                                        <div className="state p-on custom-icon icon-style-b" >
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <FaBoxes/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>Outdoor Storage</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <FaBoxes/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Outdoor Storage</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Indoor Storage"/>
                                        <div className="state p-on custom-icon icon-style-b" >
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <FaWarehouse/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>Indoor Storage</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <FaWarehouse/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Indoor Storage</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Cold Storage"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiSnowflakeThermometer} size={1.3} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{  fontWeight: "bold", color: "#ff6600"}}>Cold Storage</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiSnowflakeThermometer} size={1.3} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" >Cold Storage</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a" >
                                        <input type="checkbox" title="Free Loading-Unloading"/>
                                        <div className="state p-on custom-icon icon-style-b" >
                                                <div>
                                                        <Icon path={mdiDolly} size={1.3} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>Free Loading</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiDolly} size={1.3} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Free Loading</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Fire Safety"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiFireExtinguisher} size={1.3} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>Fire Safety</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiFireExtinguisher} size={1.3} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Fire Safety</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="24-hours availability"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiHours24} size={1.3} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>24-hours</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiHours24} size={1.3} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">24-hours</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Insurance Coverage"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiShieldCheck} size={1.3} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>Insurance</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiShieldCheck} size={1.3} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Insurance</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Near Airport"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiAirport} size={1.3} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>Near Airport</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiAirport} size={1.3} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Near Airport</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Near Seaport"/>
                                        <div className="state p-on custom-icon icon-style-b" >
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <GiCargoShip/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>Near Seaport</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <GiCargoShip/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Near Seaport</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Quality Control"/>
                                        <div className="state  p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiStarCheckOutline} size={1.1} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{ fontWeight: "bold", color: "#ff6600"}}>Quality Control</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiStarCheckOutline} size={1.1} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Quality Control</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="UV Protection"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <TbSunOff/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>UV Protection</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <TbSunOff/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">UV Protection</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Truck drive-in"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <FaTruckMoving/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>Truck Drive-In</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <FaTruckMoving/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Truck Drive-In</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Free Labour"/>
                                        <div className="state  p-on custom-icon icon-style-b">
                                                <div>
                                                        <Icon path={mdiAccountHardHat} size={1.1} color="#ff6600"/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>Free Labour</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <Icon path={mdiAccountHardHat} size={1.1} />
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Free Labour</label>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                <div className="filter-adjuster">
                                        <div className="pretty p-icon p-toggle p-plain icon-style-a">
                                        <input type="checkbox" title="Automated"/>
                                        <div className="state p-on custom-icon icon-style-b">
                                                <div>
                                                        <IconContext.Provider
                                                                value={{color: '#ff6600' }}
                                                        >
                                                                <GiGears/>
                                                        </IconContext.Provider>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c" style={{fontWeight: "bold", color: "#ff6600"}}>Automated</label>
                                                </div>
                                        </div>
                                        <div className="state p-off custom-icon">
                                                <div>
                                                        <GiGears/>
                                                </div>
                                                <div>
                                                        <label className="icon-style-c">Automated</label>
                                                </div>
                                        </div>
                                </div>
                                </div> */}
                                                                        </Carousel>
                                                                </div>



                                                        </div>
                                                </div>
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
                                                        <div className="d-flex flex-row justify-content-around">
                                                                <div className="navBarSearchContainer">
                                                                        <div className="navBarSearch" style={{ marginLeft: "0rem" }}>
                                                                                <form>
                                                                                        <input type="text" name="search" placeholder="Search.." />
                                                                                </form>
                                                                        </div>
                                                                        <button type="button" className="button-17" onClick={handleShow} style={{ fontSize: "1.1rem" }}>
                                                                                <IconContext.Provider
                                                                                        value={{ size: '1.5rem' }}
                                                                                >
                                                                                        <HiOutlineAdjustmentsHorizontal />
                                                                                </IconContext.Provider>
                                                                                <span className="filter-text">&nbsp;&nbsp;Filters</span>
                                                                        </button>
                                                                </div>
                                                        </div>
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
                                                                        <Map warehouseInfo={warehouseInfo}/>
                                                                </div>

                                                        ) : (
                                                                // <></>
                                                                <CardSection warehouseInfo={warehouseInfo} filter={filterArr}></CardSection>
                                                        )}
                                                </Col>
                                        </Col>
                                </Row>
                        </Container>
                </>
        );
};

export default Storage;