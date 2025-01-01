import React from "react";
import Card from "react-bootstrap/Card";
import { apiUrl } from "./Http";
import { useEffect, useState } from "react";
import { FileUrl } from "../partials/Http";
import { Link } from "react-router-dom";

const LatestProjects = () => {
    const [projects, setProjects] = useState([]);
    const fetchLatestProjects = async () => {
        const res = await fetch(apiUrl + "get-latest-projects?limit=4", {
            method: "GET",
        });

        const result = await res.json();
        setProjects(result.data);
    };
    useEffect(() => {
        fetchLatestProjects();
    }, []);
    return (
        <section className="section-3 py-5">
            <div className="container-fluid py-5">
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
                                <div className="col-md-3 col-lg-3 " key={project.id}>
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
                                            </Link>                                         </Card.ImgOverlay>
                                    </Card>
                                </div>
                            );
                        })}

                </div>
            </div>
        </section>)
}

export default LatestProjects