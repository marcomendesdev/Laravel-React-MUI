import React, { useEffect, useState } from "react";
import MediaCard from "./Card";
import axiosClient from "../axiosClient";
import Grid from "@mui/material/Grid";

export default function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosClient.get("/items").then(({ items }) => {
            console.log(items);
            setItems(items);
        });
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {items.map((item) => (
                    <Grid item key={item.id} xs={12} md={4}>
                        <MediaCard
                            name={item.name}
                            description={item.description}
                            image="https://picsum.photos/200/300"
                            showActions={false}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
