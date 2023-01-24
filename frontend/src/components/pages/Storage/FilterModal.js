import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge,
} from "react-bootstrap";

const FilterModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
      // backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Filter & Sort Locations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header className="text-center text-white bg-blue">
            <b>Filter & Sort Locations </b>
          </Card.Header>
          <Card.Body className="cardStorageBody">
            <Row>
              <Col md={12} className="mx-3">
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
                      checked={props.data.sortBy === "size"}
                      onChange={props.onRadioSelect}
                    />
                    <Form.Check
                      id="r2"
                      className="radioX"
                      label="Price(Lowest to Highest)"
                      name="sortBy"
                      type="radio"
                      value="price"
                      checked={props.data.sortBy === "price"}
                      onChange={props.onRadioSelect}
                    />
                    <Form.Check
                      id="r3"
                      className="radioX"
                      label="Distance"
                      name="sortBy"
                      type="radio"
                      value="distance"
                      checked={props.data.sortBy === "distance"}
                      onChange={props.onRadioSelect}
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
                      checked={props.data.cctv}
                      onChange={props.onCheckChange}
                    />
                    <Form.Check
                      id="c2"
                      className="checkX"
                      label="Indoor Storage"
                      name="indoor"
                      type="checkbox"
                      checked={props.data.indoor}
                      onChange={props.onCheckChange}
                    />
                    <Form.Check
                      id="c3"
                      className="checkX"
                      label="Outdoor/Drive Up"
                      name="outdoor"
                      type="checkbox"
                      checked={props.data.outdoor}
                      onChange={props.onCheckChange}
                    />
                    <Form.Check
                      id="c4"
                      className="checkX"
                      label="Climate Control"
                      name="climate"
                      type="checkbox"
                      checked={props.data.climate}
                      onChange={props.onCheckChange}
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
                      checked={props.data.bookType === "rentnow"}
                      onChange={props.onRadioSelect}
                    />
                    <Form.Check
                      id="r5"
                      className="radioX"
                      label="Reserve"
                      name="bookType"
                      type="radio"
                      value="reserve"
                      checked={props.data.bookType === "reserve"}
                      onChange={props.onRadioSelect}
                    />
                  </Form.Group>
                  <hr />
                  <Form.Group className="text-center">
                    <Button
                      className="mr-3"
                      variant="light"
                      onClick={props.onClear}
                    >
                      Clear All Filters
                    </Button>
                    {/* <Button
                      className="center text-white"
                      variant="blue"
                      onClick={props.onSave}
                    >
                      Apply
                    </Button> */}
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
