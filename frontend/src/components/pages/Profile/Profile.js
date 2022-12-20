import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap";
import "./profile.css";
import { useNavigate } from 'react-router-dom';
import UserDetails from "./UserDetails";
import YourOrders from "./YourOrders";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [query, setQuery] = useState(false);

    const fetchData = async (usertoken) => {
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

    useEffect(() => {
        const usertoken = localStorage.getItem("token");
        // console.log(usertoken);
    
        if (!usertoken) {
          navigate("/login");
        } else {
            fetchData(usertoken);
        }
      }, [query]);
    

    const [ toggle, setToggle ] = useState(1);
    if(query){
        return (
            <>
                <section style={ { backgroundColor: "#eee" } }>
                    <div className="container-fluid py-5">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img
                                            src="images/avtar.png"
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={ { width: 150 } }
                                        />
                                        <h5 className="my-3">{user.name}</h5>
                                        <p className="text-muted mb-1">Full Stack Developer</p>
                                        <p className="text-muted mb-4">Ahmadabad Gujarat</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <Button type="button" className="ms-1" variant="warning"
                                                onClick={ () =>
                                                {
                                                    if (toggle === 0) {
                                                        setToggle(1);
                                                    }
                                                }
                                                }
                                            >
                                                User Details
                                            </Button>
                                            <Button type="button" className="ms-1" variant="success"
                                                onClick={ () =>
                                                {
                                                    if (toggle === 1) {
                                                        setToggle(0);
                                                    }
                                                }
                                                }
                                            >
                                                Your Orders
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
                                                    style={ { color: "#55acee" } }
                                                />
                                                <p className="mb-0">Twitter Handle</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i
                                                    className="fab fa-instagram fa-lg"
                                                    style={ { color: "#ac2bac" } }
                                                />
                                                <p className="mb-0">Instagram Handle</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i
                                                    className="fab fa-facebook-f fa-lg"
                                                    style={ { color: "#3b5998" } }
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
                                        { toggle ? <UserDetails userDetails={user} /> : <YourOrders /> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }else{
        return (
            <>
                <h1>Please Wait......</h1>
            </>
        )
    }
}

export default Profile;

