import Box from '@mui/material/Box';
import logo from './logo512.png';
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
  </Box>
  );
}

export default App;
