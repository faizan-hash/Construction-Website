import React from 'react';
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FileUrl, apiUrl, token } from "../partials/Http";
import LatestTestimonials from '../partials/LatestTestimonials';

const ServiceDetails = () => {
    const [service, setService] = useState(null); // Use null to handle loading state
    const params = useParams();

    const fetchServiceDetails = async () => {
        try {
            const res = await fetch(`${apiUrl}services/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();
            if (result.status === 'true') {
                setService(result.data);
            } else {
                console.error("Service not found:", result.message);
            }
        } catch (error) {
            console.error("Error fetching service details:", error);
        }
    };

    useEffect(() => {
        fetchServiceDetails();
    }, []);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Hero
                    preHeading="Welcome Amazing Constructions"
                    heading={service?.title || "Service Details"}
                    text=""
                />

                {/* Service Details Section */}
                <section className="service-details-section py-5">
                    <div className="container">
                        {service ? (
                            <div className="row">
                                {/* Service Image */}
                                <div className="col-md-12">
                                    <img
                                        src={`${FileUrl}uploads/services/large/${service.image}`}
                                        alt={service.title}
                                        className="img-fluid rounded shadow w-100"
                                    />
                                </div>

                                {/* Service Content */}
                                <div className="col-md-12">
                                    <h2 className="mb-3">{service.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: service.content }} className="text-muted"></p>
                                    <p>{service.description}</p>
                                </div>
                            </div>

                        ) : (
                            <div className="text-center">
                                <p>Loading service details...</p>
                            </div>
                        )}
                    </div>
                </section>

                <LatestTestimonials />
            </main>
            <Footer />
        </>
    );
};

export default ServiceDetails;
