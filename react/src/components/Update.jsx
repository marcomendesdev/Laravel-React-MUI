import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axiosClient from "../axiosClient";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ReusableForm from "./ReusableForm";

export default function Update({ id }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialValues = {
        name: "",
        description: "",
        price: "",
        image: "",
    };

    const validationSchema = Yup.object({});

    const onSubmit = async (values) => {
        console.log("Values", values);
        const response = await axiosClient.put(`/update-item/${id}`, values);
        console.log("Response", response);
        setOpen(false);
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
        <>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        margin: "auto",
                        width: 600,
                    }}
                >
                    <h1>Edit Item</h1>
                    <ReusableForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        submitButtonText="Submit"
                        formName="Add Item"
                        fields={fields}
                    />
                </Box>
            </Modal>
        </>
    );
}
