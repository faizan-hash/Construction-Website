import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../partials/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import React, { useState, useRef, useMemo } from "react";
const Create = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [isDisable, setisDisable] = useState(false);
    const [imageId, setimageId] = useState(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || "Content",
        }),
        [placeholder]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Use setValue from react-hook-form
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = { ...data, imageId: imageId };
        const res = await fetch(apiUrl + "testimonials", {
            method: "POST",
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
                                        <h6 className="mb-4">Create Testimonials</h6>
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
                                                        <h6 className="mb-4">Add Testimonials</h6>

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
                                                            Create Testimonial
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
        </>);
}

export default Create