import React, { useEffect, useState } from 'react';

import { useAuthUser } from '../providers/AuthProvider';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Container,
} from '@mui/material';
import { useApolloClient, gql } from '@apollo/client';
import MessageDisplay from '../components/MessageDisplay';

export default function DirectMessages() {
  const client = useApolloClient();
  const authUser = useAuthUser();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [node, setNode] = useState('');

  useEffect(() => {
    getFriends();
  }, []);

  const startStream = (friend) => {
    setSelectedFriend(friend);
    if (authUser.username.localeCompare(friend.username) === -1) {
      setNode(authUser.username.concat(friend.username));
    } else {
      setNode(friend.username.concat(authUser.username));
    }
  };

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
      <Container>
        <Grid container padding={2} spacing={1}>
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
            <MessageDisplay node={node} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
