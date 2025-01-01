import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Frontend/Home";
import About from "./components/Frontend/About";
import Services from "./components/Frontend/Services";
import "./assets/css/style.scss";
import Projects from "./components/Frontend/Projects";
import Blogs from "./components/Frontend/Blogs";
import ContactUs from "./components/Frontend/ContactUs";
import Login from "./components/backend/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Backend/Dashboard";
import RequireAuth from "./components/partials/RequireAuth";
import { default as ShowServices } from "./components/Backend/services/Show";
import { default as CreateServices } from "./components/Backend/services/Create";
import { default as EditServices } from "./components/Backend/services/Edit";
import { default as ShowProjects } from "./components/Backend/projects/Show";
import { default as CreateProjects } from "./components/Backend/projects/Create";
import { default as EditProjects } from "./components/Backend/projects/Edit";
import { default as ShowArtilcles } from "./components/Backend/articles/Show";
import { default as CreateArtilcles } from "./components/Backend/articles/Create";
import { default as EditArtilcles } from "./components/Backend/articles/Edit";
import { default as ShowTestimonials } from "./components/Backend/testimonials/Show";
import { default as CreateTestimonials } from "./components/Backend/testimonials/Create";
import { default as EditTestimonials } from "./components/Backend/testimonials/Edit";
import { default as ShowMembers } from "./components/Backend/members/Show";
import { default as CreateMembers } from "./components/Backend/members/Create";
import { default as EditMembers } from "./components/Backend/members/Edit";
import ServiceDetails from "./components/Frontend/ServiceDetails";
import ProjectDetails from "./components/Frontend/ProjectDetails";
import BlogDetails from "./components/Frontend/BlogDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/services/create"
            element={
              <RequireAuth>
                <CreateServices />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/services"
            element={
              <RequireAuth>
                <ShowServices />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/services/edit/:id"
            element={
              <RequireAuth>
                <EditServices />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <RequireAuth>
                <ShowProjects />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects/create"
            element={
              <RequireAuth>
                <CreateProjects />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects/edit/:id"
            element={
              <RequireAuth>
                <EditProjects />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <RequireAuth>
                <ShowArtilcles />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/articles/create"
            element={
              <RequireAuth>
                <CreateArtilcles />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/articles/edit/:id"
            element={
              <RequireAuth>
                <EditArtilcles />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <RequireAuth>
                <ShowTestimonials />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimonials/create"
            element={
              <RequireAuth>
                <CreateTestimonials />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimonials/edit/:id"
            element={
              <RequireAuth>
                <EditTestimonials />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/members"
            element={
              <RequireAuth>
                <ShowMembers />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/members/create"
            element={
              <RequireAuth>
                <CreateMembers />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/members/edit/:id"
            element={
              <RequireAuth>
                <EditMembers />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
