import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import React, { Component } from "react";
import ReflectionMenu from "./ReflectionMenu";
import Comments from "./Comments";
import axios from "axios";
import baseURL from "../../baseURL";

const Reflection = (props) => {
    const { reflection, user, deleteReflection, submitComment } = props;
    const [showComments, setShowComments] = React.useState(false);

    const [usernames, setUsernames] = React.useState({});

    const getNames = () => {
        axios
            .get(baseURL + "/api/usersManagement/getAllNamesWithID")
            .then((res) => {
                setUsernames(res.data);
                return res.data;
            })
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        setUsernames(getNames());
    }, []);

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
                        submitComment={submitComment}
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

                <Button
                    style={{
                        backgroundColor: "transparent",
                        color: "gray",
                        marginLeft: "auto",
                        marginRight: "25px",
                        display: "flex",
                    }}
                    onClick={() => {
                        setShowComments(!showComments);
                    }}
                >
                    {showComments ? "Hide Comments" : "Show Comments"}
                </Button>

                {showComments && (
                    <Comments
                        user={user}
                        id={reflection._id}
                        comments={reflection.comments}
                        submitComment={submitComment}
                        usernames={usernames}
                    />
                )}
            </Card>
        </Grid>
    );
};

export default Reflection;
