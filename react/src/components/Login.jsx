import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
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

const LoginForm = () => {
    const { setToken, setUser } = useStateContext();
    const navigate = useNavigate();

    return (
        <>
            <h1>Log in</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Invalid email addresss`")
                        .required("Required"),
                    password: Yup.string()
                        .min(8, "Must be 8 characters or more")
                        .required("Required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const { user, token } = await axiosClient.post(
                            "login",
                            values
                        );
                        setToken(token);
                        setUser(user);
                        navigate("/dashboard/items");
                        console.log("User", user);
                        console.log("Token", token);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
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

                    <br />
                    <button type="submit">Submit</button>
                    <br />
                    <p>
                        Not registered yet? &nbsp;
                        <Link to="/signup">Sign up</Link>
                    </p>
                </Form>
            </Formik>
        </>
    );
};

export default LoginForm;
