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
import Group from './pages/Group';
import Groups from './pages/Groups';
import MapPage from './pages/MapPage';
import PrimaryAppBar from './components/AppBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthProvider, { useAuthUser } from './providers/AuthProvider';
import NotificationProvider from './providers/NotificationProvider';
import ConfirmAccountBarrier from './components/ConfirmAccountBarrier';
import ResetPassword from './pages/ResetPassword';
import LostPassword from './pages/LostPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import LocationProvider from './providers/LocationProvider';
import DirectMessages from './pages/DirectMessages';

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
    return <ConfirmAccountBarrier>{children}</ConfirmAccountBarrier>;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <NotificationProvider>
        <AuthProvider>
          <LocationProvider>
            <Router>
              <CssBaseline />
              <PrimaryAppBar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/map"
                  element={
                    <PrivateRoute>
                      <MapPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile/:username"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/groups"
                  element={
                    <PrivateRoute>
                      <Groups />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/group/:groupId"
                  element={
                    <PrivateRoute>
                      <Group />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <PrivateRoute>
                      <DirectMessages />
                    </PrivateRoute>
                  }
                />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/lostPassword" element={<LostPassword />} />
                <Route path="/confirmEmail" element={<ConfirmEmail />} />
              </Routes>
            </Router>
          </LocationProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
