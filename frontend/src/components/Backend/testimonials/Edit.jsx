import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { apiUrl, token, FileUrl } from "../../partials/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [testimonial, setTestimonial] = useState("");

    const [isDisable, setisDisable] = useState(false);
    const [imageId, setimageId] = useState(null);
    const params = useParams();



    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Use setValue from react-hook-form
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + "testimonials/" + params.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });

            const result = await res.json();
            console.log(result);
            setContent(result.data.content);
            setTestimonial(result.data);

            return {
                testimonial: result.data.testimonial,
                citation: result.data.citation,
                desigination: result.data.desigination,
                status: result.data.status,
            };
        },
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const newData = { ...data, imageId: imageId };
        data.content = content; // Add content from editor to the form data

        const res = await fetch(apiUrl + "testimonials/" + params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
            body: JSON.stringify(newData),
        });

        const result = await res.json();
        console.log(result);

        if (result.status === "true") {
            toast.success(result.message);
            navigate("/admin/testimonials");
        } else {
            toast.error(result.message);
        }
    };
    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        setisDisable(true);

        await fetch(apiUrl + "temp-images", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
            body: formData,
        })
            .then((Response) => Response.json())
            .then((result) => {
                setisDisable(false);

                if (result.status == false) {
                    toast.error(result.error.image[1]);
                } else {
                    setimageId(result.data.id);
                }
            });
    };
    return (
        <>
            <Head />
            <Sidebar />
            <main>
                <div className="content">
                    <div className="container pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-4">Update Testimonials</h6>
                                        <Link to="/admin/testimonials" className="btn btn-primary">
                                            Back
                                        </Link>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="container-fluid pt-4 px-4">
                                            <div className="row g-4">
                                                <div className="col-sm-12 col-xl-6">
                                                    <div className="bg-light rounded h-100 p-4">
                                                        <h6 className="mb-4">Update Testimonials</h6>

                                                        {/* Title Field */}
                                                        <div className="mb-3">
                                                            <label htmlFor="testimonial" className="form-label">
                                                                Testimonial
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="testimonial"
                                                                {...register("testimonial", {
                                                                    required: "Testimonial is required",
                                                                })}
                                                            />
                                                            {errors.testimonial && (
                                                                <div className="text-danger">
                                                                    {errors.testimonial.message}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="desigination" className="form-label">
                                                                Desigination
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="desigination"
                                                                {...register("desigination", {
                                                                    required: "Desigination is required",
                                                                })}
                                                            />
                                                            {errors.desigination && (
                                                                <div className="text-danger">
                                                                    {errors.desigination.message}
                                                                </div>
                                                            )}
                                                        </div>


                                                        {/* Slug Field */}
                                                        <div className="mb-3">
                                                            <label htmlFor="citation" className="form-label">
                                                                Citation
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="citation"
                                                                {...register("citation", {
                                                                    required: "Citation is required",
                                                                })}
                                                            />
                                                            {errors.citation && (
                                                                <div className="text-danger">
                                                                    {errors.citation.message}
                                                                </div>
                                                            )}
                                                        </div>


                                                        <div className="mb-3">
                                                            <input onChange={handleFile} type="file" />
                                                            <div className="mb-3">
                                                                {testimonial.image && (
                                                                    <img
                                                                        src={
                                                                            FileUrl +
                                                                            "uploads/testimonials/small/" +
                                                                            testimonial.image
                                                                        }
                                                                        alt="Project" style={{ width: "100px", height: "100px" }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Status Field */}
                                                        <div className="mb-3">
                                                            <label htmlFor="status" className="form-label">
                                                                Status
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                id="image"
                                                                {...register("status", {
                                                                    required: "status is required",
                                                                })}
                                                            >
                                                                <option value="1">Active</option>
                                                                <option value="0">Blocked</option>
                                                            </select>
                                                            {errors.status && (
                                                                <div className="text-danger">
                                                                    {errors.status.message}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <button
                                                            disabled={isDisable}
                                                            type="submit"
                                                            className="btn btn-primary"
                                                        >
                                                            Update Testimonial
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>)
}

export default Edit