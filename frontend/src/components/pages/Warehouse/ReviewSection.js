import React from "react";
import { Container, Row, Col, Form, Button, ProgressBar, FloatingLabel } from 'react-bootstrap';
import RatingBar from "./RattingBar";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import axios from "axios";
import "./progressReviewBar.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import ReviewForm from "./ReviewForm";
import { BsPencilSquare } from "react-icons/bs";

const ReviewSection = () =>
{
    const location = useLocation();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false)
    const [reload, setReload] = useState(false)
    const[reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const[star,setStar]=useState(0);
    const[allStar,setAllStar]=useState([]);
    const id = location.state;
    useEffect(() => {
          fetchData(id);
          fetchUser();
      }, [reload]);

    useEffect(() => {
        calculate(reviews);
    }, [reviews]);
    useEffect(() => {
        const usertoken = localStorage.getItem("token");
        fetchUser(usertoken);
    }, []);

      const fetchData = async (id) => {
        try {
          const res = await axios.post("/getReview", { warehouse_id : id, user_id: userId });
          setReviews(res.data.data);
          setHasReviewed(res.data.hasUserReviewed);
        } catch (err) {
          console.log("Error in fetching reviews" + err);
        }
      }; 

      const calculate = (reviews) => {
        let s =0;
        let arr =[0,0,0,0,0,0];
        for(let i=0;i<reviews.length;i++)
        {
           arr[reviews[i].stars] += 1;
           s += reviews[i].stars;
        }
        s = (s/reviews.length).toFixed(1);
        for(let i=1;i<=5;i++)
        {
            arr[i] = ((arr[i] * 100)/reviews.length).toFixed(2);
        }
        setStar(s);
        setAllStar(arr);
      }

    const canWrite = async (userId, id) => {
        try {
          const res = await axios.post("/canWriteReview", { warehouse_id : id, user_id : userId });
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }; 
    const fetchUser = async (usertoken) => {
        const res = await axios.get("/getUser", {
            headers: { "x-auth-token": usertoken },
        });
        setUserId(res.data._id);
    }  
    const switchForm = async()=>
    {
        if(!showForm)
        {
          if(!userId) navigate("/login");
          const data = await canWrite(userId, id);
          if(data.message == true)
          { 
            setShowForm(prev=>!prev)
            setReload(prev=>!prev)
          }
          else   alert("You are not authorized to comment on this warehouse");
       }
       else
       {
        setShowForm(prev=>!prev)
        setReload(prev=>!prev)
       }  
    }
    const reviewBar = (review) =>
    {
        return (
            <div className="jumbotron my-5 shadow p-3 mb-5 bg-white rounded">
               <div className="Customer-name">
                    <h4 className="text-primary">{ review.name }</h4>
                    <h6><RatingBar fill={review.stars} /> &nbsp; { review.star }</h6>
               </div>
               <div className="review-duration">
                    <h5 className="review-date">{ new Date(review.createdAt).toLocaleDateString() }</h5>
               </div>
               <hr></hr>
               <div>
                    <p>
                        { review.comment }
                    </p>
               </div>
            </div>
        );
    }

    const Comments = (reviews)=>
    {
        console.log(reviews);
        return (
                <Col lg={ 8 } md={ 8 } sm={ 12 } xs={ 12 }>
                    <Form.Label>Sort By:</Form.Label>
                    <Form.Select size="sm">
                        <option>Top Reviews</option>
                        <option>Most Recent</option>
                    </Form.Select>
                    { reviews? reviews.reviews.map((review) => {return reviewBar(review)}) : null  }
                </Col>
        )
    }

    return (
        <>
            <Container fluid>
                <Form>
                    <Row>
                        <Col lg={ 4 } className="my-3">
                            <h3>Customer reviews</h3>
                            <h6><RatingBar fill={star} /> &nbsp; { star } out of 5</h6>
                            <Row>
                                <Col className="text-center float-left" md={ 3 } sm={ 3 } xs={ 3 }><h6>5 Star</h6></Col>
                                <Col><ProgressBar now={ allStar[5] } label={ `${ allStar[5] }%` } className=" progressReviewBar" variant="warning" /></Col>
                            </Row>
                            <Row>
                                <Col className="text-center float-left" md={ 3 } sm={ 3 } xs={ 3 }><h6>4 Star</h6></Col>
                                <Col><ProgressBar now={ allStar[4] } label={ `${ allStar[4] }%` } className=" progressReviewBar" variant="warning" /></Col>
                            </Row>
                            <Row>
                                <Col className="text-center float-left" md={ 3 } sm={ 3 } xs={ 3 }><h6>3 Star</h6></Col>
                                <Col className="text-dark"><ProgressBar now={ allStar[3] } label={ `${ allStar[3] }%` } className=" progressReviewBar" variant="warning" /></Col>
                            </Row>
                            <Row>
                                <Col className="text-center float-left" md={ 3 } sm={ 3 } xs={ 3 }><h6>2 Star</h6></Col>
                                <Col><ProgressBar now={ allStar[2] } label={ `${ allStar[2] }%` } className=" progressReviewBar" variant="warning" /></Col>
                            </Row>
                            <Row>
                                <Col className="text-center float-left" md={ 3 } sm={ 3 } xs={ 3 }><h6>1 Star</h6></Col>
                                <Col><ProgressBar now={ allStar[1] } label={ `${ allStar[1] }%` } className=" progressReviewBar" variant="warning" /></Col>
                            </Row>
                            <hr />
                            <div className="container" style={{height: "100px"}}>
                                { <Button onClick={ switchForm } type="button" varient="primary" style={{ margin: "auto" }}> { showForm ? " " : <BsPencilSquare/> } &nbsp; { showForm ? "View Comments" : hasReviewed ? null : "Write a Review" } </Button>}
                            </div>
                        </Col>

                        {showForm ? <ReviewForm warehouse_id={id} user_id={userId} switchForm={switchForm}/> : <Comments reviews={reviews}/>}
                    </Row>
                </Form>
            </Container>
        </>
    );
}
export default ReviewSection;
