import React, { useEffect, useState } from 'react';
import Gun from 'gun';
import { useAuthUser } from '../providers/AuthProvider';
import {
  FormControl,
  Stack,
  InputLabel,
  OutlinedInput,
  Typography,
  IconButton,
  Box,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const gun = Gun({
  peers: ['http://localhost:3030/gun','https://cs334gun.herokuapp.com/gun'],
});

function MessageDisplay({ node }) {
  const authUser = useAuthUser();
  const [message, setMessage] = useState('');
  const [messageChain, setMessageChain] = useState([]);

  useEffect(() => {
    setMessageChain([]);
    if (node !== '') {
      const stream = gun.get(node);
      stream.map().on((m) => {
        if (m !== undefined) {
          setMessageChain((messageChain) => {
            if (messageChain[0] !== m) {
              return [m, ...messageChain];
            } else {
              return [...messageChain];
            }
          });
        }
      }, true);
    }

    return () => {
      //cleanup to close connection. Avoids multiple connections
      gun.off();
    };
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
      <Stack padding={2} spacing={1}>
        <FormControl fullWidth>
          <InputLabel>Message</InputLabel>
          <OutlinedInput
            value={message}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                saveMessage();
              }
            }}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            label="Message"
            endAdornment={
              <IconButton onClick={saveMessage} color="primary">
                <SendIcon />
              </IconButton>
            }
          />
        </FormControl>
        <Box height="75vh" sx={{ overflowY: 'scroll', overflowX: 'hidden' }}>
          <Stack spacing={2}>
            {messageChain.map((msg) => (
              <Stack
                key={messageChain.indexOf(msg)}
                spacing={2}
                direction="row"
                alignSelf={
                  msg.username === authUser.username ? 'flex-end' : 'flex-start'
                }
              >
                <Paper
                  style={{
                    backgroundColor: '#222222',
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  <Typography variant="caption">
                    <strong>{`${msg.username} `}</strong>
                  </Typography>
                  <br></br>
                  <Typography variant="caption">{msg.message}</Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default MessageDisplay;
