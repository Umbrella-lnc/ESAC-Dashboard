import Avatar from "@material-ui/core/Avatar";
import './Profile.css'

export default function LetterAvatars(props) {
    const { name } = props;
    let initials = "";

    if(typeof name.firstname !== 'undefined') {
        initials =
            name.firstname.toUpperCase().charAt(0) +
            name.lastname.toUpperCase().charAt(0);
    }

    return (
        // <Avatar className={classes[color]}>{initials}</Avatar>
        <Avatar style={{height:250, width:250}}>{initials}</Avatar>
    );
}
