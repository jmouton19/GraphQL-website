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
import { useTranslation } from 'react-i18next';

function SignUp() {
  const { t } = useTranslation();
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
            {t("signUp.label")}
          </Typography>
        </Stack>

        <Typography variant="caption" color="primary">
          <StyledLink to="/login">
            {t("alreadyHaveAccount.label")}
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
                  <InputLabel htmlFor="username-input">{t("username.label")}</InputLabel>
                  <OutlinedInput
                    id="username-input"
                    type="text"
                    value={username}
                    name="username"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    onBlur={validateUsername}
                    label={t("username.label")}
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
                  <InputLabel htmlFor="email-input">{t("emailAddress.label")}</InputLabel>
                  <OutlinedInput
                    id="email-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    onBlur={validateEmail}
                    label={t("emailAddress.label")}
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
                  <InputLabel htmlFor="password-input">{t("password.label")}</InputLabel>
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
                    label={t("password.label")}
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
                    {t("repeatPassword.label")}
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
                    label={t("repeatPassword.label")}
                    error={password !== passwordRepeated}
                  />
                  {password !== passwordRepeated ? (
                    <FormHelperText
                      id="password-match-helper-text"
                      sx={{
                        color: 'red',
                      }}
                    >
                      {t("passwordMismatch.label")}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="firstname-input">{t("firstName.label")}</InputLabel>
                  <OutlinedInput
                    id="firstname-input"
                    name="firstname"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    label={t("firstName.label")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="lastname-input">{t("lastName.label")}</InputLabel>
                  <OutlinedInput
                    id="lastname-input"
                    name="firstname"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    label={t("lastName.label")}
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
                    label={t("rememberMe.label")}
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
                    disabled={passwordError.status || emailError.status || (password !== passwordRepeated)}
                  >
                    {t("signUp.label")}
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
