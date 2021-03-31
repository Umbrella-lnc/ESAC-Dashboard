import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import jwt_decode from "jwt-decode"

import { logoutUser } from "../../actions/authActions";
import { List, ListItem, makeStyles, GridList } from "@material-ui/core";

class Dashboard extends Component {
    classes = makeStyles({
        mainContainer: {
            display: 'flex',
            flexDirection: 'row',
            background: 'red',
            padding: 100,
        },
        innerContainer: {
            diplay: 'flex',
            flexDirection: 'column',
            background: 'blue',
            margin: '100px 100px 100px 100px',
        },
        header:{
            border: 'solid #000',
            width: '100px',
            background: 'red',
            color: 'blue',
            borderWidth: '0 1px',
        }
    })

    render() {
        const { user } = this.props.auth;
        //const token = localStorage.getItem("jwtToken");
        //const user = jwt_decode(token)

        return (
            <div
                style={{ height: "40vh" }}
                className="container valign-wrapper"
            >
               <GridList cols={3} spacing={'400'} padding={80}>
                    <ListItem style>
                        <List style={this.classes.innerContainer}>
                            <ListItem style = {this.classes.header}>
                            To do
                            </ListItem>
                            <ListItem>
                            11
                            </ListItem>
                            <ListItem>
                            12
                            </ListItem>
                        </List>
                    </ListItem>
                        <List style={this.classes.innerContainer}>
                            <ListItem>
                            Doing
                            </ListItem>
                            <ListItem>
                            21
                            </ListItem>
                            <ListItem>
                            22
                            </ListItem>
                        </List>
                    <ListItem>
                        <List style={this.classes.innerContainer}>
                            <ListItem>
                            Done
                            </ListItem>
                            <ListItem>
                            31
                            </ListItem>
                            <ListItem>
                            32
                            </ListItem>
                        </List>
                    </ListItem>
               </GridList>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
