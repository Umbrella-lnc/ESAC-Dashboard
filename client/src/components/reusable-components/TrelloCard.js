import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
import axios from "axios";
import { useStyles } from "./cardStyles";
import baseURL from "../../baseURL";
import DeletePopUp from "./DeletePopUp";
import MoreInfoPopUp from "./MoreInfoPopUp";
import EditCardPopUp from "./EditCardPopUp";
import {
    blue,
    green,
    yellow,
    deepOrange,
    deepPurple,
    lightBlue,
    red,
    lightGreen,
    pink,
} from "@material-ui/core/colors";

const colors = [
    { name: "green", color: green["A700"] },
    { name: "yellow", color: yellow["A700"] },
    { name: "orange", color: deepOrange["A700"] },
    { name: "red", color: red["A700"] },
    { name: "purple", color: deepPurple["A700"] },
    { name: "blue", color: blue["A700"] },
    { name: "sky", color: lightBlue["A700"] },
    { name: "lime", color: lightGreen["A700"] },
    { name: "pink", color: pink["A700"] },
    { name: "black", color: "#301b70" },
    { name: "white", color: "FFF" },
];

export default function TrelloCard(props) {
    const classes = useStyles();

    const {
        card,
        header,
        editCardColumn,
        card_index,
        col_index,
        updateCards,
        getIdFromColumn,
        headers,
        getIndexFromHeaderName,
    } = props;

    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
    const [cardDetailsOpen, setCardDetailsOpen] = React.useState(false);
    const [editCardOpen, setEditCardOpen] = React.useState(false);

    const [state, setState] = React.useState({
        column: header.name,
        labels: card.labels,
        description: card.desc,
        due: String(card.due),
        name: card.name,
        errors: "",
    });

    const handleConfirmDeleteOpen = () => {
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDeleteClose = () => {
        setConfirmDeleteOpen(false);
    };

    const handleCardDetailsOpen = () => {
        setCardDetailsOpen(true);
    };

    const handleCardDetailsClose = () => {
        setCardDetailsOpen(false);
    };

    const handleEditCardOpen = () => {
        setEditCardOpen(true);
    };

    const handleEditCardClose = () => {
        setState({
            ...state,
            errors: "",
        });
        setEditCardOpen(false);
        setCardDetailsOpen(true);
    };

    function handleDelete() {
        axios
            .post(baseURL + "/api/trello/deleteCard", {
                cardId: card.id,
            })
            .then(function (res) {
                //Set cards with setState to avoid window reload
                updateCards();
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
    }

    const handleOpenEditCardWindow = () => {
        handleCardDetailsClose();
        handleEditCardOpen();
    };

    function isValidDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    function handleEditCard(changes) {
        const { due, column, description } = changes;
        const new_col_index = getIndexFromHeaderName(column);
        const idList = getIdFromColumn(new_col_index);

        if (!isValidDate(due) && due != "") {
            setState({
                ...state,
                errors: "invalid date",
            });
            return;
        }

        var formattedDue = "";
        if (due != "") {
            formattedDue =
                due.slice(6, due.length) +
                "-" +
                due.slice(0, 2) +
                "-" +
                due.slice(3, 5) +
                "T20:56:00.000Z";
        }

        console.log(idList);

        axios
            .post(baseURL + "/api/trello/editCard", {
                cardId: card.id,
                idList: idList,
                due: formattedDue,
                description: description,
            })
            .then(function (res) {
                handleEditCardClose();
                //Edit Column, curColIndex, card index of column, destination column index
                editCardColumn(col_index, card_index, new_col_index);

                //Update card info
                setState((prevState) => ({
                    ...prevState,
                    column: column,
                    description: description,
                    due: formattedDue,
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
    }

    const readableDate = (due) => {
        if (due.length > 6) {
            due =
                due.substring(5, 7) +
                "/" +
                due.substring(8, 10) +
                "/" +
                due.substring(0, 4);
        } else {
            due = "";
        }
        return due;
    };

    const getColorStyle = () => {
        if (state.labels.length > 0 && state.labels[0]) {
            let color = state.labels[0].color;
            //console.log(color);
            return {
                backgroundColor: colors.find(
                    (setColor) => color === setColor.name
                ).color,
                color: "#FFF",
            };
        } else {
            return {
                backgroundColor: "FFF",
                color: "black",
            };
        }
    };

    return (
        <div>
            <Card
                className={classes.root}
                raised={true}
                style={getColorStyle()}
            >
                <CardActionArea onClick={handleCardDetailsOpen}>
                    <CardContent className={classes.content}>
                        {state.due != "" && (
                            <Typography
                                className={classes.title}
                                color="inherit"
                                gutterBottom
                            >
                                {readableDate(state.due)}
                            </Typography>
                        )}
                        {state.due == "" && (
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                            >
                                No Due Date
                            </Typography>
                        )}
                        <Typography variant="h5" component="h2">
                            {state.name}
                        </Typography>
                        {state.labels == "" && (
                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                            >
                                No Labels
                            </Typography>
                        )}
                        {state.labels != "" && (
                            <Typography className={classes.pos} color="inherit">
                                Labels:
                                {state.labels.map((label) => {
                                    return label.name;
                                })}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
            <MoreInfoPopUp
                handleOpenEditCardWindow={handleOpenEditCardWindow}
                handleCardDetailsClose={handleCardDetailsClose}
                cardDetailsOpen={cardDetailsOpen}
                labels={state.labels}
                due={readableDate(state.due)}
                description={state.description}
                column={state.column}
                name={state.name}
            ></MoreInfoPopUp>
            <DeletePopUp
                confirmDeleteOpen={confirmDeleteOpen}
                handleConfirmDeleteClose={handleConfirmDeleteClose}
                handleDelete={handleDelete}
            ></DeletePopUp>
            <EditCardPopUp
                editCardOpen={editCardOpen}
                handleEditCardClose={handleEditCardClose}
                name={state.name}
                handleConfirmDeleteOpen={handleConfirmDeleteOpen}
                column={state.column}
                dueDate={readableDate(state.due)}
                description={state.description}
                labels={state.labels}
                handleEditCard={handleEditCard}
                errors={state.errors}
                readableDate={readableDate}
                headers={headers}
            ></EditCardPopUp>
        </div>
    );
}
