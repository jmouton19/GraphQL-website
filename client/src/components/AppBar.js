import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import StyledLink from './StyledLink';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthUser, useLogOut } from '../providers/AuthProvider';
import logo from '../assets/logo.png';
import { Stack } from '@mui/material';

import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PrimaryAppBar() {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const authUser = useAuthUser();
  const logOut = useLogOut();

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <StyledLink to="/">
            <Stack spacing={1} direction="row">
              <img src={logo} alt="logo" style={{ height: 25 }} />
              <Typography variant="h6" component="div" color="primary">
                <b>'Kasie</b>
              </Typography>
            </Stack>
          </StyledLink>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Feed View">
            <IconButton
              size="large"
              color="primary"
              onClick={() => {
                navigate('/');
              }}
            >
              <FeedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Map View">
            <IconButton
              size="large"
              color="primary"
              onClick={() => {
                navigate('/map');
              }}
            >
              <MapIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Search">
            <IconButton size="large" color="primary">
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Direct Messages">
            <IconButton size="large" color="primary">
              <ChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton size="large" color="primary">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={authUser ? authUser.avatar : null}></Avatar>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={userMenuAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
          >
            {!authUser && (
              <MenuItem
                component={Link}
                to={`/login`}
                onClick={handleUserMenuClose}
              >
                Login
              </MenuItem>
            )}
            {!authUser && (
              <MenuItem
                component={Link}
                to={`/signup`}
                onClick={handleUserMenuClose}
              >
                Signup
              </MenuItem>
            )}
            {authUser && (
              <MenuItem
                component={Link}
                to={`/profile`}
                onClick={handleUserMenuClose}
              >
                Profile
              </MenuItem>
            )}
            {authUser && (
              <MenuItem
                component={Link}
                to={`/group`}
                onClick={handleUserMenuClose}
              >
                Group
              </MenuItem>
            )}
            {authUser && (
              <MenuItem onClick={handleUserMenuClose}>Find Groups</MenuItem>
            )}
            {authUser && (
              <MenuItem onClick={handleUserMenuClose}>My Groups</MenuItem>
            )}
            {authUser && (
              <MenuItem onClick={handleUserMenuClose}>My Friends</MenuItem>
            )}
            {authUser && (
              <MenuItem
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default PrimaryAppBar;
