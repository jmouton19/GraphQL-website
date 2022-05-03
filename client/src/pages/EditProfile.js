import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import AvatarPicker from '../components/AvatarPicker';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { useAuthUser, useLogOut, useLogIn } from '../providers/AuthProvider';
import { useNotify } from '../providers/NotificationProvider';
import validator from 'validator';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const fabStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

function EditProfile() {
  const { t } = useTranslation();
  const authUser = useAuthUser();
  const logOut = useLogOut();
  const login = useLogIn();
  const [edit, setEdit] = useState(false);
  const client = useApolloClient();
  const notify = useNotify();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState({
    status: false,
    msg: '',
  });
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [changePassword, setChangePassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeated, setPasswordRepeated] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setFirstName(authUser.firstName);
    setLastName(authUser.lastName);
    setAvatarUrl(authUser.avatar);
    setPassword(authUser.password);
    setUsername(authUser.username);
    setEmail(authUser.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  function saveChangePasswordChecks() {
    return (
      password === '' ||
      oldPassword === '' ||
      passwordRepeated === '' ||
      password !== passwordRepeated
    );
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

  const editPassword = () => {
    client
      .mutate({
        mutation: gql`
            mutation {
                updateUser(
                    input: {
                        userId: ${authUser.id}
                        newPassword: "${newPassword}"
                        oldPassword: "${oldPassword}"
                    }
                ) {
                  success
                  message
                }
            }
        `,
      })
      .then((result) => {
        const { success, message } = result.data.updateUser;
        if (success) {
          logOut();
          notify('success', `${message} Please log in again.`);
        } else {
          notify('error', message);
        }
      });
  };

  const editUser = () => {
    client
      .mutate({
        mutation: gql`
            mutation {
                updateUser(
                    input: {
                        userId: ${authUser.id}
                        firstName: "${firstName}"
                        lastName: "${lastName}"
                        username: "${username}"
                        avatar: "${avatarUrl}"
                    }
                ) {
                  success
                  message
                }
            }
        `,
      })
      .then((result) => {
        const { success, message } = result.data.updateUser;
        if (success) {
          logOut();
          notify('success', `${message} Please log in again.`);
        } else {
          notify('error', message);
        }
      });
  };

  function saveEditDisableChecks() {
    if (
      authUser.username !== username ||
      authUser.firstName !== firstName ||
      authUser.lastName !== lastName ||
      authUser.avatar !== avatarUrl
    ) {
      return false;
    } else {
      return true;
    }
  }

  function saveDeleteDisableChecks() {
    return password === '' || email === '';
  }

  const deleteUser = () => {};

  return (
    <>
      <Fab
        style={fabStyle}
        color="primary"
        aria-label="edit"
        onClick={() => setEdit(true)}
      >
        <EditIcon />
      </Fab>
      <Dialog open={edit} onClose={() => setEdit(false)}>
        <DialogTitle>
          <Typography sx={{ fontSize: 30 }} color="primary">
            <b>{t('editProfile.label')}</b>
          </Typography>
        </DialogTitle>
        <FormControl fullWidth>
          <Grid container padding={1} rowSpacing={3} alignItems="center">
            <Grid item xs={12}>
              <Grid container alignItems="center" padding={1} spacing={2}>
                <Grid item xs={12}>
                  <Stack>
                    <AvatarPicker
                      setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="username-input">
                        {t('username.label')}
                      </InputLabel>
                      <OutlinedInput
                        //variant="outlined"
                        type="text"
                        defaultValue={authUser.username}
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                        onBlur={validateUsername}
                        label={t('username.label')}
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
                    <TextField
                      variant="outlined"
                      defaultValue={authUser.firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      label={t('firstName.label')}
                    />
                    <TextField
                      variant="outlined"
                      defaultValue={authUser.lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      label={t('lastName.label')}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <DialogActions>
                <FormControl fullWidth>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack>
                      <Button
                        onClick={() => setChangePassword(true)}
                        variant="text"
                        size="small"
                      >
                        {t('changePassword.label')}
                      </Button>
                      <Button
                        onClick={() => setConfirmDelete(true)}
                        variant="text"
                        size="small"
                        color="error"
                      >
                        {t('deleteAccount.label')}
                      </Button>
                    </Stack>
                    <Button
                      onClick={() => editUser()}
                      variant="contained"
                      sx={{ borderRadius: '50%' }}
                      //disabled={saveEditDisableChecks()}
                    >
                      <SaveIcon />
                    </Button>
                  </Stack>
                </FormControl>
              </DialogActions>
            </Grid>
          </Grid>
        </FormControl>
      </Dialog>
      <Dialog
        open={changePassword}
        onClose={() => setChangePassword(false)}
        fullWidth
      >
        <DialogTitle>{t('changePassword.label')}</DialogTitle>
        <FormControl fullWidth>
          <Stack padding={1} spacing={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password-input">
                {t('newPassword.label')}
              </InputLabel>
              <OutlinedInput
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
                onBlur={(event) => {
                  setPassword(event.target.value);
                }}
                label={t('newPassword.label')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password-repeat-input">
                {t('repeatNewPassword.label')}
              </InputLabel>
              <OutlinedInput
                id="password-repeat-input"
                type={showPassword ? 'text' : 'password'}
                value={passwordRepeated}
                name="password"
                autoComplete="new-password"
                onChange={(event) => {
                  setPasswordRepeated(event.target.value);
                  setNewPassword(password);
                }}
                label={t('repeatNewPassword.label')}
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
            <Divider />
            <FormControl fullWidth>
              <InputLabel htmlFor="password-old">
                {t('oldPassword.label')}
              </InputLabel>
              <OutlinedInput
                id="password-old-input"
                type={showPassword ? 'text' : 'password'}
                value={oldPassword}
                name="old-password"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
                label={t('oldPassword.label')}
              />
            </FormControl>
            <Divider />
          </Stack>
        </FormControl>
        <DialogActions>
          <FormControl fullWidth>
            <Stack direction="row" justifyContent="space-between">
              <Button type="text" onClick={() => setChangePassword(false)}>
                {t('cancel.label')}
              </Button>
              <Button
                onClick={() => editPassword()}
                variant="contained"
                sx={{ borderRadius: '50%', height: 60, width: 60 }}
                disabled={saveChangePasswordChecks()}
              >
                <SaveIcon />
              </Button>
            </Stack>
          </FormControl>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        fullWidth
      >
        <DialogTitle>{t('confirmDelete.label')}</DialogTitle>
        <Stack padding={1} spacing={1}>
          <FormControl fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              label="Email"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password-input">
              {t('password.label')}
            </InputLabel>
            <OutlinedInput
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="new-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              label={t('password.label')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
        <DialogActions>
          <FormControl fullWidth>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="text"
                onClick={() => setConfirmDelete(false)}
                color="primary"
              >
                {t('cancel.label')}
              </Button>
              <Button
                onClick={() => {
                  setRememberMe(false);
                  login(email, password, rememberMe)
                    .then(() => {
                      deleteUser()
                        .then(() => {
                          notify('success', 'Account successfully deleted.');
                          logOut();
                          setTimeout(() => navigate('/'), 200);
                        })
                        .catch((err) => notify('error', ''));
                    })
                    .catch((err) => notify('error', ''));
                }}
                variant="contained"
                disabled={saveDeleteDisableChecks()}
                sx={{ borderRadius: '50%', height: 60, width: 60 }}
                color="error"
              >
                <DeleteIcon />
              </Button>
            </Stack>
          </FormControl>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default EditProfile;
