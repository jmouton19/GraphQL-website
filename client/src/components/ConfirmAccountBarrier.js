import { gql, useApolloClient } from '@apollo/client';
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
import { useNotify } from '../providers/NotificationProvider';

function ConfirmAccountBarrier({ children }) {
  const authUser = useAuthUser();
  const logout = useLogOut();
  const navigate = useNavigate();
  const client = useApolloClient();
  const notify = useNotify();
  const [resendDisabled, setResendDisabled] = React.useState(false);

  const resendEmail = () => {
    setResendDisabled(true);
    client
      .mutate({
        mutation: gql`
        mutation {
          resendValidation(emailInput: "${authUser.email}") {
            success
            message
          }
        }
      `,
      })
      .then((response) => {
        const { success, message } = response.data.resendValidation;
        if (success) {
          notify('success', message);
          setTimeout(() => setResendDisabled(false), 5000);
        } else {
          notify('error', message);
          setResendDisabled(false);
        }
      });
  };

  const { t } = useTranslation();

  if (authUser.validated) {
    return children;
  } else {
    return (
      <Dialog open>
        <DialogTitle>{t('confirmAccountTitle.label')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('confirmAccountMessage.label', { email: authUser.email })}
          </DialogContentText>
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
          <Button disabled={resendDisabled} onClick={resendEmail}>
            {t('resendEmail.label')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmAccountBarrier;
