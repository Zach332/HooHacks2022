import React from 'react';
import NavBar from './navbar';
import './State.js'
import Confetti from 'react-confetti'

export class SummaryPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <NavBar />
            <Confetti />
            <h1 style={{textAlign: "center", paddingTop: 5, textDecoration: "bold"}}>You scored {global.correct}/10</h1> 
        </div>
    }
}
