import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MapPage from './pages/MapPage';
import Feed from './pages/Feed';
import PrimaryAppBar from './components/AppBar';
import PostProvider from './providers/PostProvider';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthProvider, { useAuthUser } from './providers/AuthProvider';
import NotificationProvider from './providers/NotificationProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc619',
    },
  },
});

function PrivateRoute({ children }) {
  const authUser = useAuthUser();

  if (authUser) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <NotificationProvider>
        <AuthProvider>
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
                  <PrivateRoute>
                    <PostProvider>
                      <MapPage />
                    </PostProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <PrivateRoute>
                    <PostProvider>
                      <Feed />
                    </PostProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <PostProvider>
                      <Profile />
                    </PostProvider>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
