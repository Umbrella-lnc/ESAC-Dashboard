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

    const editCardColumn = (cur_col, card_index, new_col) => {
        //Don't update column if the same
        if (new_col === cur_col) {
            return;
        }
        setState((prevState) => {
            const newState = { ...prevState };
            //Add new element to new column
            newState.lists[new_col] = [
                ...newState.lists[new_col],
                newState.lists[cur_col][card_index],
            ];
            //Remove card from old column
            newState.lists[cur_col].splice(card_index, 1);
            return newState;
        });
    };

    const getIdFromColumn = (colIndex) => {
        return state.headers[colIndex].id;
    };

    const getIndexFromHeaderName = (name) => {
        return state.headers.findIndex((header) => header.name === name);
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
                {state.headers.map((header, index) => {
                    return (
                        <div
                            key={header.id}
                            style={{
                                marginRight: "auto",
                                marginLeft: "auto",
                            }}
                        >
                            <ListItem>
                                <List style={vertiList}>
                                    <ListItem className="input-field col s12">
                                        <ColumnLabel cardInfo={header.name} />
                                    </ListItem>

                                    {state.lists[index].map(
                                        (card, card_index) => {
                                            return (
                                                <ListItem
                                                    key={card.id}
                                                    className="input-field col s12"
                                                >
                                                    <TrelloCard
                                                        card={card}
                                                        header={header}
                                                        headers={state.headers}
                                                        editCardColumn={
                                                            editCardColumn
                                                        }
                                                        card_index={card_index}
                                                        col_index={index}
                                                        updateCards={
                                                            updateCards
                                                        }
                                                        getIdFromColumn={
                                                            getIdFromColumn
                                                        }
                                                        getIndexFromHeaderName={
                                                            getIndexFromHeaderName
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        }
                                    )}
                                    <ListItem className="input-field col s12">
                                        <NewCard
                                            colId={header.id}
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
