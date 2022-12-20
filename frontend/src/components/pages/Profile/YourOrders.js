import React from 'react'
import { Container, Row, Col, Tabs, Tab} from "react-bootstrap";

import YourOrdersCard from "./YourOrdersCard.js";

const YourOrders = () =>
{
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
								<YourOrdersCard></YourOrdersCard>
								<YourOrdersCard></YourOrdersCard>
								<YourOrdersCard></YourOrdersCard>
							</Tab>
							<Tab eventKey="profile" title="Cancelled Bookings">
								<YourOrdersCard muted={true}></YourOrdersCard>
								<YourOrdersCard muted={true}></YourOrdersCard>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default YourOrders

