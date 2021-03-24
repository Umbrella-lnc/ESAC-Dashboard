import React, { Component } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import baseURL from "../../baseURL";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import { makePost } from "../../actions/reflectionActions";

class Reflections extends Component {
    state = {
        reflections: [],
    };

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        const user = jwt_decode(token);

        if (user.accessLevel === "administrator") {
            axios
                .get(baseURL + "/api/reflections/getAllReflections")
                .then((res) => {
                    // Debug
                    console.log(baseURL + "/api/reflections/getAllReflections");
                    this.setState({ reflections: res.data });
                });
        } else {
            axios
                .get(baseURL + "/api/reflections/getDepartmentReflections")
                .then((res) => {
                    // Debug
                    console.log(
                        baseURL + "/api/reflections/getDepartmentReflections"
                    );
                    this.setState({ reflections: res.data });
                });
        }
    }

    render() {
        if (!this.state.reflections) {
            return null;
        }

        const makePostRequest = () => {
            makePost({
                title: "NEW",
                department: "Mechanical and Aerospace Engineering (MAE)",
            });
        };

        return (
            <div
                className="container valign-wrapper"
                style={{ marginTop: "100px" }}
            >
                <Grid
                    container
                    spacing={3}
                    //direction="column"
                    //alignItems="center"
                    //justify="center"
                >
                    {this.state.reflections.map((reflection) => {
                        return (
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h4">
                                            {reflection.title}
                                        </Typography>
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
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <div
                    className="add-reflection"
                    style={{ position: "fixed", bottom: "5vh", right: "5vw" }}
                >
                    <Fab color="secondary" aria-label="edit">
                        <EditIcon onClick={makePostRequest} />
                    </Fab>
                </div>
            </div>
        );
    }
}

Reflections.propTypes = {};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default Reflections;
