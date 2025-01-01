import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import React, { useState } from "react";
import { useEffect } from "react";
import { apiUrl, token } from "../../partials/Http";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Show = () => {
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const res = await fetch(apiUrl + "members", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token()}`,
            },
        });
        const result = await res.json();
        setMembers(result.members);
    };
    const deleteMember = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) {
            return;
        }

        try {
            const res = await fetch(apiUrl + "members/" + id, {
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
                setMembers((prevMembers) =>
                    prevMembers.filter((member) => member.id !== id)
                );
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error deleting member:", error); // Log any errors
            toast.error("Failed to delete member");
        }
    };
    useEffect(() => {
        fetchMembers();
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
                                        <h6 className="mb-4">Member Table</h6>
                                        <Link
                                            to="/admin/members/create"
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
                                                    <th scope="col">Job_Tile</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {members &&
                                                    members.map((member) => {
                                                        return (
                                                            <tr key={`member-${member.id}`}>
                                                                <td>{member.id}</td>
                                                                <td>{member.name}</td>
                                                                <td>{member.job_title}</td>
                                                                <td>{member.status}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/members/edit/${member.id}`}
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Update
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        onClick={() => deleteMember(member.id)} // Pass the service id here
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