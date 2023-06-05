import React from "react";
import * as Yup from "yup";
import axiosClient from "../axiosClient";
import ReusableForm from "./ReusableForm";

export default function LoginForm() {
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
    });

    const onSubmit = async (values) => {
        const { user, token } = await axiosClient.post("/login", values);
        console.log("Resp.Data", user);
        console.log("Response", token);
        return { user, token };
    };

    const fields = [
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
    ];

    return (
        <ReusableForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText="Submit"
            additionalText="Not registered yet?"
            additionalLink="/signup"
            fields={fields}
            formName="Log in"
            linkName="Sign up"
        />
    );
}
