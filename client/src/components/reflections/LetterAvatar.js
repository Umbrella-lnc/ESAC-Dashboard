import { deepOrange, deepPurple, blue, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    1: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    2: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    3: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    4: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
}));

export default function LetterAvatars(props) {
    const classes = useStyles();
    const { user } = props;
    const initials =
        user.firstname.toUpperCase().charAt(0) +
        user.lastname.toUpperCase().charAt(0);
    const color = ((user.firstname.length + user.lastname.length) % 4) + 1;

    return (
        <div className={classes.root} style={{ marginRight: "20px" }}>
            <Avatar className={classes[color]}>{initials}</Avatar>
        </div>
    );
}
