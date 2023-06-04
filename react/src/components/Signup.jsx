import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "../styles.css";
import "../styles-custom.css";
import axiosClient from "../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/Context";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const Password = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="password-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const SignupForm = () => {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    return (
        <>
            <h1>Sign up</h1>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email addresss`")
                        .required("Required"),
                    password: Yup.string()
                        .min(8, "Must be 8 characters or more")
                        .required("Required"),
                    password_confirmation: Yup.string()
                        .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                        )
                        .required("Required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const { user, token } = await axiosClient.post(
                            "/signup",
                            values
                        );
                        console.log("Resp.Data", user);
                        console.log("Response", token);
                        setUser(user);
                        setToken(token);
                        navigate("/dashboard/items");
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
                    <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Jane"
                    />
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <Password
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="********"
                    />
                    <Password
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        placeholder="********"
                    />
                    <br />
                    <button type="submit">Submit</button>
                    <br />
                    <p>
                        Already registered? &nbsp;
                        <Link to="/login">Log in</Link>
                    </p>
                </Form>
            </Formik>
        </>
    );
};

export default SignupForm;
