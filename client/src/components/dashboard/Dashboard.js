import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {trelloURL, toDoList, doneList, doingList} from "../../trelloURL";
import {trelloKey, trelloToken} from "../../trelloProfileInfo"
//import jwt_decode from "jwt-decode"

import { logoutUser } from "../../actions/authActions";
import { List, ListItem, makeStyles, GridList } from "@material-ui/core";

class Dashboard extends Component {
    state = {
        toDo: {},
        doing: {},
        done: {},
    }
    
    componentDidMount(){
        let toDo = {}
        let doing = {}
        let done = {}
        axios
        .get(trelloURL +  "lists/" + toDoList + "cards?" + "key=" + trelloKey + "&" + "token=" + trelloToken + "&response_type=token")
        .then((res) => {toDo = res.data ; console.log(toDo); this.setState(done);});

        axios
        .get(trelloURL +  "lists/" + doingList + "cards?" + "key=" + trelloKey + "&" + "token=" + trelloToken + "&response_type=token")
        .then((res1) => {doing = res1.data ; console.log(doing); this.setState(doing);});

        axios
        .get(trelloURL +  "lists/" + doneList + "cards?" + "key=" + trelloKey + "&" + "token=" + trelloToken + "&response_type=token")
        .then((res2) => {done = res2.data ; console.log(done); this.setState(done);});

    }
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
        //const elements = ;
        /*.catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        )*/;
        /*axios
        .get(trelloURL + '/api/users/register', userData)
        .then((res) => history.push("/login"))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        ); 
        axios
        .get(baseURL + '/api/users/register', userData)
        .then((res) => history.push("/login"))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );*/

        return (
            <div
                style={{ height: "40vh" }}
                className="container valign-wrapper"
            >
               <GridList cols={3} spacing={400} padding={80}>
                    <ListItem>
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
                    </ListItem>
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
{/* <ListItem style = {this.classes.innerContainer}>
                        {elements.map((value, index) => {
                            return (
                                <ListItem className='input-field col s12'>
                                    <ProfileCard user={value} window={window} />
                                </ListItem>
                            )
                        })}
                    </ListItem> */}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
