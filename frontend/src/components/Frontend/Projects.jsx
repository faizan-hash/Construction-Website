import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import Card from "react-bootstrap/Card";
import { FileUrl, apiUrl } from "../partials/Http";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const fetchAllProjects = async () => {
    const res = await fetch(apiUrl + "get-projects", {
      method: "GET",
    });

    const result = await res.json();
    console.log(result);
    setProjects(result.data);
  };
  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Services We Provide"
          heading="Our Projects"
          text="We provide top-notch construction
                  services to bring"
        />
        <section className="section-3 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Our Projects</span>
              <h3>Pakistan Projects</h3>
              <p>
                Our services are designed to meet the unique needs of each
                client. We offer a wide range of construction services to bring
                your dream projects to life.
              </p>
            </div>
            <div className="row pt-4">
              {projects &&
                projects.map((project) => {
                  return (
                    <div className="col-md-4 col-lg-4" key={project.id}>
                      <Card className="text-white">
                        <Card.Img
                          src={`${FileUrl}uploads/projects/small/${project.image}`}
                          alt="Card image"
                        />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                          <Card.Title>{project.title}</Card.Title>
                          <Card.Text>{project.short_desc}</Card.Text>
                          <Link to={`/project/${project.id}`} className="btn btn-primary">
                            Read More
                          </Link>                           </Card.ImgOverlay>
                      </Card>
                    </div>
                  );
                })}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Projects;
