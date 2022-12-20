import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () =>
{
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        mobile: '',
        password: '',
        state: ''
    });

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const reg = async (userData) => {
        try {
            const res = await axios({url: "/register", data:userData, method:"post"});
            console.log(res);
            return [res.data, res.status];
        } catch(e){
            console.log(e);
            return [e.response.data, e.response.status];
        }
    }

    const log = async (userData) => {
        try {
            const res = await axios({url: "/loginUser", data:userData, method:"post"});
            console.log(res);
            return [res.data, res.status];
        } catch(e){
            console.log(e);
            return [e.response.data, e.response.status];
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regUser = {
            name: user.name,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            password: user.password,
            state: user.state,
        };
        
        const logUser = {
            email: user.email,
            password: user.password
        }
        
        const waitRes1 = await reg(regUser);

        alert(waitRes1[0]);

        if(waitRes1[1] === 200){
            const waitRes2 = await log(logUser);
            if(waitRes2[1] === 200){
                localStorage.setItem("token", waitRes2[0].token);
                navigate("/profile");
            }else{
                alert(waitRes2[0]);
            }
        }

        setUser({
            name: '',
            email: '',
            password: '',
            mobile: '',
            state: '',
            username: ''
        });
    }

    return (
        <>
            <div
                className="container-fluid bg-registration py-5"
                style={ { margin: "90px 0" } }
            >
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="mb-4">
                                <h5
                                    className="text-primary text-uppercase mb-3"
                                    style={ { letterSpacing: 5 } }
                                >
                                    Need Any Storage
                                </h5>
                                <h1 className="text-white">10% Off For New Comers</h1>
                            </div>
                            <p className="text-white">
                                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor
                                lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat justo
                                sed sed diam. Ea et erat ut sed diam sea ipsum est dolor
                            </p>
                            <ul className="list-inline text-white m-0">
                                <li className="py-2">
                                    <i className="fa fa-check text-primary mr-3" />
                                    Labore eos amet dolor amet diam
                                </li>
                                <li className="py-2">
                                    <i className="fa fa-check text-primary mr-3" />
                                    Etsea et sit dolor amet ipsum
                                </li>
                                <li className="py-2">
                                    <i className="fa fa-check text-primary mr-3" />
                                    Diam dolor diam elitripsum vero.
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <div className="card border-0">
                                <div className="card-header bg-light text-center p-4">
                                    <h1 className="m-0">Sign Up Now</h1>
                                </div>
                                <div className="card-body rounded-bottom bg-primary p-5">
                                    <form>
                                        <div className="form-group">
                                            <input
                                                name="name"
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control border-0 p-4"
                                                placeholder="Your Name"
                                                required="required"
                                                value={user.name}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                onChange={handleChange}
                                                type="email"
                                                className="form-control border-0 p-4"
                                                placeholder="Your Email"
                                                required="required"
                                                value={user.email}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="username"
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control border-0 p-4"
                                                placeholder="Your Username"
                                                defaultValue={user.username}
                                                value={user.username}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="mobile"
                                                onChange={handleChange}
                                                type="number"
                                                className="form-control border-0 p-4"
                                                placeholder="Mobile Number"
                                                value={user.mobile}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                onChange={handleChange}
                                                type="password"
                                                className="form-control border-0 p-4"
                                                placeholder="Your Password"
                                                required="required"
                                                value={user.password}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <select
                                                name="state"
                                                onChange={handleChange}
                                                className="custom-select border-0 px-4"
                                                style={ { height: 47 } }
                                            >
                                                <option selected="">Select State</option>
                                                <option value={ "Delhi" }>Delhi</option>
                                                <option value={ "Gujurat" }>Gujarat</option>
                                                <option value={ "Maharashtra" }>Maharashtra</option>
                                            </select>
                                        </div>
                                        <div className="text-right">
                                            <button
                                                className="btn btn-dark btn-block border-0 py-3 mb-3"
                                                onClick={handleSubmit}
                                                type="submit"
                                            >
                                                Sign Up Now
                                            </button>
                                            <Link to="/login" className="bg-light mt-1">Regular User Login Now</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
