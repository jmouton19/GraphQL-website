import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { Dialog } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useLogOut } from '../providers/AuthProvider';

function ConfirmAccountBarrier({ children }) {
  const authUser = useAuthUser();
  const logout = useLogOut();
  const navigate = useNavigate();

  const submit = () => {};

  const { t } = useTranslation();

  if (true) {
    return children;
  } else {
    return (
      <Dialog open>
        <DialogTitle>{t('confirmAccountTitle.label')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('confirmAccountMessage.label', { email: authUser.email })}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              logout().then(() => {
                navigate('/login');
              });
            }}
          >
            {t('logout.label')}
          </Button>
          <Button onClick={submit}>{t('confirm.label')}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmAccountBarrier;
