import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import logo from './minilogo.png';
import wordmark from './wordmark.png'
import './navbar.css';

export default function navbar() {
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
                >
                    <HomeIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <img src={wordmark} className="wordmark" alt="Conguess" />
                </Box>
                <img src={logo} className="mini-logo" alt="logo" />
            </Toolbar>
        </AppBar>
    </Box>
  );
}
