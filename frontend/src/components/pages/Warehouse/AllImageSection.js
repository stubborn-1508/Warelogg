import React from 'react'
import { Container, Row, Col } from "react-bootstrap";;
const AllImageSection = () =>
{
    return (
        <>
            <Container className='my-5'>
                <Row className='my-2'>
                    <Col md={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s6.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col md={ 6 } sm={ 6 } xs={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s5.jpg"
                            alt="First slide"
                        />
                    </Col>
                    <Col md={ 6 } sm={ 6 } xs={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s4.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col md={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s3.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col md={ 4 } sm={ 6 } xs={ 12 }> <img
                        className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                        src="images/s2.jpg"
                        alt="First slide"
                    /></Col>
                    <Col md={ 4 } sm={ 6 } xs={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s1.jpg"
                            alt="First slide"
                        />
                    </Col>
                    <Col md={ 4 } sm={ 12 } xs={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s5.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col md={ 12 }>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s6.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={ 6 } className='my-2'>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s1.jpg"
                            alt="First slide"
                        />
                    </Col>
                    <Col md={ 6 } className='my-2'>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s6.jpg"
                            alt="First slide"
                        />
                    </Col>
                    <Col md={ 6 } className='my-2'>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s5.jpg"
                            alt="First slide"
                        />
                    </Col>
                    <Col md={ 6 } className='my-2'>
                        <img
                            className="d-block w-100 shadow p-3 mb-5 bg-white rounded"
                            src="images/s2.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default AllImageSection;

