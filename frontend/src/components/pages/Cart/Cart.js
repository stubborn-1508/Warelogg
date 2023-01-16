import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

const convertNumToDate = (num) => {
    let result = "";
    let d = new Date(num);
    result += d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    return result;
}

const Cart = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState(null);

    const fetchData = async (usertoken) => {
        const res = await axios.get("/getAllUsers", {
            headers: { "x-auth-token": usertoken },
        });
        setUserId(res.data._id);
        fetchCart(res.data._id);
    }

    const fetchCart = async (id) => {
        try {
            const res = await axios({ url: "/getMyCart", data: { id: id }, method: "post" });
            setCart(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // get user_id
        const usertoken = localStorage.getItem("token");
        if (!usertoken) {
            navigate("/login");
        } else {
            fetchData(usertoken, fetchCart);
        }
    }, []);

    const deleteCart = async (warehouse_id, subUnit_id) => {
        try {
            const res = await axios({ url: "/deleteCart", data: { id: userId, warehouse_id: warehouse_id, subUnit_id: subUnit_id }, method: "post" });
            // console.log(res.data);
            setCart(res.data.cartContent);
        } catch (err) {
            console.log(err);
        }
    }

    const checkOut = async () => {
        let amount = 0;
        let bookCartData = [];
        for(let i=0;i<cart.length;i++){
            if(cart[i].isAvailable){
                let obj = {};
                amount = amount + parseInt(cart[i].Price);
                obj.subUnit_id = cart[i].subUnit_id;
                obj.fromOcc = cart[i].OccFrom;
                obj.toOcc = cart[i].OccTo;
                obj.Name = cart[i].Name;
                obj.Size = cart[i].Size;
                obj.Price = cart[i].Price;
                bookCartData.push(obj);
            }
        }

        // console.log(bookCartData);

        const {data: { order }} = await axios({url: "/checkout", data: {amount: amount, bookCartData, userId}, method:"post"});
        // console.log(data);
        const options = {
            key: "rzp_test_Pv5XlbDcOtCgMo",
            amount: order.amount,
            currency: "INR",
            name: "Warelogg",
            description: "Tutorial of RazorPay",
            image: "/images/logo.png",
            order_id: order.id,
            callback_url: "http://localhost:5000/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#4d70ff"
            },
            modal: {
                ondismiss: async function (){
                    try{
                        const res = await axios({url: '/deleteOrder', data: {order_id: order.id}, method:'post'});
                    }catch(err){
                        console.log(err);
                    }
                }
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    if (userId == null || cart == null) {
        return (<>
            <h1> Please Wait.....</h1>
        </>)
    } else if (cart.length == 0) {
        return (
            <>
                <h1>Cart is empty</h1>
            </>
        )
    }
    else {
        return (
            <>
                <section className="h-100" style={{ backgroundColor: "#eee" }}>
                    <div className="container h-100 py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-10">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                </div>
                                {cart.map((ele, ind) => {
                                    return (
                                        <div key={ind} className="card rounded-3 mb-4">
                                            <div className="card-body p-4">
                                                <div className="row d-flex justify-content-between align-items-center">
                                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                                        <img
                                                            src="images/s4.jpg"
                                                            className="img-fluid rounded-3"
                                                            alt="Cotton T-shirt"
                                                        />
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                                        <p className="lead fw-normal mb-2">{ele.Name}</p>
                                                        <p>
                                                            <span className="text-muted">{ele.Size}</span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        {ele.isAvailable ? <>
                                                            <p className="mb-0">From - {convertNumToDate(ele.OccFrom)}</p>
                                                            <p className="mb-0">To - {convertNumToDate(ele.OccTo)}</p>
                                                        </>: <>
                                                            <p>Out Of Stock</p>
                                                        </>}
                                                    </div>
                                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        <h5 className="mb-0">{ele.Price}₹</h5>
                                                    </div>
                                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                        <a onClick={() => {
                                                            deleteCart(ele.warehouse_id, ele.subUnit_id)
                                                        }} href="#!" className="text-danger">
                                                            <i className="fas fa-trash fa-lg" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="card">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-warning btn-block btn-lg" onClick={checkOut}>
                                            Proceed to Pay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Cart;
