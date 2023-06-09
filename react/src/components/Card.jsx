import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Update from "./Update";

export default function MediaCard({
    name,
    description,
    image,
    showActions,
    deleteItem,
    id
}) {
    return (
        <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia sx={{ height: 140 }} image={image} title={name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {showActions && (
                <div>
                    <CardActions> 
                        <Update id={id} />
                        <Button size="small" onClick={deleteItem}>
                            Delete
                        </Button>
                    </CardActions>
                    
                </div>
            )}
        </Card>
    );
}
