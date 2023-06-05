import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export default function Update({id}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        padding: "24px",
    };

    const formFieldStyle = {
        marginBottom: "1rem",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "4px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    };

    const buttonStyle = {
        display: "block",
        width: "100%",
        padding: "12px",
        borderRadius: "4px",
        border: "none",
        background: "#4caf50",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axiosClient.put(`/update-item/${id}`, formData);
        console.log('Data', formData);
        console.log("Response", response);
        navigate("/dashboard/items");
    };

    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <h1>AddItem</h1>
                        <div style={style}>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={{ ...formFieldStyle, ...inputStyle }}
                                    required
                                />
                                <label htmlFor="description">
                                    Description:
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={{ ...formFieldStyle, ...inputStyle }}
                                    required
                                />
                                <label htmlFor="price">Price:</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    style={{ ...formFieldStyle, ...inputStyle }}
                                    required
                                />
                                <label htmlFor="image">Image URL:</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    style={{ ...formFieldStyle, ...inputStyle }}
                                    required
                                />
                                <button type="submit" style={buttonStyle}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
