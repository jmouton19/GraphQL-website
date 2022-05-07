import React, { useEffect, useState } from 'react';
import Gun from 'gun';
import { useAuthUser } from '../providers/AuthProvider';
import {
  FormControl,
  Stack,
  InputLabel,
  OutlinedInput,
  Button,
  Typography,
} from '@mui/material';

const gun = Gun({
  peers: ['http://localhost:3030/gun'],
});

function MessageDisplay({ node }) {
  const authUser = useAuthUser();
  const [message, setMessage] = useState('');
  const [messageChain, setMessageChain] = useState([]);

  useEffect(() => {
    setMessageChain([]);
    if (node !== '') {
      const stream = gun.get(node);
      stream.map().once((m) => {
        setMessageChain((messageChain) => {
          if (messageChain[0] !== m) {
            return [m, ...messageChain];
          } else {
            return [...messageChain];
          }
        });
      });
    }

    return () => {
      //cleanup to close connection. Avoids multiple connections
      gun.off();
    }
  }, [node]);

  function saveMessage() {
    const messages = gun.get(node);
    const date = new Date();
    messages.set({
      username: authUser.username,
      message: message,
      createdAt: date.toUTCString(),
    });
    setMessage('');
  }

  return (
    <>
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
          {messageChain.map((msg) => (
            <Typography
              key={messageChain.indexOf(msg)}
            >{`${msg.createdAt}:    ${msg.username}: ${msg.message}`}</Typography>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default MessageDisplay;
