import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import { useEffect, useState } from "react";
import { apiUrl } from "../partials/Http";
import LatestTestimonials from "../partials/LatestTestimonials";
import Team from "../partials/Team";
const About = () => {
  const [testimonials, setTestimonials] = useState([]);
  const fetchLatestTestimonials = async () => {
    const res = await fetch(apiUrl + "get-testomanials", {
      method: "GET",
    });

    const result = await res.json();
    console.log(result);
    setTestimonials(result.data);
  };
  useEffect(() => {
    fetchLatestTestimonials();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Welcome Amazing Constructions"
          heading="About Us"
          text="We provide top-notch construction 
                  services to bring"
        />

        <Team />
        <LatestTestimonials />
      </main>
      <Footer />
    </>
  );
};

export default About;
