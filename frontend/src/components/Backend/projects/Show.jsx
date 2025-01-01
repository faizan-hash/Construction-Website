import Head from "../../partials/Head";
import Sidebar from "../../partials/Sidebar";
import React, { useState } from "react";
import { useEffect } from "react";
import { apiUrl, token } from "../../partials/Http";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Show = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await fetch(apiUrl + "projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setProjects(result.projects);
  };
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const res = await fetch(apiUrl + "projects/" + id, {
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
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error); // Log any errors
      toast.error("Failed to delete project");
    }
  };
  useEffect(() => {
    fetchProjects();
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
                    <h6 className="mb-4">Projects Table</h6>
                    <Link
                      to="/admin/projects/create"
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
                        {projects &&
                          projects.map((project) => {
                            return (
                              <tr key={`project-${project.id}`}>
                                <td>{project.id}</td>
                                <td>{project.title}</td>
                                <td>{project.slug}</td>
                                <td>{projects.status}</td>
                                <td>
                                  <Link
                                    to={`/admin/projects/edit/${project.id}`}
                                    className="btn btn-primary"
                                  >
                                    Update
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    onClick={() => deleteProject(project.id)} // Pass the service id here
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
    </>
  );
};

export default Show;
