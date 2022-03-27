import Box from '@mui/material/Box';
import logo from './logo512.png';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './App.css';

function App() {
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
                renderInput={(params) => <TextField {...params} label="State" />}
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
        <div class="box1">House of Representatives</div>
        <div class="box2">Senate</div>
        </Box>
  </Box>
  );
}

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
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
]

export default App;
