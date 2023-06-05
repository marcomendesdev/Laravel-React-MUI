import React from "react";
import { Formik, Form, useField } from "formik";
import { Link, useNavigate } from "react-router-dom";
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

const Password = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="password-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default function ReusableForm({
    initialValues,
    validationSchema,
    onSubmit,
    submitButtonText,
    additionalText,
    additionalLink,
    fields,
    formName,
    linkName,
}) {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    return (
        <>
            <h1>{formName}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const { user, token } = await onSubmit(values);
                        setUser(user);
                        setToken(token);
                        navigate("/dashboard/items");
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
                    {fields.map((field, index) => {
                        const { type, label, name, placeholder, ...props } =
                            field;
                        if (type === "text" || type === "email") {
                            return (
                                <MyTextInput
                                    key={index}
                                    label={label}
                                    {...props}
                                    name={name}
                                    placeholder={placeholder}
                                    type={type}
                                />
                            );
                        } else if (type === "password") {
                            return (
                                <Password
                                    key={index}
                                    label={label}
                                    {...props}
                                    name={name}
                                    placeholder={placeholder}
                                    type={type}
                                />
                            );
                        }
                        return null; // Ignore unsupported field types
                    })}
                    <br />
                    {additionalText ? (
                        <button type="submit">{submitButtonText}</button>
                    ) : (
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                            }}
                        >
                            {submitButtonText}
                        </button>
                    )}

                    <br />
                    {additionalText && (
                        <p>
                            {additionalText}&nbsp;
                            {additionalLink && (
                                <Link to={additionalLink}>{linkName}</Link>
                            )}
                        </p>
                    )}
                </Form>
            </Formik>
        </>
    );
}
