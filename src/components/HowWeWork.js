import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HowWeWork.css';

const HowWeWork = () => {
  return (
    <section className="how-we-work container my-4" id='services'>
      <h2>How We Work</h2>
      <h3 className="work-description">
        Our streamlined preproduction process ensures the highest quality materials,
        meeting both market demands and regulatory standards with precision and efficiency.
      </h3>

      <div className="row">
        <div className="col-12 col-md-4 mb-3">
          <div className="card1">
            <div className="header">
              <div className="image">
                <img src="kitchen.jpg" alt="Identify the problem" />
              </div>
            </div>
            <div className="info">
              <span className="title">Identify the problem</span>
              <p className="description">We start by analyzing the problem and gathering requirements.</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 mb-3">
          <div className="card1">
            <div className="header">
              <div className="image">
                <img src="th.jpeg" alt="Design a solution" />
              </div>
            </div>
            <div className="info">
              <span className="title">Design a solution</span>
              <p className="description">Next, we design a custom solution that addresses the issue at hand.</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 mb-3">
          <div className="card1">
            <div className="header">
              <div className="image">
                <img src="153084695.webp" alt="Execute and deliver" />
              </div>
            </div>
            <div className="info">
              <span className="title">Execute and deliver</span>
              <p className="description">We implement the solution and deliver the final product to the client.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
