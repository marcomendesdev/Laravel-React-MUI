import React from "react";
import { Formik, Form, useField } from "formik";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
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

const AddItem = () => {
    const { user } = useStateContext();
    const navigate = useNavigate();

    return (
        <>
            <h1>Add Item</h1>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    price: "",
                    image: "",
                    user_id: user.id,
                }}
               
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const response = await axiosClient.post(
                            `/add-new-item/${user.id}`,
                            values
                        );
                        navigate("/dashboard/my-items");
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
                    <button type="submit" style={{backgroundColor: '#1976d2', color: '#fff'}}>Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default AddItem;


