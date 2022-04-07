import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import PrimaryAppBar from './components/AppBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc619',
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
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
