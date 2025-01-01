import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Hero from "../partials/Hero";
import { useEffect, useState } from "react";
import { FileUrl, apiUrl } from "../partials/Http";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const fetchLatestArticles = async () => {
    const res = await fetch(apiUrl + "get-articles", {
      method: "GET",
    });

    const result = await res.json();
    console.log(result);
    setArticles(result.data);
  };
  useEffect(() => {
    fetchLatestArticles();
  }, []);
  return (
    <>
      <Header />
      <Hero
        preHeading="Services We Provide"
        heading="Blogs"
        text="We provide top-notch construction
                  services to bring"
      />
      <section className="section-6 py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Blogs&News</span>
            <h3>Articles & Blog Posts</h3>
            <p>
              We value our clients' feedback and strive to exceed their
              expectations in every project we undertake.
            </p>
          </div>
          <div className="row pt-3">
            {articles &&
              articles.map((article) => (
                <div className="col-md-4 mb-4" key={article.id}>
                  <Card className="text-white">
                    <Card.Img
                      src={`${FileUrl}uploads/articles/small/${article.image}`}
                      alt={article.title}
                    />
                    <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Text>{article.short_desc}</Card.Text>
                      <Link to={`/blog/${article.id}`} className="btn btn-primary">
                        Read More
                      </Link>                      </Card.ImgOverlay>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;
