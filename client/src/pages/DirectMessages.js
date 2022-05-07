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
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useApolloClient, gql } from '@apollo/client';

const gun = Gun({
  peers: ['http://localhost:3030/gun'],
});

const initialState = {
  messages: [],
};

function reducer(state, message) {
  switch (message.action) {
    case 'ADD':
      if (state.messages == undefined) {
        return {
          messages: [message],
        };
      } else {
        return {
          messages: [message, ...state.messages],
        };
      }
    case 'RESET':
      console.log('in here')
      return {
        ...initialState
      };
  }
}

export default function DirectMessages() {
  const client = useApolloClient();
  const authUser = useAuthUser();
  const [message, setMessage] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [node, setNode] = useState('');
  console.log(state);

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    if (node !== '') {
      const stream = gun.get(node);
      console.log(stream)
      stream.map().once((m) => {
        dispatch({
          username: m.username,
          message: m.message,
          createdAt: m.createdAt,
          action: 'ADD',
        });
      });
    }
  }, [node]);

  const startStream = (friend) => {
    setSelectedFriend(friend);
    dispatch({ action: 'RESET' });
    if (authUser.username.localeCompare(friend.username) == -1) {
      setNode(authUser.username.concat(friend.username));
    } else {
      setNode(friend.username.concat(authUser.username));
    }
  };

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

  const getFriends = () => {
    client
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
        query{
          sent:friendships(where: {and:[{ accepted: { eq: true } },{sender:{id:{eq:${authUser.id}}}}]})
          {
              receiver{
                  avatar
                  lastName
              firstName
                  id
                  username
              }
          }
           received:   friendships(where: {and:[{ accepted: { eq: true } },{receiver:{id:{eq:${authUser.id}}}}]})
          {
              sender{
                  avatar
                  lastName
                  firstName
                  id
                  username
              }
          }
      }
    `,
      })
      .then((result) => {
        setFriends([
          ...result.data.sent.map((a) => a.receiver),
          ...result.data.received.map((a) => a.sender),
        ]);
      });
  };

  return (
    <>
      <Grid container padding={2}>
        <Grid item xs={4}>
          <List>
            {friends.map((friend) => (
              <ListItemButton
                key={friend.id}
                selected={friend === selectedFriend}
              >
                <ListItem onClick={() => startStream(friend)}>
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={friend.username}
                    secondary={`${friend.firstName} ${friend.lastName}`}
                  />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
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
                <Typography
                  key={state.messages.indexOf(msg)}
                >{`${msg.createdAt}:    ${msg.username}: ${msg.message}`}</Typography>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
