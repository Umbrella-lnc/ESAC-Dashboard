import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import React, { Component } from "react";
import ReflectionMenu from "./ReflectionMenu";
import Comments from "./Comments";

const Reflection = (props) => {
    const { reflection, user, deleteReflection } = props;
    const [showComments, setShowComments] = React.useState(false);

    return (
        <Grid item xs={12} key={reflection._id}>
            <Card>
                <CardContent
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        style={{
                            textDecoration: "underline",
                            marginRight: "0",
                            marginLeft: "auto",
                        }}
                    >
                        {reflection.title}
                    </Typography>

                    <Typography
                        variant="caption"
                        date={new Date(reflection.date)}
                        style={{
                            marginRight: "0",
                            marginLeft: "auto",
                        }}
                    >
                        {new Date(reflection.date).toDateString()}
                    </Typography>
                    <ReflectionMenu
                        user={user}
                        deletePost={deleteReflection}
                        id={reflection._id}
                        showComments={showComments}
                        setShowComments={setShowComments}
                    />
                    <Typography
                        variant="subtitle1"
                        color={
                            reflection.status === "Complete"
                                ? "primary"
                                : "secondary"
                        }
                    >
                        {reflection.status}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h6">{reflection.post}</Typography>
                </CardContent>
                {showComments && (
                    <Comments
                        user={user}
                        id={reflection._id}
                        comments={reflection.comments}
                    />
                )}
            </Card>
        </Grid>
    );
};

export default Reflection;
