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
import { ListAlt } from "@material-ui/icons";
import TrelloCard from "../reusable-components/TrelloCard";
import { ConnectionStates } from "mongoose";
import ColumnLabel from "../reusable-components/ColumnLabel";

class Dashboard extends Component {
    state = {
        toDo:[],
        doing: [],
        done: [],
    }
    
    componentDidMount(){
        axios
        .get(trelloURL +  "lists/" + toDoList + "cards?" + "key=" + trelloKey + "&" + "token=" + trelloToken + "&response_type=token")
        .then((res) => {const toDo = res.data ; console.log(toDo); this.setState({ toDo });});

        axios
        .get(trelloURL +  "lists/" + doingList + "cards?" + "key=" + trelloKey + "&" + "token=" + trelloToken + "&response_type=token")
        .then((res1) => {const doing = res1.data ;  this.setState({doing});});

        axios
        .get(trelloURL +  "lists/" + doneList + "cards?" + "key=" + trelloKey + "&" + "token=" + trelloToken + "&response_type=token")
        .then((res2) => {const done = res2.data ; this.setState({done});});

    }
    classes = makeStyles({
        mainContainer: {
            display: 'flex',
            flexDirection: 'row',
            background: 'red',
            padding: 100,
            alignContent: 'flex-start',
        },
        innerContainer: {
            diplay: 'flex',
            flexDirection: 'column',
            background: 'blue',
            margin: '100px 100px 100px 100px',
            alignItems: 'flex-start',
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
        const toDoHeader = {name: 'To Do'}
        const doingHeader = {name: 'Doing'}
        const doneHeader = {name: 'Done'}

        return (
               <GridList cols={3} spacing={200} style={{padding: 300}}>
                    <ListItem>
                        <List style = {this.classes.innerContainer}>
                                <ListItem className='input-field col s12'>
                                    <ColumnLabel cardInfo={toDoHeader} />
                                </ListItem>
                            
                            {this.state.toDo.map((value, index) => {
                                return (
                                    <ListItem className='input-field col s12'>
                                        <TrelloCard cardInfo={value} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ListItem>
                    <ListItem>
                        <List style = {this.classes.innerContainer}>
                            <ListItem className='input-field col s12'>
                                <ColumnLabel cardInfo={doingHeader} />
                            </ListItem>
                            {this.state.doing.map((value, index) => {
                                return (
                                    <ListItem className='input-field col s12'>
                                        <TrelloCard cardInfo={value} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ListItem>
                    <ListItem>
                        <List style = {this.classes.innerContainer}>
                            <ListItem className='input-field col s12'>
                                <ColumnLabel cardInfo={doneHeader} />
                            </ListItem>
                            {this.state.done.map((value, index) => {
                                return (
                                    <ListItem className='input-field col s12'>
                                        <TrelloCard cardInfo={value} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ListItem>
               </GridList>
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
