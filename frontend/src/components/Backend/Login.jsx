import React, { useContext } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Card, Form, Button, Container, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Backend/context/Auth";

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:8000/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status == false) {
      toast.error(result.message);
    } else {
      const userInfo = {
        token: result.token,
        id: result.id,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      login(userInfo);
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      <Header />
      <main>
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Card style={{ width: "100%", maxWidth: "500px" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="exampleInputEmail1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email format",
                      },
                    })}
                    aria-describedby="emailHelp"
                    className={errors.email ? "is-invalid" : ""}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleInputPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    className={errors.password ? "is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Login;
