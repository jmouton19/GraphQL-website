import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import validator from 'validator';

function LostPassword() {
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState();

  const { t } = useTranslation();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSendEmail() {
    if (validator.isEmail(email)) {
      alert(email);
      setEmailSent(true);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box paddingTop={3}>
        <Stack spacing={2}>
          {emailSent ? (
            <Typography>{t('lostPasswordCheckEmailPrompt.label')}</Typography>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Box>
    </Container>
  );
}

export default LostPassword;
