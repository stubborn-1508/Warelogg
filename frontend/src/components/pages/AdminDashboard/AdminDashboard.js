import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap";
import "./profile.css";
import { useNavigate } from 'react-router-dom';
import UserDetails from "./UserDetails";
import CardSection from '../Cards/Card';
import axios from "axios";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [query, setQuery] = useState(false);
    const [warehouse, setWareHouse] = useState(null);

    const fetchUserData = async (usertoken) => {
        try {
            const res = await axios.get("/getAllUsers", {
                headers: { "x-auth-token": usertoken },
            });
            console.log(res.data);
            setUser(res.data);
            setQuery(true);
        } catch (err) {
            console.log("Error in fetching data" + err);
        }
    };

    const fetchWareData = () => {
        axios.get("/getAllWarehouse")
            .then(res => {
                setWareHouse(res.data);
            }).catch(err => {
                console.log(err);
                alert('Error fetching warehouse data. Please retry');
            });
    }
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const usertoken = localStorage.getItem("token");
        // console.log(usertoken);
        if (!usertoken) {
            navigate("/login");
        } else {
            fetchUserData(usertoken);
        }
    }, [query, toggle]);




    const handleShowWarehouse = async (e) => {
        fetchWareData();
    }

    console.log(warehouse);
    if (query) {
        return (
            <>
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container-fluid py-5">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img
                                            src="images/avtar.png"
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={{ width: 150 }}
                                        />
                                        <h5 className="my-3">{user.username}</h5>
                                        <p className="text-muted mb-1">Founder WareLogg</p>
                                        <p className="text-muted mb-4">IIT Mandi Catalyst</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <Button type="button" className="ms-1" variant="warning" onClick={handleShowWarehouse}>
                                                Show Warehouses
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush rounded-3">
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i
                                                    className="fab fa-twitter fa-lg"
                                                    style={{ color: "#55acee" }}
                                                />
                                                <p className="mb-0">Twitter Handle</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i
                                                    className="fab fa-instagram fa-lg"
                                                    style={{ color: "#ac2bac" }}
                                                />
                                                <p className="mb-0">Instagram Handle</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i
                                                    className="fab fa-facebook-f fa-lg"
                                                    style={{ color: "#3b5998" }}
                                                />
                                                <p className="mb-0">Facebook Handle</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <UserDetails userDetails={user} />
                                    </div>
                                </div>
                                <div>
                                    {warehouse ? warehouse.length >= 1 ? (<>
                                        <CardSection warehouseInfo={warehouse}></CardSection>
                                    </>) : (<>
                                        <h1>No Results</h1>
                                    </>) : (<>
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <h1>Please Wait......</h1>
            </>
        )
    }
}

export default AdminDashboard;

