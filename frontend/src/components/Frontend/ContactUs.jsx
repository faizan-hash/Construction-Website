import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import Hero from "../partials/Hero";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl } from "../partials/Http";
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(apiUrl + 'contact-now', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
    if (result.status == "true") {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Welcome Amazing Constructions"
          heading="Contact Us"
          text="We provide top-notch construction services to bring"
        />
        <section className="section-9 py-5">
          <div className="container">
            <div className="section-header text-center">
              <h2>Contact Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-md-3">
                <div className="card shadow border-0 mb-3">
                  <div className="card-body">
                    <h3>Call Us</h3>
                    <div>
                      <a href="#">(8888888)</a>
                    </div>
                    <div>
                      <a href="#">(5555555)</a>
                    </div>
                    <h3 className="mt-4">You Can Write Us</h3>
                    <div>
                      <a href="#">(admin@gmail.com)</a>
                    </div>
                    <div>
                      <a href="#">(user@gmail.com)</a>
                    </div>
                    <h3 className="mt-4">Address</h3>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        {...register("name", { required: true })}
                      />
                      {errors.name && <span className="text-danger">Name is required</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email", { required: true })}
                      />
                      {errors.email && <span className="text-danger">Email is required</span>}
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && <span className="text-danger">Phone is required</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject"
                      {...register("subject", { required: true })}
                    />
                    {errors.subject && <span className="text-danger">Subject is required</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter Message"
                      {...register("message", { required: true })}
                    />
                    {errors.message && <span className="text-danger">Message is required</span>}
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
