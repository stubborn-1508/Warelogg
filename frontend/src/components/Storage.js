import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import
{
	Container,
	Row,
	Col,
	Button,
	Form,
	Offcanvas,
	Card,
	Badge,
} from "react-bootstrap";

import MapX from "./pages/Map/Map";
import CardSection from "./pages/Cards/Card";
import { FcSearch } from "react-icons/fc";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import Context from "../Contexts/context";
import "./filters.css";

const Storage = (props) =>
{
	const ctx = useContext(Context);
	const contextfacility = ctx.data.facalities;
	
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
	
	console.log(contextfacility);
	if(contextfacility.length > 0){
		contextfacility.forEach((ele1, ind1) => {
			defaultData[ele1] = !defaultData[ele1];
		});
	}
	const facVal = ['cctv', 'indoor', 'outdoor', 'climate'];
	const facility = [ "CCTV Monitoring", "Indoor Storage", "Outdoor/Drive Up","Climate Control"];
	// Got all the data

	const filterNames = {
		cctv: facility[0],
		indoor: facility[1],
		outdoor: facility[2],
		climate: facility[3],
	}


	// console.log(ctx.data);
	// console.log("===>" + ctx.data);
	// States for filtering actions
	const [ data, setData ] = useState(defaultData);

	// console.log(data);

	const onCheckChange = (event) =>
	{
		setData({ ...data, [ event.target.name ]: event.target.checked });
		setFilterItems({ ...filterItems, [ event.target.name ]: event.target.checked });
		// console.log("-"+data);
	}

	const onRadioSelect = (event) =>
	{
		setData({ ...data, [ event.target.name ]: event.target.value });
		setFilterItems({ ...filterItems, [ event.target.name ]: true });
		// console.log("->" + data);
	}

	const removerFilter = (key) =>
	{
		setData({ ...data, [ key ]: false });
		setFilterItems({ ...filterItems, [ key ]: false });
	}

	const [ toggle, setToggle ] = useState(0);
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onSave = () =>
	{
		setData(data);
		handleClose();
	}

	const onClear = () =>
	{
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
		})
		setData(defaultData1);
	}

	// filters it Contains all Current applied Filters.
	// useEffect(() =>
	// {
	// 	console.log("Filters Updated");
	// }, [ filters ]);

	const [warehouseInfo, setWarehoueseInfo] = useState([]);
	 
	const getAds = async() => {
		axios.get("/getAllWarehouse")
			.then(res => {
				console.log(res.data)
				setWarehoueseInfo(res.data)
			}).catch(err => {
				console.log(err)
			})
		}
	
	useEffect(() => {
		getAds()
	}, [])

	// const warehouseInfo = [
	// 	{ image: "/images/s1.jpg", name: "Shree", location: "surat", facility: "CCTV monitoring", size: "10' x 20' x 6'", rating: "2.5", price: "150", percentage: "33", area: "50", totalArea: "200" },
	// 	{ image: "/images/s5.jpg", name: "Surya", location: "delhi", facility: "Climate Control", size: "30' x 20' x 6'", rating: "4.5", price: "200", percentage: "20", area: "200", totalArea: "600" },
	// 	{ image: "/images/s6.jpg", name: "lakshmi", location: "Nagpur", facility: "Indoor Storage", size: "15' x 20' x 5'", rating: "4.5", price: "350", percentage: "33", area: "50", totalArea: "300" },
	// 	{ image: "/images/s4.jpg", name: "mahadev", location: "surat", facility: "Outdoor/Drive Up", size: "15' x 20' x 5'", rating: "3.5", price: "170", percentage: "33", area: "50", totalArea: "300" },
	// ];

	// search bar begins
	let loc;
	ctx.data.location==null? loc='':loc=ctx.data.location;
	const [ locationInput, setLocationInput ] = useState(loc);
	// search bar ends

	const handleChange = (e) =>
	{
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
			<Offcanvas show={ show } onHide={ handleClose } >
				<Offcanvas.Header closeButton>
					<Offcanvas.Title><b>Filter & Sort Locations </b></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Card>
						<Card.Header className="text-center text-white bg-blue">
							<b>Filter & Sort Locations </b>
						</Card.Header>
						<Card.Body className="cardStorageBody">
							<Row>
								<Col md={ 12 } className="mx-3">
									<Form>
										<Form.Group
											className="mb-3 d-grid gap-2"
											controlId="formBasicRadioButton"
										>
											<Form.Label>
												<b>Sort Results By:</b>
											</Form.Label>
											<Form.Check
												id="r1"
												className="radioX"
												label="Size"
												name="sortBy"
												type="radio"
												value="size"
												checked={ data.sortBy === "size" }
												onChange={ onRadioSelect }
											/>
											<Form.Check
												id="r2"
												className="radioX"
												label="Price(Lowest to Highest)"
												name="sortBy"
												type="radio"
												value="price"
												checked={ data.sortBy === "price" }
												onChange={ onRadioSelect }
											/>
											<Form.Check
												id="r3"
												className="radioX"
												label="Distance"
												name="sortBy"
												type="radio"
												value="distance"
												checked={ data.sortBy === "distance" }
												onChange={ onRadioSelect }
											/>
										</Form.Group>
										<hr />
										<Form.Group
											className="mb-3 d-grid gap-2"
											controlId="formBasicCheckbox"
										>
											<Form.Label>
												<b>Features</b>
											</Form.Label>
											<Form.Check
												id="c1"
												className="checkX"
												label="CCTV surveillance"
												name="cctv"
												type="checkbox"
												checked={ data.cctv }
												onChange={ onCheckChange }
											/>
											<Form.Check
												id="c2"
												className="checkX"
												label="Indoor Storage"
												name="indoor"
												type="checkbox"
												checked={ data.indoor }
												onChange={ onCheckChange }
											/>
											<Form.Check
												id="c3"
												className="checkX"
												label="Outdoor/Drive Up"
												name="outdoor"
												type="checkbox"
												checked={ data.outdoor }
												onChange={ onCheckChange }
											/>
											<Form.Check
												id="c4"
												className="checkX"
												label="Climate Control"
												name="climate"
												type="checkbox"
												checked={ data.climate }
												onChange={ onCheckChange }
											/>
										</Form.Group>
										<hr />
										<Form.Group
											className="mb-3 d-grid gap-2"
											controlId="formBasicRadioButton2  "
										>
											<Form.Label>
												<b>Book Type</b>
											</Form.Label>
											<Form.Check
												id="r4"
												className="radioX"
												label="Rent Now"
												name="bookType"
												type="radio"
												value="rentnow"
												checked={ data.bookType === "rentnow" }
												onChange={ onRadioSelect }
											/>
											<Form.Check
												id="r5"
												className="radioX"
												label="Reserve"
												name="bookType"
												type="radio"
												value="reserve"
												checked={ data.bookType === "reserve" }
												onChange={ onRadioSelect }
											/>
										</Form.Group>
										<hr />
										<Form.Group className="mb-3 text-center">
											<Button className="mr-3" variant="light" onClick={ onClear }>
												Clear All Filters
											</Button>
											<Button className="center text-white" variant="blue" onClick={ onSave }>
												Apply
											</Button>
										</Form.Group>
									</Form>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Offcanvas.Body>
			</Offcanvas>

			<Container className="my-5" fluid>
				<Row>
					<Col md={ 12 } sm={ 12 }>
						<Row className="">
							<Col lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 } className="">
								<Button variant="primary"
									className="my-2 text-light btn-block py-2"
									onClick={ handleShow }>
									<VscSettings className="text-white mx-1" />
									Filters
									<Badge bg="light" pill className="mx-1 text-dark">{ Object.values(filterItems).filter(f => f === true).length }</Badge>
								</Button>
							</Col>
							<Col lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
								<Button
									className="my-2 text-light btn-block"
									variant="success"
									onClick={ () =>
									{
										setToggle(1);
									} }
								>
									<FaMap className="mx-1" />
									Map
								</Button>
							</Col>
							<Col lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
								<Button
									className="my-2 btn-block"
									variant="warning"
									onClick={ () =>
									{
										setToggle(0);
									} }
								>
									<BsFillGrid3X2GapFill className="mx-1" />
									GridView
								</Button>
							</Col>
							<Col md={ 1 } className="my-2 btn-block">

							</Col>
							<Col md={ 5 }>
								<Form className="d-flex my-2">
									<Form.Control
										type="search"
										placeholder="Search"
										className="me-2 rounded-5"
										aria-label="Search"
										onChange={ handleChange }
										value={ locationInput }
									/>
									<Button variant="secondary" className="text-white"><FcSearch /></Button>
								</Form>
							</Col>
						</Row>
						<Row>
							<Col lg={ 8 } md={ 8 } sm={ 12 } xs={ 12 } className="">
								<Row>
									<Col md={ 12 } className="appliedFilters my-3">
										{
											Object.entries(filterItems).map((filter, ind) =>
											{
												if (ind<4 && filter[1]==true)
												{
													return (
														<div key={ind} className="alert alert-dark alert-dismissible fade show mx-2 py-2 col-xs-12" >
															{ filterNames[filter[0]] }
															<button type="button" className="close py-2" aria-label="Close">
																<span onClick={ removerFilter.bind(null, filter[0]) } aria-hidden="true">&times;</span>
															</button>
														</div>
													)
												} else
												{
													if(ind>=4 && filter[1]==true){
														return (
															<div key={ind} className="alert alert-dark alert-dismissible fade show mx-2 py-2 col-xs-12" >
																{ data[filter[0]] }
																<button type="button" className="close py-2" aria-label="Close">
																	<span onClick={ removerFilter.bind(null, filter[0]) } aria-hidden="true">&times;</span>
																</button>
															</div>
														)
													}else{
														return <></>;
													}
												}
											})
										}
									</Col>
								</Row>
							</Col>
							<Col lg={ 2 } md={ 2 }></Col>
						</Row>
					</Col>
					<Col lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
						<Col md={ 12 } className="my-5">
							{ toggle ? <MapX></MapX> : <CardSection warehouseInfo={ warehouseInfo }></CardSection> }
						</Col>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Storage;
