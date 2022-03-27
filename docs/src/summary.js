import React from 'react';
import NavBar from './navbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './State.js'

export class SummaryPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <NavBar />
            <h1 style={{textAlign: "center", paddingTop: 5, textDecoration: "bold"}}>You scored {global.correct}/10</h1> 
        </div>
    }
}
