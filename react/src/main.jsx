import React from "react";
import ReactDOM from "react-dom/client";
import './styles-custom.css';
import './styles.css';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./contexts/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
);
