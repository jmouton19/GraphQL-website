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
import { useNotify } from '../providers/NotificationProvider';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function SearchMenu() {
  const { t } = useTranslation();
  const client = useApolloClient();
  const notify = useNotify();
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
              avatar
            }
            }
          `,
        })
        .then((result) => {
          const retrievedGroups = result.data.groups;
          if (retrievedGroups) {
            setGroups(retrievedGroups);
          } else {
            notify('error', 'Could not load groups from server.');
          }
        });
    } else {
      setGroups([]);
    }
  }, [searchValue, client, notify]);

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
              avatar
            }
            }
          `,
        })
        .then((result) => {
          const retrievedUsers = result.data.users;
          if (retrievedUsers) {
            setUsers(retrievedUsers);
          } else {
            notify('error', 'Could not load users from server.');
          }
        });
    } else {
      setUsers([]);
    }
  }, [searchValue, client, notify]);

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
      <Tooltip title={t('search.label')}>
        <IconButton size="large" color="primary" onClick={handleSearchMenu}>
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="menu-appbar"
        anchorEl={searchMenuAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
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
            label={t('search.label')}
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
                {t('groups.label')}
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
          <ListItem>
            <Divider component="div" />
            <div>
              <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
                {t('users.label')}
              </Typography>
            </div>
          </ListItem>
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
