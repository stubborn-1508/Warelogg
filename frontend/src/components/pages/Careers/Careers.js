import React from "react";

const Careers = () => {
  return (
    <>
      <div className="container-fluid py-5"
      style={{backgroundImage:"url(/images/background-careers-image.jpg)",marginTop:"-2rem",marginBottom:"-6rem"}}
      >
        <div className="container py-5" 
        >
          <div className="text-center mb-5">
            <h1
              className="text-primary text-uppercase"
              style={{ letterSpacing: 5 }}
            >
              Welcome to Our Careers Page!
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="owl-carousel testimonial-carousel">
                <div className="text-center my-2">
                  <h5 className="font-weight-normal mb-4">
                    At Warelogg, we believe that our employees are the backbone
                    of our success and drive towards achieving our mission.
                    That's why we're always on the lookout for talented,
                    passionate individuals to join our team. We offer a dynamic
                    and inclusive work environment where creativity, innovation,
                    and collaboration are fostered. Our employees have the
                    opportunity to make a meaningful impact and grow both
                    personally and professionally.
                  </h5>
                </div>
                <div className="text-center my-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4" />
                  <h2 className="mb-2">Our Culture</h2>
                  <h5 className="font-weight-normal mb-4">
                    At Warelogg, we believe in creating a positive, supportive,
                    and inclusive workplace culture that empowers our employees
                    to do their best work. We value diversity and actively work
                    towards creating a workplace that represents the communities
                    we serve. We offer a flexible and innovative work
                    environment, as well as a comprehensive benefits package
                    that includes [list of benefits].
                  </h5>
                </div>
                <div className="text-center my-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4" />
                  <h2 className="mb-2">How to Apply</h2>
                  <h5 className="font-weight-normal mb-4">
                    If you're interested in joining our team, please submit your
                    resume and cover letter to warelogg@gmail.com. We appreciate your interest in Warelogg and look forward to hearing from you!
                  </h5>
                </div>
                <div className="text-center my-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4" />
                  <h2 className="mb-2">Why Work at Warelogg?</h2>
                  <h5 className="font-weight-normal mb-4 d-flex flex-column align-items-center">
                    <ol className="text-left">
                        <li>Dynamic and inclusive work environment</li>
                        <li>Room for professional growth and development</li>
                        <li>Comprehensive benefits package</li>
                        <li>Supportive and positive workplace culture</li>
                    </ol>
                  </h5>
                </div>
              </div>
            </div>
            <h2>Join us in our mission to Warelogg. We look forward to hearing from you!</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
