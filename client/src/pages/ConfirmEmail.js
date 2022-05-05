import { gql, useApolloClient } from '@apollo/client';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNotify } from '../providers/NotificationProvider';

function ConfirmEmail() {
  const location = useLocation();
  const client = useApolloClient();
  const notify = useNotify();

  const [text, setText] = React.useState('Confirming your account...');

  React.useEffect(() => {
    const key = new URLSearchParams(location.search).get('key');
    const userId = new URLSearchParams(location.search).get('userId');

    client
      .mutate({
        mutation: gql`
        mutation {
          validateAccount(
            input: {
              key: "${key}"
              userId: ${userId}
            }
          ) {
            success
            message
          }
        }
      `,
      })
      .then((response) => {
        const { success, message } = response.data.validateAccount;
        if (success) {
          notify('success', message);
          setText('Email confirmed. Please log in.');
        } else {
          notify('error', message);
          setText('Email confirmation failed. Please log in to resend verification.');
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="sm">
      <Box paddingTop={3}>
        <Stack spacing={2} alignItems="center">
          <Typography>{text}</Typography>
        </Stack>
      </Box>
    </Container>
  );
}

export default ConfirmEmail;
