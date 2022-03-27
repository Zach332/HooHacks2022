import React from 'react';
import NavBar from './navbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export class QuizPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            legislator: {
                id: 'B001292',
                name: 'Beyer'
            },
            bills: [],
            index: -1,
            bill: {
                title: 'Loading title...',
                summary: 'Loading summary...'
            },
            qtype: 0
        }
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event){
        if(event.keyCode === 39) {
            this.respond('yea')
        } else if (event.keyCode === 37) {
            this.respond('nay')
        }
    }

    render() {
        return <div>
            <NavBar />
            <Typography variant="h3" component="div"  sx={{
              m: 4,
              display: 'flex',
              justifyContent: 'space-evenly',
              }}>
                {this.state.legislator.name}
            </Typography>
            <Typography variant="h4" component="div"  sx={{
              m: 3,
              display: 'flex',
              justifyContent: 'space-evenly',
              color: "#27d9d9"
              }}>
                {this.state.bill.subject}
            </Typography>
            <Typography component="div"  sx={{
              m: 3,
              display: 'flex',
              justifyContent: 'space-evenly'
              }}>
                {this.state.bill.bill_summary}
            </Typography>
            <Typography variant="h4" component="div"  sx={{
              m: 3,
              display: 'flex',
              justifyContent: 'space-evenly'
              }}>
                How do you think {this.state.legislator.name} voted?
            </Typography>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '500px'
                }}
            >
                <Typography variant="h1" component="div" onClick={_ => this.respond('nay')} sx={{
                    }}>
                        Nay
                </Typography>
                <Divider orientation="vertical" flexItem> 
                <ArrowBackIosIcon sx={{mr: 5}}/>
                <ArrowForwardIosIcon />
                </Divider>
                <Typography variant="h1" component="div" onClick={_ => this.respond('yea')} sx={{
                    }}>
                        Yea
                </Typography>
            </Box>
        </div>
    }

    componentDidMount() {
        const quiz = this
        fetch(`http://localhost:8000/bills?legislator_id=${this.state.legislator.id}`)
            .then(res => res.json())
            .then(json => {
                const bills = json.bills
                console.log(bills[0])
                quiz.setState({
                    bills: bills,
                    bill: bills[0],
                    index: 0
                })
            })
        document.addEventListener("keydown", this.onKeyPress, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.onKeyPress, false);
    }

    respond(answer) {
        const index = this.state.index + 1
        if (index >= this.state.bills.length) {
            console.log('All done')
            return
        }
        this.setState({
            index: index,
            bill: this.state.bills[index]
        })
    }
}
