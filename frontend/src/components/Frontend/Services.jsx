import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { FileUrl, apiUrl } from "../partials/Http";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const fetchAllServices = async () => {
    const res = await fetch(apiUrl + "get-services", {
      method: "GET",
    });

    const result = await res.json();
    console.log(result);
    setServices(result.data);
  };
  useEffect(() => {
    fetchAllServices();
  }, []);
  return (
    <>
      <Header />
      <Hero
        preHeading="Services We Provide"
        heading="Services We Provide"
        text="We provide top-notch construction
                  services to bring"
      />
      <section className="section-3 py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>What We Offer</h2>
            <p>
              Our services are designed to meet the unique needs of each client.
              We offer a wide range of construction services to bring your dream
              projects to life.
            </p>
          </div>
          <div className="row pt-4">
            <div className="row pt-4">
              {services &&
                services.map((service) => {
                  return (
                    <div className="col-md-4 col-lg-4" key={service.id}>
                      <Card className="text-white">
                        <Card.Img
                          src={`${FileUrl}uploads/services/small/${service.image}`}
                          alt="Card image"
                        />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                          <Card.Title>{service.title}</Card.Title>
                          <Card.Text>{service.short_desc}</Card.Text>
                          <Link to={`/service/${service.id}`} className="btn btn-primary">
                            Read More
                          </Link>                           </Card.ImgOverlay>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
