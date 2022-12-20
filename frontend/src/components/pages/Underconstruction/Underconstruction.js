import React from 'react'
import { Container, Col, Row } from "react-bootstrap";
export default function Underconstruction()
{
    const comingsoonStyle = {
        height: "400px",
    }
    return (
        <>
            <Container>
                <Row>
                    <Col lg={ 3 } md={ 2 } sm={ 12 } xs={ 12 }></Col>
                  <Col lg={ 6 } md={ 4 } sm={ 12 } xs={ 12 }>
                        <img
                            className="d-block w-100"
                            style={ comingsoonStyle }
                            src="images/comingsoon.jpg"
                            alt="First slide"
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

