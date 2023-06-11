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
    const [file, setFile] = useState(null);

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
        formData.append("image", file);
        await axiosClient.post(`/update-item/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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
            type: "file",
            label: "Image",
            name: "image",
            onChange: (e) => setFile(e.target.files[0]),
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
                    
                    <ReusableForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        submitButtonText="Submit"
                        formName="Edit Item"
                        fields={fields}
                    />
                </Box>
            </Modal>
        </>
    );
}