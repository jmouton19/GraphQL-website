import { gql, useApolloClient } from '@apollo/client';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { useNotify } from '../providers/NotificationProvider';

function LostPassword() {
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState();
  const client = useApolloClient();
  const notify = useNotify();

  const { t } = useTranslation();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSendEmail() {
    if (validator.isEmail(email)) {
      client
        .mutate({
          mutation: gql`
            mutation {
              resetPassEmail(emailInput: "${email}") {
                success
                message
              }
            }
          `,
        })
        .then((response) => {
          const { success, message } = response.data.resetPassEmail;
          if (success) {
            setEmailSent(true);
            notify('success', message);
          } else {
            notify('error', message);
          }
        });
    }
  }

  return (
    <Container maxWidth="sm">
      <Box paddingTop={3}>
        {emailSent ? (
          <Stack spacing={2} alignItems="center">
            <Typography>{t('lostPasswordCheckEmailPrompt.label')}</Typography>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Typography>{t('lostPasswordEnterEmailPrompt.label')}</Typography>
            <TextField
              id="email-input"
              value={email}
              name="email"
              label={t('emailAddress.label')}
              onChange={handleEmailChange}
            >
              {t('emailAddress.label')}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
              disabled={!validator.isEmail(email)}
            >
              {t('sendEmail.label')}
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default LostPassword;
