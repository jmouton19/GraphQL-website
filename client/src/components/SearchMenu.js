import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItem,
} from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { gql, useApolloClient } from '@apollo/client';
import { useNotifyError } from '../providers/NotificationProvider';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

export default function SearchMenu() {
  const client = useApolloClient();
  const notifyError = useNotifyError();
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchMenuAnchorEl, setSearchMenuAnchorEl] = useState(null);

  const searchForGroups = useCallback(() => {
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
  }, [searchValue, client, notifyError]);

  const searchForUsers = useCallback(() => {
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
  }, [searchValue, client, notifyError]);

  useEffect(() => {
    searchForGroups();
    searchForUsers();
  }, [searchValue, searchForGroups, searchForUsers]);

  const handleSearchMenu = (event) => {
    setSearchMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setSearchMenuAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton size="large" color="primary" onClick={handleSearchMenu}>
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="menu-appbar"
        anchorEl={searchMenuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(searchMenuAnchorEl)}
        onClose={handleUserMenuClose}
      >
        <ListItem onKeyDown={(e) => e.stopPropagation()}>
          <TextField
            variant="outlined"
            label="Search"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </ListItem>
        {groups.length !== 0 && (
          <ListItem>
            <Divider component="div" />
            <div>
              <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
                Groups
              </Typography>
            </div>
          </ListItem>
        )}
        {groups &&
          groups.map((group) => {
            return (
              <MenuItem
                key={group.id}
                component={Link}
                to={`/group/${group.id}`}
              >
                <ListItemAvatar>
                  <Avatar src={group.avatar} />
                </ListItemAvatar>

                <ListItemText
                  primary={group.name}
                  secondary={group.description}
                />
              </MenuItem>
            );
          })}
        {users.length !== 0 && (
          <MenuItem>
            <Divider component="div" />
            <div>
              <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
                Users
              </Typography>
            </div>
          </MenuItem>
        )}
        {users &&
          users.map((user) => {
            return (
              <MenuItem
                key={user.id}
                component={Link}
                to={`/profile/${user.username}`}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>

                <ListItemText
                  primary={user.username}
                  secondary={`${user.firstName} ${user.lastName}`}
                />
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
}
