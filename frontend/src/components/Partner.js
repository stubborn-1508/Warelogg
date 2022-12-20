import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
const BecomePartner = () =>
{
  return (
    <>
      <Container className="my-5">
        <Row>
          <Form className="text-center my-5">
            <Row>
              <Col md={ 6 }>
                <h5>
                  Become a&nbsp;
                  <b>
                    <u>Let's Go Pal Partner</u>
                  </b>
                  &nbsp; and make your business more profitable.
                </h5>
                <img
                  className="d-block w-100 rounded"
                  src="images/x4.jpg"
                  alt="First slide"
                />
              </Col>
              <Col md={ 6 } className="text-center">
                <Form.Group>
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder="Phone Number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Business Address</Form.Label>
                  <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" aria-label="Select State" size="md" className="text-center bg-secondary">
                    <option value="1">Delhi</option>
                    <option value="2">Gujarat</option>
                    <option value="3">Maharashtra</option>
                    <option value="4">Karnataka</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Zip/Postal</Form.Label>
                  <Form.Control type="zip" required></Form.Control>
                </Form.Group>
              </Col>
              <Col md={ 12 }>
                <Form.Group>
                  <div>
                    <Button variant="info" className="btn btn-primary btn-block my-3" size="lg">
                      Become Partner
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
