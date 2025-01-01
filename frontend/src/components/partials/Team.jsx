import React from 'react'
import { FileUrl, apiUrl } from "../partials/Http";
import { useEffect, useState } from "react";
import { FaLinkedin } from 'react-icons/fa';
const Team = () => {
    const [members, setMembers] = useState([]);
    const fetchLatestMembers = async () => {
        const res = await fetch(apiUrl + "get-members", {
            method: "GET",
        });

        const result = await res.json();
        console.log(result);
        setMembers(result.data);
    };
    useEffect(() => {
        fetchLatestMembers();
    }, []);
    return (
        <section className="section-8 ">
            <div className="container">
                <div className="section header text-center">
                    <span>Our Story</span>
                    <h2>Our Team</h2>
                    <p>
                        {" "}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                        nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </p>
                </div>
                <div className="row pt-3" >
                    {
                        members && members.map(member => {
                            return (
                                <div className="col-md-3" key={member.id}>
                                    <div className="card shadow border-0">
                                        <div className="image">
                                            <img src={`${FileUrl}uploads/members/small/${member.image}`}
                                                alt="Card image"
                                                width={60} />
                                        </div>
                                        <div className="card-body ">
                                            <div className="content ">
                                                <h5>{member.name}</h5>
                                            </div>
                                            <div className="sub-content">
                                                <p>
                                                    {member.job_title}
                                                </p>
                                            </div>
                                            {member.linkedin_url && (
                                                <a
                                                    href={member.linkedin_url.startsWith("http") ? member.linkedin_url : `https://${member.linkedin_url}`}
                                                    className="text-decoration-none text-primary"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaLinkedin size={16} className="me-2" />
                                                    LinkedIn
                                                </a>
                                            )}


                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </section>)
}

export default Team