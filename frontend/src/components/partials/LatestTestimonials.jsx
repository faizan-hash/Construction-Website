import React from 'react'
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import AvatarImg from "../../assets/images/author-2.jpg";
import { useEffect, useState } from "react";
import { FileUrl, apiUrl } from "../partials/Http";
const LatestTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const fetchLatestTestimonials = async () => {
        const res = await fetch(apiUrl + "get-latest-testimonials?limit=4", {
            method: "GET",
        });

        const result = await res.json();
        setTestimonials(result.data);
    };
    useEffect(() => {
        fetchLatestTestimonials();
    }, []);
    return (
        <section className="section-5 py-5">
            <div className="container py-5">
                <div className="section-header text-center">
                    <span>Testimonials</span>
                    <h3>What Our Clients Say</h3>
                    <p>
                        We value our clients' feedback and strive to exceed their
                        expectations in every project we undertake.
                    </p>
                </div>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={50}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1, // 1 slide on small screens
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2, // 2 slides on medium screens
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3, // 3 slides on larger screens
                            spaceBetween: 40,
                        },
                    }}
                >
                    {testimonials &&
                        testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="card shadow border-0">
                                    <div className="card-body p-4">
                                        <div className="content">
                                            <div className="rating py-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-star-fill"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p>{testimonial.testimonial}</p>
                                            <hr />
                                            <div>
                                                <img
                                                    src={`${FileUrl}uploads/testimonials/small/${testimonial.image}`}
                                                    alt="Card image"
                                                    width={60}
                                                />
                                            </div>
                                            <h5>{testimonial.citation}</h5>
                                            <p>{testimonial.desigination}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>

            </div>
        </section>)
}

export default LatestTestimonials