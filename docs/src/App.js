import Box from '@mui/material/Box';
import logo from './logo512.png';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List'
import './App.css';
import { useEffect, useState } from 'react';
import { ListItemButton, ListItemText, Divider } from '@mui/material';
import {NavLink, Link, useNavigate} from "react-router-dom";

function App() {
    const history = useNavigate();
    const [status, setStatus] = useState([]);
    return (
        <Box>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                }}
            >
                <img src={logo} className="large-logo" alt="logo" />
            </Box>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                }}
            >
                <Autocomplete
                    disablePortal
                    options={states}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField id="input" {...params} label="State" /> }
                    onChange={(event, value) => window.fetch("http://127.0.0.1:8000/legislators?state="+abbr[states.indexOf(value)]).then(res => res.json()).then(data => setStatus(data))}
                    />
            </Box>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                textAlign: 'center',
                paddingTop: 5,
                }}
            > 
            <Box sx={{ bgcolor: '#d9d910', padding: 3}}><ListItemText>House of Representatives</ListItemText><Divider color="black" /><List>{status.map(x => <ListItemButton onClick={() => history('/quiz?' + x.id)}><ListItemText>{x.name}, {(x.party == "R")?("Republican"):("Democrat")}</ListItemText></ListItemButton>)}</List></Box>
            {/* <div class="box2">Senate</div> */}
            
            </Box>
    </Box>
    );
}

const abbr = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CZ",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WV",
    "WI",
    "WY"
]

const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
]

export default App;
