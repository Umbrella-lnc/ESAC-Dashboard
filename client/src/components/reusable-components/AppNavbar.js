import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import blue from "@material-ui/core/colors/blue";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  customColor:{
      backgroundColor: blue[500]
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
           aria-label="options"
           aria-controls="menu-appbar"
           aria-haspopup="true"
           onClick={handleMenu}
           color="inherit"
           edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
             id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/reflections">Reflections</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/announcements">Announcements</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/resources">Resources</Link></MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                //onClick={}
                color="inherit"
              >
                <Link to="/profile"><AccountCircle /></Link>
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
