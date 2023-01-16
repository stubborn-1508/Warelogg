import React, { useState, useRef, Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { FcMenu } from "react-icons/fc";
import Context from "../../../Contexts/context";
// import Context from "../../../Contexts/context";
import { Dropdown, Button, Row, Col, Container } from "react-bootstrap";
import "react-icons";
const styles = {
  fontFamily: "Mrs+Sheppards",
};

const HeaderSection = () =>
{
  const ctx = useContext(Context);
  const usertoken = localStorage.getItem("token");


  const navigate = useNavigate();
  const handleLogout = (e) =>
  {
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <div className="shadow-sm bg-white rounded">
      <div className="container-fluid my-3">
        <div className="row px-xl-5">
          <div className="col-lg-3">
            <Link to="" className="text-decoration-none d-none d-lg-block">
              <h1 className="m-0" style={ styles }>
                <span className="logo">
                  <span className="ml-2">
                    <img src="/images/logo.png" height={ 60 } width={ 60 } alt="" />
                  </span>
                </span>
                {/* <span className="text-yellow">Let's </span> */}
                <span className="text-orange">Warelogg </span>
              </h1>
            </Link>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0">
              <span className="logo-sm">
                <span className="ml-2">
                  <img src="/images/logo.png" height={ 60 } width={ 60 } alt="" />
                </span>
              </span>
              <Link to="/" className="text-decoration-none d-block d-lg-none d-xs-none">
                <h1 className="m-0">
                  {/* <span className="text-yellow">Let's </span> */}
                  <span className="text-orange">Warelogg </span>
                  {/* <span className="text-orange">Pal</span> */}
                </h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav py-0">
                  {/* <Link to="/" className="nav-item nav-link active">
                    Home
                  </Link> */}
                  <Link to="/partner" className="nav-item nav-link">
                    List Your Space
                  </Link>
                  <Link to="/locations" className="nav-item nav-link">
                    Track & Trace
                  </Link>
                  <Link to="/contact" className="nav-item nav-link">
                    Contact
                  </Link>
                </div>
                <Link
                  to="/cart"
                  className="nav-item nav-link cart position-relative d-inline-flex"
                >
                  <span className="cart-basket d-flex align-items-center justify-content-center">
                    { ctx.data.cart }
                  </span>
                  <i className="fas fa fa-shopping-cart fa-lg text-dark">
                  </i>
                </Link>
              </div>
              <Row>
                <Dropdown xs={ 2 } className="d-inline mx-2" variant="secondary">
                  <Dropdown.Toggle id="dropdown-autoclose-true dropdownHeader" variant="secondary" className="rounded-pill">
                    <FcMenu />
                    <img src="/images/avtar.png" className="rounded-circle mx-2" height="25px" alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Link to="/profile" className="nav-item nav-link"><Dropdown.Item as="button">Profile</Dropdown.Item></Link>
                    <Link to="/orders" className="nav-item nav-link"><Dropdown.Item as="button">My Bookings</Dropdown.Item></Link>
                    <Link to="/allListedSpace" className="nav-item nav-link"><Dropdown.Item as="button">My Listed Space</Dropdown.Item></Link>
                    <Dropdown.Divider />
                    { usertoken != null ?
                      <Button className="btn btn-dark text-white d-lg-block mx-auto" onClick={ handleLogout }>Logout</Button>
                      :
                      <><Link to="/register" className="nav-item nav-link"><Dropdown.Item as="button">Signup</Dropdown.Item></Link>
                        <Link to="/login" className="nav-item nav-link"><Dropdown.Item as="button">Login</Dropdown.Item></Link>
                      </>
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Row>

            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
