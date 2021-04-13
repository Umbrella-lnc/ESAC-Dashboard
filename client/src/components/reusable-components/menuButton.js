import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "relative",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    customColor: {
        backgroundColor: grey[100],
    },
}));


export default function MenuButton(props) {
 const classes = useStyles();

 const [state, setState] = React.useState ({
    anchorEl: null
  })

  const handleChange = (event, checked) => {
    setState({ auth: checked });
  };

  const handleMenu = event => {
    setState({ anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ anchorEl: null });
  };

    const { auth, anchorEl } = state;
    const open = Boolean(anchorEl);
    const Wrapper = props.iconType;
    const listItems = props.items.map((link) =>
      <MenuItem onClick={handleClose} >{link}</MenuItem>
    );

    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {<Wrapper />}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
        {listItems}
        </Menu>
      </div>
    );

}




//Contributors: https://stackoverflow.com/questions/48169492/how-to-assign-which-menuitems-open-onclick-when-multiple-menus-are-present-on-th
//https://codesandbox.io/s/aged-shadow-5uucr?file=/menuButton.js