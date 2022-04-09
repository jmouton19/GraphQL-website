import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Feed from './pages/Feed';
import PrimaryAppBar from './components/AppBar';
import PostProvider from './providers/PostProvider';

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
    <PostProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <PrimaryAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </PostProvider>
  );
}

export default App;
