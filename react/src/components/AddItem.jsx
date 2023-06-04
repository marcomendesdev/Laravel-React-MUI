import { useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/Context";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
    const { user } = useStateContext();

    const navigate = useNavigate();

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

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        user_id: user.id,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosClient.post(
                `/add-new-item/${user.id}`,
                formData
            );
            console.log("Data", formData);
            console.log("Response", response);
            console.log("User", user);
            navigate("/dashboard/items");
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
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
                    <label htmlFor="description">Description:</label>
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
    );
}
