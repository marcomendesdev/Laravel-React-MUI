import React from "react";
import * as Yup from "yup";
import axiosClient from "../axiosClient";
import ReusableForm from "./ReusableForm";
import { useStateContext } from "../contexts/Context";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
    const { user } = useStateContext();
    const { id } = user;
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        description: "",
        price: "",
        image: "",
        user_id: id,
    };

    const validationSchema = Yup.object({});

    const onSubmit = async (values) => {
        console.log("Values", values);
        const response = await axiosClient.post(`/add-new-item/${id}`, values);
        console.log("Response", response);
        navigate("/dashboard/items");
    };

    const fields = [
        {
            type: "text",
            label: "Name",
            name: "name",
            placeholder: "Name",
        },
        {
            type: "text",
            label: "Description",
            name: "description",
            placeholder: "Description",
        },
        {
            type: "text",
            label: "Price",
            name: "price",
            placeholder: "Price",
        },
        {
            type: "text",
            label: "Image",
            name: "image",
            placeholder: "Image URL",
        },
    ];

    return (
        <ReusableForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText="Submit"
            formName="Add Item"
            fields={fields}
        />
    );
}
