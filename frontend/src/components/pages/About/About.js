import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="container py-2">
          <h1
            className="text-primary text-uppercase mb-3"
            style={{ letterSpacing: 5 }}
          >
            About Us
          </h1>
          <div className="row my-5 align-items-center flex-column-reverse  flex-lg-row">
            <div className="col-lg-6 text-center">
              <img
                className="w-75 rounded my-4 my-lg-0"
                height={280}
                src="/images/warehouse_animated.jpg"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <div className="text-left mb-4">
                <h2>Introduction</h2>
              </div>
              <p>
              Welcome to our warehouse, a one-stop solution for all your storage and logistical needs. Our state-of-the-art facility is equipped with the latest technology and a highly trained team to ensure the safety and security of your goods.
              </p>
              <div className="text-center">
              <Link
                to=""
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Learn More
              </Link>
              </div>
            </div>
          </div>
          <div className="row my-5 align-items-center">
            <div className="col-lg-6">
              <div className="text-left mb-4">
                <h2>Services</h2>
              </div>
              <p>
                <ol>
                    <li>
                    Climate-controlled storage: Our temperature and humidity-controlled units provide the perfect environment for storing delicate items such as artwork, electronics, and medical supplies.
                    </li>
                    <li>
                    Inventory management: We offer real-time tracking and reporting of your inventory to help you stay on top of your supply chain.
                    </li>
                    <li>
                    Fulfillment services: Our team can handle order fulfillment, shipping, and returns, allowing you to focus on your core business.
                    </li>
                    <li>
                    Loading and unloading: Our dock doors and loading bays make it easy for you to receive and ship goods.
                    </li>
                </ol>
              </p>
              <div className="text-center">
              <Link
                to=""
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Learn More
              </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                className="w-75 rounded my-4 my-lg-0"
                height={280}
                src="/images/services_animated.jpeg"
                alt=""
              />
            </div>
          </div>
          <div className="row my-5 align-items-center flex-column-reverse  flex-lg-row">
            <div className="col-lg-6 text-center">
              <img
                className="w-75 rounded my-4 my-lg-0"
                height={280}
                src="/images/security_animated.jpeg"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <div className="text-left mb-4">
                <h2>Security</h2>
              </div>
              <p>
              Security is our top priority. Our facility is monitored 24/7 by security cameras and staffed by a highly trained security team. Access to the warehouse is strictly controlled, and all goods are insured for your peace of mind.
              </p>
              <div className="text-center">
              <Link
                to=""
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Learn More
              </Link>
              </div>
            </div>
          </div>
          <div className="row my-5 align-items-center">
            <div className="col-lg-6">
              <div className="text-left mb-4">
                <h2>Location</h2>
              </div>
              <p>
              Our warehouse is conveniently located near major transportation hubs, making it easy for you to receive and ship goods.
              </p>
              <div className="text-center">
              <Link
                to=""
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Learn More
              </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                className="w-75 rounded my-4 my-lg-0"
                height={280}
                src="/images/location_animated.png"
                alt=""
              />
            </div>
          </div>
          <div className="row my-5 align-items-center flex-column-reverse  flex-lg-row">
            <div className="col-lg-6 text-center">
              <img
                className="w-75 rounded my-4 my-lg-0"
                height={280}
                src="/images/contactus_animated.png"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <div className="text-left mb-4">
                <h2>Contact Us</h2>
              </div>
              <p>
              For more information or to schedule a tour of our facility, please don't hesitate to contact us. Our team is ready to answer any questions and help you find the best solution for your storage and logistical needs.
              </p>
              <div className="text-center">
              <Link
                to=""
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Learn More
              </Link>
              </div>
            </div>
          </div>
          <div className="row my-5 align-items-center">
            <div className="col-lg-6">
              <div className="text-left mb-4">
                <h2>Testimonials</h2>
              </div>
              <p>
              See what our satisfied customers have to say about our services and the peace of mind they have gained by using our facility.
              </p>
              <div className="text-center">
              <Link
                to=""
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Learn More
              </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                className="w-75 rounded my-4 my-lg-0"
                height={280}
                src="/images/testimonial_animated.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
