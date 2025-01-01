import React from "react";
import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import Head from "../partials/Head";
const Dashboard = () => {
  return (
    <>
      <main>
        <Head />
        <Sidebar />
        <Navbar />
      </main>
    </>
  );
};

export default Dashboard;
