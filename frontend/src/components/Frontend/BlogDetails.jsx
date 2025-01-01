import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import { useParams } from "react-router-dom";
import { FileUrl, apiUrl, token } from "../partials/Http";
import { Link } from "react-router-dom";

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [articles, setArticles] = useState([]); // Ensure articles is initialized as an empty array
    const params = useParams();

    const fetchBlogDetails = async () => {
        try {
            const res = await fetch(`${apiUrl}articles/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });
            const result = await res.json();
            if (result.status === "true") {
                setBlog(result.data);
            } else {
                console.error("Blog not found:", result.message);
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
        }
    };

    const fetchAllArticles = async () => {
        try {
            const res = await fetch(`${apiUrl}get-latest-articles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token()}`,
                },
            });
            const result = await res.json();
            if (result.status === "true") {
                setArticles(result.data || []); // Ensure articles is always an array
            } else {
                console.error("Error fetching articles:", result.message);
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        fetchBlogDetails();
        fetchAllArticles();
    }, [params.id]);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Hero
                    preHeading="Blog Insights"
                    heading={blog?.title || "Blog Details"}
                    text=""
                />

                {/* Blog Details Section */}
                <section className="blog-details-section py-5">
                    <div className="container">
                        <div className="row">
                            {/* Main Blog Content */}
                            <div className="col-md-8">
                                {blog ? (
                                    <>
                                        <img
                                            src={`${FileUrl}uploads/articles/large/${blog.image}`}
                                            alt={blog.title}
                                            className=" w-100 img-fluid rounded shadow mb-4 " style={{ height: "600px" }}
                                        />
                                        <h2 className="mb-3">{blog.title}</h2>
                                        <p> By:<strong>{blog.Author} </strong>On {blog.created_at}
                                        </p>
                                        <p
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                            className="text-muted"
                                        ></p>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <p>Loading blog details...</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar with Articles */}
                            <div className="col-md-4">
                                <div className="card shadow border-0 p-3">
                                    <h4 className="mb-3">Latest Articles</h4>
                                    <ul className="list-unstyled">
                                        {articles?.length > 0 ? ( // Ensure articles is defined before accessing its length
                                            articles
                                                .filter((article) => article.id !== blog?.id) // Exclude current blog
                                                .map((article) => (
                                                    <li key={article.id} className="mb-3">
                                                        <Link
                                                            to={`/blog/${article.id}`}
                                                            className="text-decoration-none"
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <img
                                                                    src={`${FileUrl}uploads/articles/small/${article.image}`}
                                                                    alt={article.title}
                                                                    className="img-fluid rounded shadow me-2"
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                                <span className="text-primary">
                                                                    {article.title}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))
                                        ) : (
                                            <p>No articles available</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BlogDetails;
