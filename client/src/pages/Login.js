import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import StyledLink from '../components/StyledLink';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthUser, useLogIn } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const authUser = useAuthUser();
  const login = useLogIn();

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleLogIn() {
    login(email, password, rememberMe);
  }

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box component="form" paddingTop={3}>
          <Grid container direction="column" spacing={2} alignItems="stretch">
            <Grid item xs={12}>
              <Typography variant="h3" color="primary" align="center">
                {t("login.label")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email-input">{t("emailAddress.label")}</InputLabel>
                <OutlinedInput
                  id="email-input"
                  value={email}
                  type="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  label={t("emailAddress.label")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password-input">{t("password.label")}</InputLabel>
                <OutlinedInput
                  id="password-input"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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
                <Button variant="contained" onClick={handleLogIn}>
                  {t("login.label")}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="primary">
                <StyledLink to="/signup">
                  {t("dontHaveAccount.label")}
                </StyledLink>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
export default Login;
