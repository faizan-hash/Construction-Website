import React from "react";

const Hero = ({ preHeading, heading, text }) => {
  return (
    <section className="section-7">
      <div className="hero-section d-flex align-items-center">
        <div className="container-fluid ">
          <div className="text-left">
            <p>{preHeading}</p>
            <h2>{heading}</h2>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
