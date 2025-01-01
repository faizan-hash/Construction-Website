import React, { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
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
const Edit = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [article, setArticle] = useState("");

    const [isDisable, setisDisable] = useState(false);
    const [imageId, setimageId] = useState(null);
    const params = useParams();

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || "",
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
            const res = await fetch(apiUrl + "articles/" + params.id, {
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
            setArticle(result.data);

            return {
                title: result.data.title,
                slug: result.data.slug,
                content: result.data.content,
                status: result.data.status,
                author: result.data.Author,


            };
        },
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const newData = { ...data, content: content, imageId: imageId };
        // data.content = content;
        const res = await fetch(apiUrl + "articles/" + params.id, {
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
            navigate("/admin/articles");
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
                        <h2 className="mt-3">Update Article</h2>
                        <Link to="/admin/articles" className="btn btn-primary">
                            Back
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register("title", { required: "Title is required" })}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register("slug", { required: "Slug is required" })}
                                        isInvalid={!!errors.slug}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.slug?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Content</Form.Label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        tabIndex={1}
                                        onBlur={(newContent) => setContent(newContent)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register("author", {
                                            required: "Author is required",
                                        })}
                                        isInvalid={!!errors.author}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.author?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" onChange={handleFile} />
                                </Form.Group>
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
                            <Col md={6}>
                                <div className="mb-3">
                                    {article.image && (
                                        <img
                                            src={
                                                FileUrl +
                                                "uploads/articles/small/" +
                                                article.image
                                            }
                                            alt="Article"
                                        />
                                    )}
                                </div>
                            </Col>
                        </Row>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isDisable}
                            className="mb-5"
                        >
                            Update Article
                        </Button>
                    </Form>
                </Container>
            </div>
        </>)
}

export default Edit