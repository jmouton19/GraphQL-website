import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Feed from './pages/Feed';
import PrimaryAppBar from './components/AppBar';
import PostProvider from './providers/PostProvider';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/map"
            element={
              <PostProvider>
                <MapPage />
              </PostProvider>
            }
          />
          <Route
            path="/feed"
            element={
              <PostProvider>
                <Feed />
              </PostProvider>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
