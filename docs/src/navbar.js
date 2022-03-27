import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import logo from './minilogo.png';
import { useEffect, useState } from 'react';
import wordmark from './wordmark.png'
import './navbar.css';
import {useNavigate} from "react-router-dom";
import  { login } from './deso';

function Navbar() {
    const history = useNavigate();
    const [identity, setIdentity] = useState(undefined)
    let desoComponent = <Button sx={{color: 'white'}} onClick={() => login().then(setIdentity)}>Login with Deso</Button>
    console.log(identity)
    if (identity) {
        desoComponent = <div>{identity}</div>
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#27d9d9" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => history('/')}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <img src={wordmark} className="wordmark" alt="Conguess" />
                    </Box>
                    {desoComponent}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar
