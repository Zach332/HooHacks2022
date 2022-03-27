import React from 'react';
import NavBar from './navbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';

export class QuizPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            legislator: {
                id: window.location.hash.split("?")[1],
                name: 'Loading name...'
            },
            bills: [],
            index: -1,
            bill: {
                subject: 'Loading title...',
                bill_summary: 'Loading summary...',
                congress: 0,
                number: 0,
                type: ""
            },
            qtype: 0
        }
        this.onKeyPress = this.onKeyPress.bind(this);
        window.fetch("http://127.0.0.1:8000/legislator?lid="+window.location.hash.split("?")[1]).then(res => res.text()).then(data => {this.state.legislator.name = data.slice(1, -1);})
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
                {this.state.answer === "correct" && <motion.div
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 20, 0, -20, 0],
                    }}
                    transition={{ ease: "linear", duration: 1.5, repeat: Infinity }}
                    style={{position: "fixed"}}
                >
                    <Typography variant="h3" component="div"  sx={{
                        mb: 10,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        color: "green",
                        x: "110%"
                        }}>
                        Correct!
                  </Typography>
                </motion.div>}
                {this.state.answer === "incorrect" && <motion.div
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 20, 0, -20, 0],
                    }}
                    transition={{ ease: "linear", duration: 2.5, repeat: Infinity }}
                    style={{position: "fixed"}}
                >
                    <Typography variant="h3" component="div"  sx={{
                        mb: 10,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        color: "red",
                        x: "110%"
                        }}>
                        Incorrect :(
                  </Typography>
                </motion.div>}
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
        console.log(this.state.bill)
        fetch(`http://localhost:8000/get-answer?lid=${this.state.legislator.id}&congress=${this.state.bill.bill.congress}&number=${this.state.bill.bill.number}&type=${this.state.bill.bill.type}`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                console.log(this.state.legislator.id)
                if ((answer === "yea" && json === "Yea") || (answer === "nay" && json === "Nay")) {
                    this.setState({answer: "correct"})
                } else {
                    this.setState({answer: "incorrect"})
                }
            })
        setTimeout(() => {
            this.setState({answer: ""});
            const index = this.state.index + 1
            if (index >= this.state.bills.length) {
                console.log('All done')
                return
            }
            this.setState({
                index: index,
                bill: this.state.bills[index]
            })}, 
        2000);
    }
}
