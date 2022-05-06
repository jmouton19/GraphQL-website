import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import { useAuthUser } from '../providers/AuthProvider';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

const gun = Gun({
  peers: ['http://localhost:3030/gun'],
});

const initialState = {
  messages: [],
};

function reducer(state, message) {
  return {
    messages: [...state.messages, message],
  };
}

export default function DirectMessages() {
  const authUser = useAuthUser();
  const [message, setMessage] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stream = gun.get('messages');
    stream.map().on((m) => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt,
      });
    });
  }, []);

  function saveMessage() {
    const messages = gun.get('messages');
    const date = new Date();
    messages.set({
      name: authUser.username,
      message: message,
      createdAt: date.toUTCString(),
    });
    setMessage('');
  }
  return (
    <>
      <Grid container padding={2}>
        <Grid item xs={4}>
          Friends
        </Grid>
        <Grid item xs={8}>
          <Stack>
            <Stack direction="row">
              <FormControl fullWidth>
                <InputLabel>Message</InputLabel>
                <OutlinedInput
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  label="Message"
                />
              </FormControl>
              <Button onClick={saveMessage}>Send</Button>
            </Stack>
            <Stack>
              {state.messages.map((msg) => (
                <Typography>{msg.message}</Typography>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
