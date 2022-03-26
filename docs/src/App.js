import Box from '@mui/material/Box';
import logo from './logo.svg';

function App() {
  return (
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <img src={logo} className="App-logo" alt="logo" />
      </Box>
  );
}

export default App;
