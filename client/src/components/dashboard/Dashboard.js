import React, { Component } from "react";
import axios from "axios";
import { List, ListItem } from "@material-ui/core";
import TrelloCard from "../reusable-components/TrelloCard";
import ColumnLabel from "../reusable-components/ColumnLabel";
import baseURL from "../../baseURL";
import NewCard from "../reusable-components/NewCard";
import { STATES } from "mongoose";

const Dashboard = (props) => {
    const [state, setState] = React.useState({
        lists: [],
        headers: [],
        loading: true,
    });

    const getList = (listId) => {
        axios
            .post(baseURL + "/api/trello/getCards", {
                listId: listId,
            })
            .then((res) => {
                setState((prevState) => ({
                    ...prevState,
                    lists: [...prevState.lists, res.data],
                }));
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };

    const getCards = () => {
        axios
            .get(baseURL + "/api/trello/getLists")
            .then((res) => {
                console.log(res);
                setState((prevState) => ({
                    ...prevState,
                    headers: res.data,
                }));
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };

    const getIdFromColumn = (column) => {
        let idList = "";
        if (column == "To Do") {
            idList = "60638369236486515ccc1ec8";
        } else if (column == "Doing") {
            idList = "6063836bf49a2c5dc7e08dc6";
        } else {
            idList = "6063836cce7e3326413eb0f2";
        }
        return idList;
    };

    const editCardColumn = (curColName, index, newColID) => {
        const oldColIndex = state.headers.findIndex(
            (header) => header.id === getIdFromColumn(curColName)
        );
        const newColIndex = state.headers.findIndex(
            (header) => header.id === newColID
        );

        console.log(getIdFromColumn(curColName));
        console.log(newColID);
        console.log(curColName + "\n" + index + "\n" + newColID);
        console.log(oldColIndex + "\n" + index + "\n" + newColIndex);
        console.log(state.headers);

        //Don't update column if the same
        if (oldColIndex === newColIndex) {
            return;
        }
        setState((prevState) => {
            const newState = { ...prevState };
            //Add new element to new column
            newState.lists[newColIndex] = [
                ...newState.lists[newColIndex],
                newState.lists[oldColIndex][index],
            ];
            //Remove card from old column
            newState.lists[oldColIndex].splice(index, 1);
            setState(newState);
        });
    };

    //Hard refresh of cards
    const updateCards = () => {
        setState((prevState) => ({
            ...prevState,
            lists: [],
            loading: true,
        }));
    };

    //POST RENDER
    React.useEffect(() => {
        //Debugging
        console.log(state);
    }, [state]);

    //Initial Load
    React.useEffect(() => {
        getCards();
    }, []);

    React.useEffect(() => {
        //If the application has not fetched headers yet
        if (state.headers.length === 0) {
            return;
        }

        //Finished loading
        if (state.lists.length === state.headers.length && state.loading) {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
        //Continue loading
        else if (state.loading && state.headers.length > 0) {
            console.log(state.headers);
            console.log(state.lists.length);
            getList(state.headers[state.lists.length].id);
        }
    }, [state]);

    //CSS STYLING
    const horiList = {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        alignContent: "flex-start",
        alignItems: "flex-start",
    };
    const vertiList = {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    };
    const mainContainer = {
        padding: 100,
    };
    const header = {
        paddingLeft: "28px",
    };
    const subheader = {
        paddingLeft: "32px",
    };

    //Loading Check
    if (state.loading) {
        return <h1 style={{ marginTop: "70px" }}>Loading...</h1>;
    }
    //render
    return (
        <div style={mainContainer}>
            <h1 style={header}>Tasks</h1>
            <h5 style={subheader}>Imported From trello</h5>
            <List style={horiList}>
                {state.headers.map((value, index) => {
                    return (
                        <div>
                            <ListItem>
                                <List style={vertiList}>
                                    <ListItem className="input-field col s12">
                                        <ColumnLabel cardInfo={value.name} />
                                    </ListItem>

                                    {state.lists[index].map(
                                        (value1, card_index) => {
                                            return (
                                                <ListItem
                                                    key={value1.id}
                                                    className="input-field col s12"
                                                >
                                                    <TrelloCard
                                                        cardInfo={value1}
                                                        colName={value.name}
                                                        updateCards={
                                                            updateCards
                                                        }
                                                        editCardColumn={
                                                            editCardColumn
                                                        }
                                                        card_index={card_index}
                                                        col_index={index}
                                                        getIdFromColumn={
                                                            getIdFromColumn
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        }
                                    )}
                                    <ListItem className="input-field col s12">
                                        <NewCard
                                            colId={value.id}
                                            updateCards={updateCards}
                                        />
                                    </ListItem>
                                </List>
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        </div>
    );
};

export default Dashboard;
