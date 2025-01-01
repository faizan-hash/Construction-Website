import React from 'react';
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FileUrl, apiUrl, token } from "../partials/Http";
import LatestTestimonials from '../partials/LatestTestimonials';

const ProjectDetails = () => {
    const [project, setProject] = useState(null); // Use null to handle loading state
    const params = useParams();

    const fetchProjectDetails = async () => {
        try {
            const res = await fetch(`${apiUrl}projects/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();
            if (result.status === 'true') {
                setProject(result.data);
            } else {
                console.error("Project not found:", result.message);
            }
        } catch (error) {
            console.error("Error fetching Project details:", error);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, []);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Hero
                    preHeading="Welcome Amazing Constructions"
                    heading={project?.title || "Project Details"}
                    text=""
                />

                {/* Service Details Section */}
                <section className="service-details-section py-5">
                    <div className="container">
                        {project ? (
                            <div className="row">
                                {/* Main Content */}
                                <div className="col-md-8">
                                    {/* Project Image */}
                                    <img
                                        src={`${FileUrl}uploads/projects/large/${project.image}`}
                                        alt={project.title}
                                        className="img-fluid rounded shadow mb-4"
                                    />

                                    {/* Project Content */}
                                    <h2 className="mb-3">{project.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: project.content }} className="text-muted"></p>
                                    <p>{project.description}</p>
                                </div>

                                {/* Insights Sidebar */}
                                <div className="col-md-4">
                                    <div className="card shadow border-0 p-3">
                                        <h4 className="mb-3">Project Insights</h4>
                                        <ul className="list-unstyled">
                                            <li>
                                                <strong>Sector:</strong> {project.sector || "N/A"}
                                            </li>
                                            <li>
                                                <strong>Location:</strong> {project.location || "N/A"}
                                            </li>
                                            <li>
                                                <strong>Construction Type:</strong> {project.construction_type || "N/A"}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p>Loading project details...</p>
                            </div>
                        )}
                    </div>
                </section>

                <LatestTestimonials />
            </main>
            <Footer />
        </>
    );
}

export default ProjectDetails;
