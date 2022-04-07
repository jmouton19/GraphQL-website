import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Map from './pages/Map';
import PrimaryAppBar from './components/AppBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fe5800',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <PrimaryAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
