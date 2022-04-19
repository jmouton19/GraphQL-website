import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledLink from './StyledLink';
import { gql, useApolloClient } from '@apollo/client';
import { useNotifyError } from '../providers/NotificationProvider';

export default function SearchMenu({ open }) {
  const client = useApolloClient();
  const notifyError = useNotifyError();
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    searchForGroups();
    searchForUsers();
  }, [searchValue]);

  function searchForGroups() {
    if (searchValue !== '') {
      client
        .query({
          query: gql`
        query {
          groups(
            where:{ name: { contains: "${searchValue}" }}
            
          ) {
            name
            id
            description
          }
          }
        `,
        })
        .then((result) => {
          const retrievedGroups = result.data.groups;
          if (retrievedGroups) {
            setGroups(retrievedGroups);
          } else {
            notifyError('Could not load groups from server.');
          }
        });
    } else {
      setGroups([]);
    }
  }

  function searchForUsers() {
    if (searchValue !== '') {
      client
        .query({
          query: gql`
        query {
          users(
            where:{ 
              or: [{firstName: { contains: "${searchValue}" }}, {lastName: {contains: "${searchValue}"}}, {username: {contains: "${searchValue}"}}]
            }
          ) {
            username
            id
            firstName
            lastName
          }
          }
        `,
        })
        .then((result) => {
          const retrievedUsers = result.data.users;
          if (retrievedUsers) {
            setUsers(retrievedUsers);
          } else {
            notifyError('Could not load users from server.');
          }
        });
    } else {
      setUsers([]);
    }
  }

  if (open)
    return (
      <div
        sx={{
          position: 'fixed',
          width: '5000',
          height: '5000',
          zIndex: 9999998,
          backGroundColor: 'black',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            maxHeight: '90%',
            zIndex: 9999999,
          }}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem>
              <TextField
                variant="outlined"
                label="Search"
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </ListItem>
            {groups.length !== 0 && (
              <ListItem>
                <Divider component="li" />
                <li>
                  <Typography
                    sx={{ mt: 0.5, ml: 2 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Groups
                  </Typography>
                </li>
              </ListItem>
            )}
            {groups &&
              groups.map((group) => {
                return (
                  <StyledLink key={group.id} to={`/group/${group.id}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={group.avatar} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={group.name}
                        secondary={group.description}
                      />
                    </ListItem>
                  </StyledLink>
                );
              })}
            {users.length !== 0 && (
              <ListItem>
                <Divider component="li" />
                <li>
                  <Typography
                    sx={{ mt: 0.5, ml: 2 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Users
                  </Typography>
                </li>
              </ListItem>
            )}
            {users &&
              users.map((user) => {
                return (
                  <StyledLink key={user.id} to={`/profile/${user.username}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={user.avatar} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={user.username}
                        secondary={`${user.firstName} ${user.lastName}`}
                      />
                    </ListItem>
                  </StyledLink>
                );
              })}
          </List>
        </Paper>
      </div>
    );

  return null;
}
