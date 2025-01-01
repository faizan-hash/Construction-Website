import React, { useEffect } from "react";
import { apiUrl } from "../partials/Http";
import AboutImg from "../../assets/images/about-us.jpg";
import BlogImg from "../../assets/images/construction3.jpg";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import Icon3 from "../../assets/images/icon-3.svg";
import AvatarImg from "../../assets/images/author-2.jpg";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useState } from "react";
import LatestServices from "../partials/LatestServices";
import LatestProjects from "../partials/LatestProjects";
import LatestArticles from "../partials/LatestArticles";
import LatestTestimonials from "../partials/LatestTestimonials";

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="section-1">
          <div className="hero-section d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <p>Welcome Amazing Constructions</p>
                <h2>Home Page</h2>
                <p>
                  We provide top-notch construction services to bring your dream
                  projects to life.
                </p>
                <a className="btn btn-primary">Contact Now</a>
                <a className="btn btn-secondary ms-2">View Projects</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-2 py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6">
                <img src={AboutImg} alt="About Us" className="img-fluid" />
              </div>
              <div className="col-md-6 py-4">
                <h2>About Us</h2>
                <p>
                  We are a leading construction company with years of experience
                  in delivering high-quality projects. Our team of experts is
                  dedicated to ensuring customer satisfaction and excellence in
                  every project we undertake.
                </p>
              </div>
            </div>
          </div>
        </section>

        <LatestServices />

        <section className="section-4 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Why Choose Us </span>
              <h3>International Projects</h3>
              <p>
                Our services are designed to meet the unique needs of each
                client. We offer a wide range of construction services to bring
                your dream projects to life.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <img src={Icon1} alt="Icon 1" />
                    <h5>Quality Construction</h5>
                    <p>
                      Our team of experts is dedicated to delivering
                      high-quality construction services to our clients.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <img src={Icon2} alt="Icon 2" />
                    <h5>Quality Construction</h5>
                    <p>
                      Our team of experts is dedicated to delivering
                      high-quality construction services to our clients.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <img src={Icon3} alt="Icon 3" />
                    <h5>Quality Construction</h5>
                    <p>
                      Our team of experts is dedicated to delivering
                      high-quality construction services to our clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LatestProjects />

        <LatestTestimonials />
        <LatestArticles />
      </main>
      <Footer />
    </>
  );
}

export default Home;
