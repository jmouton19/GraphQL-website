import { gql, useApolloClient } from '@apollo/client';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { Box } from '@mui/material';
import { FormControl } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useNotify } from '../providers/NotificationProvider';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordRepeated, setPasswordRepeated] = useState('');
  const [passwordError, setPasswordError] = useState({
    status: false,
    msg: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const [passwordResetDone, setpasswordResetDone] = useState(false);

  const key = new URLSearchParams(location.search).get('key');
  const userId = new URLSearchParams(location.search).get('userId');

  const client = useApolloClient();
  const notify = useNotify();

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function completeChangePassword() {
    client
      .mutate({
        mutation: gql`
        mutation {
          resetPassword(
            input: {
              key: "${key}"
              userId: ${userId}
              password: "${password}"
            }
          ) {
            success
            message
          }
        }
      `,
      })
      .then((response) => {
        const { success, message } = response.data.resetPassword;
        if (success) {
          notify('success', message);
          setpasswordResetDone(true);
        } else {
          notify('error', message);
        }
      });
  }

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

  return (
    <Container maxWidth="sm">
      <Box component="form" paddingTop={3}>
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="stretch"
          paddingTop={2}
        >
          {passwordResetDone ? (
            <Grid item xs={12}>
              <Typography>
                Your password has been reset. Please log in.
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password-input">
                    {t('password.label')}
                  </InputLabel>
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
                    label={t('password.label')}
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
                    {t('repeatPassword.label')}
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
                    label={t('repeatPassword.label')}
                    error={password !== passwordRepeated}
                  />
                  {password !== passwordRepeated ? (
                    <FormHelperText
                      id="password-match-helper-text"
                      sx={{
                        color: 'red',
                      }}
                    >
                      {t('passwordMismatch.label')}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    onClick={completeChangePassword}
                    sx={{ mt: 2, mr: 1 }}
                    disabled={
                      passwordError.status || password !== passwordRepeated
                    }
                  >
                    {t('changePassword.label')}
                  </Button>
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ResetPassword;
