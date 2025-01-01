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
    const newData = { ...data, content: content, imageId: imageId };
    const res = await fetch(apiUrl + "services", {
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
      navigate("/admin/services");
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
                    <h6 className="mb-4">Create Services</h6>
                    <Link to="/admin/services" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-fluid pt-4 px-4">
                      <div className="row g-4">
                        <div className="col-sm-12 col-xl-6">
                          <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">Add Services</h6>

                            {/* Title Field */}
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">
                                Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                {...register("title", {
                                  required: "Title is required",
                                })}
                              />
                              {errors.title && (
                                <div className="text-danger">
                                  {errors.title.message}
                                </div>
                              )}
                            </div>

                            {/* Slug Field */}
                            <div className="mb-3">
                              <label htmlFor="slug" className="form-label">
                                Slug
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="slug"
                                {...register("slug", {
                                  required: "Slug is required",
                                })}
                              />
                              {errors.slug && (
                                <div className="text-danger">
                                  {errors.slug.message}
                                </div>
                              )}
                            </div>

                            {/* Short Description Field */}
                            <div className="mb-3">
                              <label
                                htmlFor="shortDescription"
                                className="form-label"
                              >
                                Short Description
                              </label>
                              <textarea
                                className="form-control"
                                id="shortDescription"
                                {...register("short_desc", {
                                  required: "Short description is required",
                                })}
                              />
                              {errors.shortDescription && (
                                <div className="text-danger">
                                  {errors.shortDescription.message}
                                </div>
                              )}
                            </div>

                            {/* Content Field */}
                            <div className="mb-3">
                              <label htmlFor="content" className="form-label">
                                Content
                              </label>
                              <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
                            </div>
                            {/* Image Field */}

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
                              Create Service
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
    </>
  );
};

export default Create;
