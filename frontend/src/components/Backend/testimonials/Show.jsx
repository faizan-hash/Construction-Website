import React, { useState } from "react";
import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import { useEffect } from "react";
import { apiUrl, token } from "../../partials/Http";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Show = () => {
    const [testimonials, setTestimonials] = useState([]);
    const fetchTestimonials = async () => {
        const res = await fetch(apiUrl + "testimonials", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
        });
        const result = await res.json();
        setTestimonials(result.testimonial);
        console.log(result);
    };
    const deleteTestimonials = async (id) => {
        if (!window.confirm("Are you sure you want to delete this testimonials?")) {
            return;
        }

        try {
            const res = await fetch(apiUrl + "testimonials/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });
            const result = await res.json();
            console.log("Delete result:", result); // Log the response from the delete API

            if (result.status === "true") {
                // Filter out the deleted service from the state
                setTestimonials((prevTestimonials) =>
                    prevTestimonials.filter((testimonial) => testimonial.id !== id)
                );
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error deleting testimonials:", error); // Log any errors
            toast.error("Failed to delete testimonials");
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);
    return (
        <>
            <Head />
            <Sidebar />
            <main>
                <div className="content">
                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-4">Testimonials Table</h6>
                                        <Link
                                            to="/admin/testimonials/create"
                                            className="btn btn-primary"
                                        >
                                            Create
                                        </Link>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Testimonial</th>
                                                    <th scope="col">Citation</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {testimonials &&
                                                    testimonials.map((testimonial) => {
                                                        return (
                                                            <tr key={`testimonial-${testimonial.id}`}>
                                                                <td>{testimonial.id}</td>
                                                                <td>{testimonial.testimonial}</td>
                                                                <td>{testimonial.citation}</td>
                                                                <td>{testimonial.status}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/testimonials/edit/${testimonial.id}`}
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Update
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        onClick={() => deleteTestimonials(testimonial.id)} // Pass the service id here
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Delete
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>)
}

export default Show