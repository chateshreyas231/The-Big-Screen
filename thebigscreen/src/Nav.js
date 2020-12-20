import React,{ useEffect, useState } from 'react'
import './Nav.css'
import logo from './logonew.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useStateValue } from './StateProvider'
import { auth } from './firebase';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsIcon from '@material-ui/icons/Settings';
import StarsIcon from '@material-ui/icons/Stars';


function Nav() {

    const [{ user }, dispatch] = useStateValue()


    const handleAuthentication = () => {
        if(user) {
            auth.signOut()
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };


    const[show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            }else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", handleShow);
    }
    }, []);

    return (
        
        <div className={`nav ${show && "nav__black"}`}>
            <div >
            <img
            className="nav__logo"
            src={logo}
            alt="The Big Screen Logo"
            />
            </div>

             <div  className="nav__menu">
             <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
             <Menu
                    
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem >Hello!{' '}{user.displayName}</MenuItem>
                <MenuItem ><PersonIcon className="nav__subMenu"/> My Profile</MenuItem>
                <MenuItem ><SubscriptionsIcon className="nav__subMenu"/>Subscription</MenuItem>
                <MenuItem ><StarsIcon className="nav__subMenu"/>Favoriates</MenuItem>
                <MenuItem ><SettingsIcon className="nav__subMenu"/>Settings</MenuItem>
                <MenuItem onClick={handleAuthentication} fontSize="large"><ExitToAppIcon className="nav__subMenu"/>{user? 'Logout':'blank'}</MenuItem>
                </Menu>
            </div>
           
        </div>

    )
}

export default Nav
