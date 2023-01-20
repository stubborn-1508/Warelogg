import React, {useState,useEffect} from 'react'
import { Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import YourOrdersCard from "./YourOrdersCard.js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const YourOrders = () =>
{

	const navigate = useNavigate();

	const [userId, setUserId] = useState(null);
    const [book, setBook] = useState(null);


	const fetchBook = async (id) => {
        try {
            const res = await axios({ url: "/getBooks", data: { id: id }, method: "post" });
			console.log(res);
            setBook(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchData = async (usertoken) => {
        const res = await axios.get("/getAllUsers", {
            headers: { "x-auth-token": usertoken },
        });
        setUserId(res.data._id);
		fetchBook(res.data._id);
    }

	useEffect(() => {
		const usertoken = localStorage.getItem('token');
		if(!usertoken){
			navigate('/login');
		}else{
			fetchData(usertoken);
		}
	}, []);

	console.log(book);

	if(!userId || !book){
		return (
			<>Please Wait...</>
		)
	}else{
		return (
			<>
				<Container className='my-5'>
					<Row>
						<Col md={ 12 } xs={ 12 }>
							<Tabs
								defaultActiveKey="bookings"
								id="justify-tab-example"
								className="mb-3"
								justify
							>
								<Tab eventKey="bookings" title="Bookings">
									{book.filter(ele => ele.isActive===true).map((ele, ind) => {
										return <YourOrdersCard key={ind} bookData={ele}></YourOrdersCard>
									})}
								</Tab>
								<Tab eventKey="profile" title="Cancelled Bookings">
									{book.filter(ele => ele.isActive===false).map((ele, ind) => {
										return <YourOrdersCard muted={true} key={ind} bookData={ele}></YourOrdersCard>
									})}
								</Tab>
							</Tabs>
						</Col>
					</Row>
				</Container>
			</>
		)
	}

}

export default YourOrders;

