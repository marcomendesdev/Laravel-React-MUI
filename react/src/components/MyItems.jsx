import React, { useEffect, useState } from "react";
import Card from "./Card";
import axiosClient from "../axiosClient";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function Items() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get("/user-all-items").then(({ items }) => {
            console.log("resp", items);
            setItems(items);
        });
    }, []);

    return (
        <>
            <div>
                <h1>My Items</h1>
                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {items &&
                        items.map((item) => (
                            <Grid item key={item.id} xs={12} md={4}>
                                <Card
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    image="https://picsum.photos/200/300"
                                    showActions={true}
                                    deleteItem={async (id) => {
                                        const response =
                                            await axiosClient.delete(
                                                `/delete-item/${item.id}`
                                            );
                                        console.log("delete", response);
                                        setItems(
                                            items.filter(
                                                (item) => item.id !== id
                                            )
                                        );
                                        navigate("/dashboard/items");
                                    }}
                                />
                            </Grid>
                        ))}
                </Grid>
            </div>
        </>
    );
}
