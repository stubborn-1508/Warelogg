import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
const BecomePartner = () =>
{
  const styles = {
    backgroundColor: "yellow",
    color: "purple"
  }
  const bgCo = {
    backgroundColor: "",
  }
  return (
    <>
      <Container className="my-5" style={ bgCo } fluid>
        <Row>
          <Form className="text-center my-5">
            <Row>
              <Col md={ 6 }>
                <h3>
                  Become a&nbsp;
                  <b>
                    <u><mark style={ styles }>Let's Go Pal Partner</mark></u>
                  </b>
                  &nbsp; and make your business more profitable.
                </h3>
                <img
                  className="d-block w-100 rounded my-5"
                  src="images/partner.jpg"
                  alt="First slide"
                />
              </Col>
              <Col md={ 6 } className="text-left">
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                    <Form.Control
                      placeholder="Mobile"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-3">Business Address</Form.Label>
                  <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" aria-label="Select State" size="md" className="text-center bg-secondary">
                    <option value="1">Delhi</option>
                    <option value="2">Gujarat</option>
                    <option value="3">Maharashtra</option>
                    <option value="4">Karnataka</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Zip/Postal</Form.Label>
                  <Form.Control type="zip" required></Form.Control>
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Add Warehouse Images & Videos</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
              </Col>
              <Col md={ 12 }>
                <Form.Group>
                  <div>
                    <Button variant="blue" className="btn-block my-3" size="lg">
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
