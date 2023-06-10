import React, { useState } from "react";
import * as Yup from "yup";
import axiosClient from "../axiosClient";
import ReusableForm from "./ReusableForm";
import { useStateContext } from "../contexts/Context";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
    const { user } = useStateContext();
    const { id } = user;
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const initialValues = {
        name: "",
        description: "",
        price: "",
    };      

    const validationSchema = Yup.object({});

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("image", image);
        formData.append("user_id", id);

        console.log("Form Data", formData);

        const response = await axiosClient.post(`/add-new-item/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

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
            type: "file",
            label: "Image",
            name: "image",
            onChange: (event) => setImage(event.target.files[0]),
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
