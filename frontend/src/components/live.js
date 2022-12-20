import React from 'react';
import videoBg from "../assets/warehouse.mp4"
import "./live.css";
import { Container, Row, Col } from "react-bootstrap"
const Live = () =>
{
    return (
        <>
            <Container>
                <Row>
                    <Col md={ 12 } className="my-5">
                        <div className='main'>
                            <video src={ videoBg } autoPlay loop muted />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Live;
