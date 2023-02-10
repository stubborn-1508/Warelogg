import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
// import "./Header.css";
import { FcMenu } from "react-icons/fc";
import { CartContext } from "../../../Contexts/CartContextHolder";
import axios from "axios";
// import Context from "../../../Contexts/context";
import { Dropdown, Button, Row, Col, Container } from "react-bootstrap";
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";
import "react-icons";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  console.log(location.pathname);

  const [modalShow, setModalShow] = React.useState(false);
  const [registerModalShow, setRegisterModalShow] = React.useState(false);

  return (
    <>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      <RegisterModal
        show={registerModalShow}
        onHide={() => setRegisterModalShow(false)}
      />
      <div className="shadow-sm bg-white rounded">
        <div className="container-fluid">
          <nav className="d-flex justify-content-between navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 ">
            <Link
              to="/"
              className="text-decoration-none d-flex justify-content-center align-items-center"
            >
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
            {/* <div className="d-flex flex-row justify-content-between"> */}

            {/* <Link
              to="/cart"
              className="nav-item nav-link position-relative my-2 my-lg-0 navBarCartResponsive"
              style={{display:"none"}}
              >
              <span className="cart-basket d-flex align-items-center justify-content-center">
                {ctx.cartValue}
              </span>
              <i className="fas fa fa-shopping-cart fa-lg text-dark"></i>
            </Link> */}
            <button
              type="button"
              className="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="toggler-icon top-bar" />
              <span className="toggler-icon middle-bar" />
              <span className="toggler-icon bottom-bar" />
            </button>
            <div
              className="collapse navbar-collapse flex-row-reverse mx-0 mx-lg-3"
              id="navbarCollapse"
              >
                {/* for screen smaller than lg show this div */}
                <div className="d-inline d-lg-none">
                  <Link
                    to="/partner"
                    className="nav-item nav-link listSpaceButtonStyle"
                    >
                    List Your Space
                  </Link>
                  <Link
                    to="/orders"
                    className="nav-item nav-link listSpaceButtonStyle"
                    >
                    My Bookings
                  </Link>
                  <Link
                    to="/allListedSpace"
                    className="nav-item nav-link listSpaceButtonStyle"
                    >
                    My Listed Space
                  </Link>
                  <Link
                    to="/cart"
                    className="nav-item nav-link cart position-relative my-2 my-lg-0 posCart"
                    >
                    <span className="cart-basket d-flex align-items-center justify-content-center">
                      {ctx.cartValue}
                    </span>
                    <i className="fas fa fa-shopping-cart fa-lg text-dark"></i>
                  </Link>
                  <Link
                    to="/profile"
                    className="nav-item nav-link listSpaceButtonStyle"
                    >
                    Profile
                  </Link>
                  {usertoken != null ? (
                    <Button
                    className="btn btn-dark text-white d-lg-block mx-4"
                    onClick={handleLogout}
                    >
                          Logout
                        </Button>
                      ) : (
                        <>
                          <Link to="" className="nav-item nav-link listSpaceButtonStyle" onClick={() => setRegisterModalShow(true)}>
                              Signup
                          </Link>
                          <Link to="/profile" className="nav-item nav-link listSpaceButtonStyle" onClick={() => setModalShow(true)}>
                              Login
                          </Link>
                        </>
                      )}
                </div>
                {/* else show this div */}
                <div className="d-none d-lg-flex listSpaceBT">
                  <Link
                    to="/partner"
                    className="nav-item nav-link listSpaceButtonStyle"
                    >
                    List Your Space
                  </Link>
                  <a
                    class="nav-item nav-link listSpaceButtonStyle"
                    href="#popup1"
                    >
                    Shipping
                  </a>
                  <div id="popup1" class="overlay">
                    <div class="popup">
                      <img
                        className="d-block w-100"
                        src="/images/comingsoon.png"
                        alt="First slide"
                        style={{ height: "29rem", objectFit: "fill" }}
                        />
                      <div
                        class="stayTunedContainer"
                        style={{ height: "2rem" }}
                        >
                        <div class="stayTunedTypewriter">STAY TUNED!</div>
                      </div>
                      <a class="close" href="#">
                        &times;
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/cart"
                    className="nav-item nav-link cart position-relative my-2 my-lg-0 posCart"
                    >
                    <span className="cart-basket d-flex align-items-center justify-content-center">
                      {ctx.cartValue}
                    </span>
                    <i className="fas fa fa-shopping-cart fa-lg text-dark"></i>
                  </Link>
                  <Dropdown xs={2} className="mx-2" variant="secondary">
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
                    <Dropdown.Menu className="dropdownMenu">
                      <Link to="/profile" className="nav-item nav-link">
                        <Dropdown.Item as="button">Profile</Dropdown.Item>
                      </Link>
                      <Link to="/orders" className="nav-item nav-link">
                        <Dropdown.Item as="button">My Bookings</Dropdown.Item>
                      </Link>
                      <Link to="/allListedSpace" className="nav-item nav-link">
                        <Dropdown.Item as="button">
                          My Listed Space
                        </Dropdown.Item>
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
                          <Link to="" className="nav-item nav-link">
                            <Dropdown.Item
                              as="button"
                              onClick={() => setRegisterModalShow(true)}
                              >
                              Signup
                            </Dropdown.Item>
                          </Link>
                          <Link to="/profile" className="nav-item nav-link">
                            <Dropdown.Item
                              as="button"
                              onClick={() => setModalShow(true)}
                              >
                              Login
                            </Dropdown.Item>
                          </Link>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                      {/* </div> */}
                </div>
              </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
