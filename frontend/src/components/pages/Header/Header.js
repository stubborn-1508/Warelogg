import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { FcMenu } from "react-icons/fc";
import { CartContext } from "../../../Contexts/CartContextHolder";
import axios from "axios";
// import Context from "../../../Contexts/context";
import { Dropdown, Button, Row, Col, Container } from "react-bootstrap";
import "react-icons";
const styles = {
  fontFamily: "Mrs+Sheppards",
};

const HeaderSection = () => {
  const ctx = useContext(CartContext);
  const usertoken = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const fetchCartValue = async (id) => {
    try {
      const res = await axios({
        url: "/getMyCart",
        data: { id: id },
        method: "post",
      });
      ctx.changeCartHandler(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (usertoken) => {
    const res = await axios.get("/getAllUsers", {
      headers: { "x-auth-token": usertoken },
    });
    fetchCartValue(res.data._id);
  };

  useEffect(() => {
    // get user_id
    const usertoken = localStorage.getItem("token");

    fetchData(usertoken);
  }, []);

  return (
    <div className="shadow-sm bg-white rounded">
      <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0">
          <Link to="/" className="text-decoration-none d-flex justify-content-center align-items-center">
            <span>
              <img src="/images/logo.png" height={60} width={60} alt="" />
            </span>
            <span
              style={{
                fontSize: "35px",
                backgroundImage: "linear-gradient(60deg, #E21143, #FFB03A)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textTransform: "none",
              }}
              className="ml-2 d-none d-sm-block"
            >
              Warelogg
            </span>
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
            className="collapse navbar-collapse justify-content-between mx-0 mx-lg-3"
            id="navbarCollapse"
          >
            <div className="navbar-nav py-0">
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
            <div>
            <Link
              to="/cart"
              className="nav-item nav-link cart position-relative d-inline-flex my-2 my-lg-0"
            >
              <span className="cart-basket d-flex align-items-center justify-content-center">
                {ctx.cartValue}
              </span>
              <i className="fas fa fa-shopping-cart fa-lg text-dark"></i>
            </Link>
            <Dropdown xs={2} className="d-lg-none d-block mx-2" variant="secondary">
              <Dropdown.Toggle
                id="dropdown-autoclose-true dropdownHeader"
                variant="secondary"
                className="rounded-pill"
              >
                <FcMenu />
                <img
                  src="/images/avtar.png"
                  className="rounded-circle mx-2"
                  height="25px"
                  alt=""
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link to="/profile" className="nav-item nav-link">
                  <Dropdown.Item as="button">Profile</Dropdown.Item>
                </Link>
                <Link to="/orders" className="nav-item nav-link">
                  <Dropdown.Item as="button">My Bookings</Dropdown.Item>
                </Link>
                <Link to="/allListedSpace" className="nav-item nav-link">
                  <Dropdown.Item as="button">My Listed Space</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                {usertoken != null ? (
                  <Button
                    className="btn btn-dark text-white d-lg-block mx-auto"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/register" className="nav-item nav-link">
                      <Dropdown.Item as="button">Signup</Dropdown.Item>
                    </Link>
                    <Link to="/login" className="nav-item nav-link">
                      <Dropdown.Item as="button">Login</Dropdown.Item>
                    </Link>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
            </div>
          </div>
          <Dropdown xs={2} className="d-none d-lg-inline" variant="secondary">
              <Dropdown.Toggle
                id="dropdown-autoclose-true dropdownHeader"
                variant="secondary"
                className="rounded-pill"
              >
                <FcMenu />
                <img
                  src="/images/avtar.png"
                  className="rounded-circle mx-2"
                  height="25px"
                  alt=""
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link to="/profile" className="nav-item nav-link">
                  <Dropdown.Item as="button">Profile</Dropdown.Item>
                </Link>
                <Link to="/orders" className="nav-item nav-link">
                  <Dropdown.Item as="button">My Bookings</Dropdown.Item>
                </Link>
                <Link to="/allListedSpace" className="nav-item nav-link">
                  <Dropdown.Item as="button">My Listed Space</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                {usertoken != null ? (
                  <Button
                    className="btn btn-dark text-white d-lg-block mx-auto"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/register" className="nav-item nav-link">
                      <Dropdown.Item as="button">Signup</Dropdown.Item>
                    </Link>
                    <Link to="/login" className="nav-item nav-link">
                      <Dropdown.Item as="button">Login</Dropdown.Item>
                    </Link>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
        </nav>
      </div>
    </div>
  );
};

export default HeaderSection;
