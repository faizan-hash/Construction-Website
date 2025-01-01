import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import React, { useState } from "react";
import { useEffect } from "react";
import { apiUrl, token } from "../../partials/Http";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Show = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        const res = await fetch(apiUrl + "articles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
        });
        const result = await res.json();
        setArticles(result.articles);
    };
    const deleteArticle = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Article?")) {
            return;
        }

        try {
            const res = await fetch(apiUrl + "articles/" + id, {
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
                setArticles((prevArticles) =>
                    prevArticles.filter((article) => article.id !== id)
                );
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error deleting article:", error); // Log any errors
            toast.error("Failed to delete article");
        }
    };
    useEffect(() => {
        fetchArticles();
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
                                        <h6 className="mb-4">Articles Table</h6>
                                        <Link
                                            to="/admin/articles/create"
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
                                                    <th scope="col"> Name</th>
                                                    <th scope="col">Slug</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {articles &&
                                                    articles.map((article) => {
                                                        return (
                                                            <tr key={`article-${article.id}`}>
                                                                <td>{article.id}</td>
                                                                <td>{article.title}</td>
                                                                <td>{article.slug}</td>
                                                                <td>{article.status}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/articles/edit/${article.id}`}
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Update
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        onClick={() => deleteArticle(article.id)} // Pass the service id here
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