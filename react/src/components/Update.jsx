import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";

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

const Update = ({ id }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            price: "",
                            image: "",
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const response = await axiosClient
                                    .put(`/update-item/${id}`, values)
                                    .then(() => navigate("/dashboard/items"));
                                console.log("Response", response);
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
                                placeholder="Name"
                            />

                            <MyTextInput
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Description"
                            />

                            <MyTextInput
                                label="Price"
                                name="price"
                                type="text"
                                placeholder="Price"
                            />

                            <MyTextInput
                                label="Image"
                                name="image"
                                type="text"
                                placeholder="Image URL"
                            />

                            <br />
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#1976d2",
                                    color: "#fff",
                                }}
                            >
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
};

export default Update;


