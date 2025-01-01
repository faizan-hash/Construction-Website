import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { apiUrl } from "./Http";
import { useEffect, useState } from "react";
import { FileUrl } from "../partials/Http";
import { Link } from "react-router-dom";
const LatestServices = () => {
  const [services, setServices] = useState([]);
  const fetchLatestServices = async () => {
    const res = await fetch(apiUrl + "get-latest-services?limit=4", {
      method: "GET",
    });

    const result = await res.json();
    setServices(result.data);
  };
  useEffect(() => {
    fetchLatestServices();
  }, []);
  return (
    <section className="section-3 py-5">
      <div className="container-fluid py-5">
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
          {services &&
            services.map((service) => {
              return (
                <div className="col-md-3 col-lg-3 " key={service.id}>
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
                      </Link>                    </Card.ImgOverlay>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default LatestServices;
