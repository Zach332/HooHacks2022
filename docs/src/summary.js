import React from 'react';
import NavBar from './navbar';
import './State.js'
import Confetti from 'react-confetti'
import { Typography } from '@mui/material';

export class SummaryPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <NavBar />
            <Confetti />
            <Typography variant = "h1" style={{textAlign: "center", paddingTop: 200, textDecoration: "bold"}}>You scored {global.correct}/10</Typography> 
        </div>
    }
}
