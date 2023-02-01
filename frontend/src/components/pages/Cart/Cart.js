import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { IconContext } from "react-icons";
import Empty from "./Empty.js"
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState(null);
    const [tot, setTot] = useState(0);

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
        //     console.log(res.data);
            setCart(res.data.cartContent);
        //     console.log(tot)
        } catch (err) {
            console.log(err);
        }
    }

    function shop(){
        navigate("/storage")
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

        for(let i=0;i<cart.length;i++){
            amount = amount + cart[i].Price;
        }

        const {data: { order }} = await axios({url: "/checkout", data: {amount: amount}, method:"post"});
        // console.log(data);
        // console.log(window);
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
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        // console.log(window.Razorpay);
    }

    

    

    if (userId == null || cart == null) {
        return (<>
            <h1> Please Wait.....</h1>
        </>)
    } else if (cart.length == 0) {
        return (
            <>
                <Empty/>
            </>
        )
    }
    else {
        var tempSum = 0
            for(let i=0;i<cart.length;i++){
                tempSum = tempSum + Number(cart[i].Price)*(cart[i].OccTo - cart[i].OccFrom)/(1000 * 3600 * 24);
            }
        //     setTot(tempSum)
        return (
            <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
  <div className=" py-5 h-100" style={{width: "90%", margin: "auto"}}>
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

              <div className="col-lg-8">
                <h5 className="mb-3"><a href="#!" className="text-body" onClick={shop}><i
                      className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1 fw-bold" style={{color: "black"}}>Shopping cart</p>
                    <p className="mb-0">You have {cart.length} {cart.length == 1 ? "item":"items"} in your cart</p>
                  </div>
                  <div>
                    <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                        className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                  </div>
                </div>

                {cart.map((ele, ind)=>{
                        const stDate = new Date(ele.OccFrom)
                        const edDate = new Date(ele.OccTo)
                                       const startFormat = stDate.toLocaleString("en-GB", {
                                                                                day: "numeric",
                                                                                month: "numeric",
                                                                                year: "numeric",
                                                                       });
                                       const endFormat = edDate.toLocaleString("en-GB", {
                                                                             day: "numeric",
                                                                               month: "numeric",
                                                                               year: "numeric",
                                                                         });
                        var numDays = (edDate.getTime() - stDate.getTime())/(1000 * 3600 * 24)
                        return (
                                <div key={ind}className="card mb-3 shadow mb-5 bg-white rounded">
                  <div className="card-body ">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="images/s4.jpg"
                            className="img-fluid rounded-3" alt="Shopping item" style={{width: "150px"}}/>
                        </div>
                        <div className="ms-3">
                          <h5 style={{color:"black"}}>{ele.Name}</h5>
                          <p className="small mb-0">{ele.Size}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center" style={{width: "350px"}}>
                        <div className="fw-bold" style={{color:"black", fontSize:"1rem"}}>
                                <p className="mb-0">From: <span className='fw-normal'>&nbsp;{startFormat}</span></p>
                                <p className="mb-0">To: &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span className='fw-normal'>{endFormat}</span></p>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 className="mb-0"><BiRupee/>{ele.Price*numDays}</h5>
                        </div>
                        <a onClick={() => {
                                deleteCart(ele.warehouse_id, ele.subUnit_id)
                                }} href="#!" className="text-danger"><i class="fas fa-trash-alt"></i></a>
                        
                      </div>
                                                        
                      
                    </div>
                  </div>
                </div>
                        )
                })}

                {/* <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                            className="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}}/>
                        </div>
                        <div className="ms-3">
                          <h5>Samsung galaxy Note 10 </h5>
                          <p className="small mb-0">256GB, Navy Blue</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 className="fw-normal mb-0">2</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 className="mb-0">$900</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i className="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
                            className="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}} />
                        </div>
                        <div className="ms-3">
                          <h5>Canon EOS M50</h5>
                          <p className="small mb-0">Onyx Black</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 className="fw-normal mb-0">1</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 className="mb-0">$1199</h5>
                        </div>
                        <a href="#!" style={{color:"#cecece"}}><i className="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="card mb-3 mb-lg-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style={{width:"65px"}}/>
                        </div>
                        <div className="ms-3">
                          <h5>MacBook Pro</h5>
                          <p className="small mb-0">1TB, Graphite</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width:"50px"}}>
                          <h5 className="fw-normal mb-0">1</h5>
                        </div>
                        <div style={{width:"80px"}}>
                          <h5 className="mb-0">$1799</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i className="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
              <div className="col-lg-4">

                <div className="card bg-primary text-white rounded-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0 fw-bold" style={{color:"white"}}>Summary</h5>
                      <IconContext.Provider value={{ className: "shared-class", size: 45 }}>
                        <>
                                <BsCart3/>
                        </>
                        </IconContext.Provider>
                    </div>


                    <hr className="my-4"/>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2"><BiRupee/>{tempSum}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Tax</p>
                      <p className="mb-2"><BiRupee/>20</p>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-2">Total(Incl. taxes)</p>
                      <p className="mb-2 fw-bold" style={{fontSize: "1.5rem"}}><IconContext.Provider value={{ className: "shared-class", size: 28 }}>
                        <>
                                <BiRupee/>
                        </>
                        </IconContext.Provider>{tempSum+20}</p>
                    </div>

                    <button type="button" className="btn btn-info btn-block btn-lg" onClick={checkOut}> 
                      <div className="d-flex justify-content-center">
                        {/* <span><BiRupee/>{tempSum+20}</span> */}
                        <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </div>
                    </button>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        )
    }
}

export default Cart;



// <>
//                 <section className="h-100" style={{ backgroundColor: "#eee" }}>
//                     <div className="container h-100 py-5">
//                         <div className="row d-flex justify-content-center align-items-center h-100">
//                             <div className="col-12">
//                                 <div className="d-flex justify-content-between align-items-center mb-4">
//                                     <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
//                                 </div>
//                                 <div className="card rounded-4 shadow p-3 mb-2 bg-white rounded" >
//                                             <div className="card-body p-0 pr-4 ">
//                                                 <div className="row d-flex justify-content-between align-items-center ">
//                                                     <div className="col-md-2 col-lg-2 col-xl-3">
//                                                     </div>
//                                                     <div className="col-md-3 col-lg-3 col-xl-2">
//                                                         <p className="lead fw-normal mb-2 text-muted" >Warehouse</p>
//                                                     </div>
//                                                     <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 fw-bold" style={{color:"black", fontSize:"1rem"}}>
//                                                         <p className="lead fw-normal mb-2 text-muted">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dates</p>
                                        
//                                                     </div>
//                                                     <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
//                                                         <h5 className="lead fw-normal mb-2 text-muted" >&nbsp;&nbsp;&nbsp;Price</h5>
//                                                     </div>
//                                                     <div className="col-md-1 col-lg-1 col-xl-1 text-end">
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                 {cart.map((ele, ind) => {
//                                         const stDate = new Date(ele.OccFrom)
//                                         const edDate = new Date(ele.OccTo)
//                                         const startFormat = stDate.toLocaleString("en-GB", {
//                                                                                 day: "numeric",
//                                                                                 month: "numeric",
//                                                                                 year: "numeric",
//                                                                         });
//                                         const endFormat = edDate.toLocaleString("en-GB", {
//                                                                                 day: "numeric",
//                                                                                 month: "numeric",
//                                                                                 year: "numeric",
//                                                                         });
//                                     return (
//                                         <div key={ind} className="card rounded-4 mb-4 shadow p-3 mb-5 bg-white rounded">
//                                             <div className="card-body p-0 pr-4 ">
//                                                 <div className="row d-flex justify-content-between align-items-center ">
//                                                     <div className="col-md-2 col-lg-2 col-xl-3">
//                                                         <img
//                                                             src="images/s4.jpg"
//                                                             className="img-fluid"
//                                                         />
//                                                     </div>
//                                                     <div className="col-md-3 col-lg-3 col-xl-2">
//                                                         <p className="lead fw-bold mb-2" style={{color: "black"}}>{ele.Name}</p>
//                                                         <p>
//                                                             <span className="fw-bold text-muted">{ele.Size}</span>
//                                                         </p>
//                                                     </div>
                                                //     <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 fw-bold" style={{color:"black", fontSize:"1rem"}}>
                                                //         <p className="mb-2">From: <span className='fw-normal'>{startFormat}</span></p>
                                                //         <p className="mb-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To: <span className='fw-normal'>{endFormat}</span></p>
                                                //     </div>
//                                                     <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
//                                                         <h5 className="mb-0" style={{color:"black", fontSize:"1.5rem"}}><BiRupee />{ele.Price}</h5>
//                                                     </div>
                                                //     <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                        // <a onClick={() => {
                                                        //     deleteCart(ele.warehouse_id, ele.subUnit_id)
                                                        // }} href="#!" className="text-danger">
                                                //             <i className="fas fa-trash fa-2x" />
                                                //         </a>
                                                //     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                                 <div className="card shadow-lg p-3 mb-5 bg-white rounded">
//                                     <div className="card-body">
//                                     <h6>Total Payable Amount:{tempSum}</h6>
//                                         <button type="button" className="btn btn-warning btn-block btn-lg" onClick={checkOut}>
//                                             Proceed to Pay
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </>
