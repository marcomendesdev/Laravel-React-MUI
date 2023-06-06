import React, { useEffect, useState } from "react";
import MediaCard from "./Card";
import axiosClient from "../axiosClient";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

export default function Items() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    const fetchItems = (page) => {
        axiosClient.get(`/items?page=${page}`).then(({ data }) => {
            const { data: itemsData, last_page: totalPages } = data; // Access data property from response
            setItems(itemsData);
            setTotalPages(totalPages);
        });
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>Items</h1>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
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
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </div>
    );
}
