import React from 'react';
import NavBar from './navbar';

export class QuizPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bills: [],
            index: -1,
            bill: {
                title: 'Loading title...',
                summary: 'Loading summary...'
            }
        }
    }

    render() {
        return <div>
            <NavBar />
            <div>Politician name</div>
            <div>Bill title</div>
            <div>Bill summary</div>
            <div>How did they vote?</div>
            <button onClick={_ => this.respond('yea')}>Yea</button>
            <button onClick={_ => this.respond('nay')}>Nay</button>
        </div>
    }

    componentDidMount() {
        const quiz = this
        fetch('http://localhost:8000/bills')
            .then(res => res.json())
            .then(json => {
                quiz.setState({
                    bills: json,
                    bill: json[0],
                    index: 0
                })
            })
    }

    respond(answer) {
        const index = this.state.index + 1
        this.setState({
            index: index
        })
    }
}
