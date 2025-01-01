import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { apiUrl, token, FileUrl } from "../../partials/Http";
import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Edit = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [member, setMember] = useState("");

    const [isDisable, setisDisable] = useState(false);
    const [imageId, setimageId] = useState(null);
    const params = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + "members/" + params.id, {
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
            setMember(result.data);

            return {
                name: result.data.name,
                job_title: result.data.job_title,
                linkedin_url: result.data.linkedin_url,
                status: result.data.status,


            };
        },
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const newData = { ...data, imageId: imageId };
        const res = await fetch(apiUrl + "members/" + params.id, {
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
            navigate("/admin/members");
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
            <div className="content">
                <Container style={{ maxWidth: "800px" }} className="mt-2">
                    <div className="d-flex justify-content-between">
                        <h2 className="mt-3">Update Member</h2>
                        <Link to="/admin/projects" className="btn btn-primary">
                            Back
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        {...register("name", { required: "Name is required" })}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        type="job_title"
                                        {...register("job_title", { required: "job_title is required" })}
                                        isInvalid={!!errors.job_title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.job_title?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Linkedin Url</Form.Label>
                                    <Form.Control
                                        type="linkedin_url"
                                        {...register("linkedin_url", { required: "linkedin_url is required" })}
                                        isInvalid={!!errors.linkedin_url}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.linkedin_url?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" onChange={handleFile} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    {member.image && (
                                        <img
                                            src={
                                                FileUrl +
                                                "uploads/members/small/" +
                                                member.image
                                            }
                                            alt="Project" style={{ width: "100px", height: "100px" }}
                                        />
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        {...register("status", { required: "Status is required" })}
                                        isInvalid={!!errors.status}
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Blocked</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isDisable}
                            className="mb-5"
                        >
                            Update Member
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    );
}

export default Edit