import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import AvatarPicker from '../components/AvatarPicker';
import StyledLink from '../components/StyledLink';
import validator from 'validator';
import { useAuthUser, useSignUp } from '../providers/AuthProvider';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Divider } from '@mui/material';
import { useNotify } from '../providers/NotificationProvider';

function SignUp() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState({
    status: false,
    msg: '',
  });
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({ status: false, msg: '' });
  const [password, setPassword] = useState('');
  const [passwordRepeated, setPasswordRepeated] = useState('');
  const [passwordError, setPasswordError] = useState({
    status: false,
    msg: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const signUp = useSignUp();

  const notify = useNotify();

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const validateUsername = () => {
    if (username === '') {
      setUsernameError({
        status: true,
        msg: 'Please enter a username',
      });
      return;
    }
    if (!validator.isAlphanumeric(username)) {
      setUsernameError({
        status: true,
        msg: 'No special characters allowed.',
      });
      return;
    }
    // on no error:
    setUsernameError({ status: false, msg: '' });
  };

  const validateEmail = () => {
    if (email === '') {
      setEmailError({
        status: true,
        msg: 'Please enter an email address.',
      });
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError({
        status: true,
        msg: 'Incorrect email format.',
      });
      return;
    }
    // on no error:
    setEmailError({ status: false, msg: '' });
  };

  const validatePassword = () => {
    if (password === '') {
      setPasswordError({
        status: true,
        msg: 'Please enter a password.',
      });
      return;
    }
    if (password.length < 8) {
      setPasswordError({
        status: true,
        msg: 'Must be at least 8 characters long.',
      });
      return;
    }
    // on no error:
    setPasswordError({ status: false, msg: '' });
  };

  function completeSignUp() {
    const data = {
      avatar: avatarUrl,
      email,
      firstName,
      lastName,
      password,
      rememberMe,
      username,
    };

    signUp(data)
      .then(() => notify('success', 'Signed up successfully.'))
      .catch(() => notify('error', 'Sign up failed'));
  }

  const authUser = useAuthUser();

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Stack alignItems="center">
          <Typography variant="h3" color="primary" gutterBottom paddingTop={3}>
            Sign Up
          </Typography>
        </Stack>

        <Typography variant="caption" color="primary">
          <StyledLink to="/login">
            {'Already have an account? Log in instead.'}
          </StyledLink>
        </Typography>
        <Box>
          <Box component="form">
            <Grid
              container
              direction="column"
              spacing={2}
              alignItems="stretch"
              paddingTop={2}
            >
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="username-input">Username</InputLabel>
                  <OutlinedInput
                    id="username-input"
                    type="text"
                    value={username}
                    name="username"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    onBlur={validateUsername}
                    label="Username"
                    error={usernameError.status}
                  />
                </FormControl>
                {usernameError.status ? (
                  <FormHelperText
                    id="username-helper-text"
                    sx={{
                      color: 'red',
                    }}
                  >
                    {usernameError.msg}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="email-input">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    onBlur={validateEmail}
                    label="Email Address"
                    error={emailError.status}
                  />
                </FormControl>
                {emailError.status ? (
                  <FormHelperText
                    id="email-helper-text"
                    sx={{
                      color: 'red',
                    }}
                  >
                    {emailError.msg}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password-input">Password</InputLabel>
                  <OutlinedInput
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    onBlur={validatePassword}
                    label="Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShowPassword}
                          onMouseDown={toggleShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {passwordError.status && (
                  <FormHelperText
                    id="password-helper-text"
                    sx={{
                      color: 'red',
                    }}
                  >
                    {passwordError.msg}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password-repeat-input">
                    Repeat Password
                  </InputLabel>
                  <OutlinedInput
                    id="password-repeat-input"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordRepeated}
                    name="password"
                    autoComplete="new-password"
                    onChange={(event) => {
                      setPasswordRepeated(event.target.value);
                    }}
                    label="Repeat Password"
                    error={password !== passwordRepeated}
                  />
                  {password !== passwordRepeated ? (
                    <FormHelperText
                      id="password-match-helper-text"
                      sx={{
                        color: 'red',
                      }}
                    >
                      Passwords do not match
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="firstname-input">First Name</InputLabel>
                  <OutlinedInput
                    id="firstname-input"
                    name="firstname"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    label="First Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="lastname-input">Last Name</InputLabel>
                  <OutlinedInput
                    id="lastname-input"
                    name="firstname"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    label="Last Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel> Avatar</InputLabel>
                <AvatarPicker
                  setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                    value={rememberMe}
                    onChange={(event) => {
                      setRememberMe(event.target.value);
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    onClick={completeSignUp}
                    sx={{ mt: 2, mr: 1 }}
                  >
                    Sign Up
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default SignUp;
