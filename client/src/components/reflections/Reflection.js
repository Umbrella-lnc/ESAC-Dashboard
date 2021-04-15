import { Grid, Card, CardContent, Typography, Button, Link } from "@material-ui/core";
import React, { Component } from "react";
import ReflectionMenu from "./ReflectionMenu";
import Comments from "./Comments";
import axios from "axios";
import baseURL from "../../baseURL";
import { makeStyles } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";

const Reflection = (props) => {
    const {
        reflection,
        user,
        deleteReflection,
        submitComment,
        toggleStatus,
    } = props;
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

    const useStyles = makeStyles((theme) => ({
        Complete: {
            color: green["A700"],
        },
        Incomplete: {
            color: pink["A400"],
        },
    }));

    const classes = useStyles();

    return (
        <Grid item xs={12} key={reflection._id}>
            <Card>
                <CardContent
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        style={{
                            textDecoration: "underline",
                            position: "absolute",
                        }}
                    >
                        {reflection.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        date={new Date(reflection.date)}
                        style={{ marginLeft: "auto" }}
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
                        toggleStatus={toggleStatus}
                    />
                </CardContent>
                <div
                    className="status-container"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        marginTop: "-10px",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        className={
                            reflection.status === "Complete"
                                ? classes.Complete
                                : classes.Incomplete
                        }
                    >
                        {reflection.status}
                    </Typography>
                </div>
                <CardContent>
                    <Typography>
                        <Link href={reflection.link} target="_blank" rel="noopener">
                            Click here to complete reflection on Google Forms
                        </Link>
                    </Typography>
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
