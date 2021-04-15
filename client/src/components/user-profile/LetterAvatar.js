import { deepOrange, deepPurple, blue, green } from "@material-ui/core/colors";
import { makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import './Profile.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function LetterAvatars(props) {
    const classes = useStyles();
    const { name } = props;
    let initials = "";
    let color = 1;

    if(typeof name.firstname !== 'undefined') {
        console.log(name.firstname);

        initials =
            name.firstname.toUpperCase().charAt(0) +
            name.lastname.toUpperCase().charAt(0);
        color = ((name.firstname.length + name.lastname.length) % 4) + 1;
    }

    return (
        // <Avatar className={classes[color]}>{initials}</Avatar>
        <Avatar style={{height:250, width:250}}>{initials}</Avatar>
    );
}
