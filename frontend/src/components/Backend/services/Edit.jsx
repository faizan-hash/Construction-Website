import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";

import JoditEditor from "jodit-react";
import { apiUrl, token, FileUrl } from "../../partials/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [service, setService] = useState("");

  const [isDisable, setisDisable] = useState(false);
  const [imageId, setimageId] = useState(null);
  const params = useParams();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "content",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Use setValue from react-hook-form
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + "services/" + params.id, {
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
      setService(result.data);

      return {
        title: result.data.title,
        slug: result.data.slug,
        content: result.data.content,
        status: result.data.status,
        short_desc: result.data.short_desc,
      };
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const newData = { ...data, content: content, imageId: imageId };
    data.content = content; // Add content from editor to the form data

    const res = await fetch(apiUrl + "services/" + params.id, {
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
          <div className="container-fluid pt-4 px-4">
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
                                onBlur={(newContent) => {
                                  setContent(newContent);
                                  setValue("content", newContent); // Set content in the form field
                                }}
                              />
                              {errors.content && (
                                <div className="text-danger">
                                  {errors.content.message}
                                </div>
                              )}
                            </div>
                            {/* Image Field */}

                            <div className="mb-3">
                              <input onChange={handleFile} type="file" />
                              {service.image && (
                                <img
                                  src={
                                    FileUrl +
                                    "uploads/services/small/" +
                                    service.image
                                  }
                                  alt="Service"
                                />
                              )}
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
                              Update Service
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

export default Edit;
