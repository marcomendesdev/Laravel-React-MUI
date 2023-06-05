import React from "react";
import * as Yup from "yup";
import axiosClient from "../axiosClient";
import ReusableForm from "./ReusableForm";

export default function SignupForm() {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    });

    const onSubmit = async (values) => {
        const { user, token } = await axiosClient.post("/signup", values);
        console.log("Resp.Data", user);
        console.log("Response", token);
        return { user, token };
    };

    const fields = [
        {
            type: "text",
            label: "Name",
            name: "name",
            placeholder: "Jane",
        },
        {
            type: "email",
            label: "Email Address",
            name: "email",
            placeholder: "jane@formik.com",
        },
        {
            type: "password",
            label: "Password",
            name: "password",
            placeholder: "********",
        },
        {
            type: "password",
            label: "Confirm Password",
            name: "password_confirmation",
            placeholder: "********",
        },
    ];

    return (
        <ReusableForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText="Submit"
            additionalText="Already registered?"
            additionalLink="/login"
            fields={fields}
            formName="Sign up"
            linkName="Log in"
        />
    );
}
