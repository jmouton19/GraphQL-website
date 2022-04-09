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

function PrimaryAppBar() {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <StyledLink to="/">
            <Typography variant="h6" component="div" color="primary">
              <b>Kasie</b>
            </Typography>
          </StyledLink>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton size="large" color="primary">
            <SearchIcon />
          </IconButton>

          <IconButton size="large" color="primary">
            <ChatIcon />
          </IconButton>

          <IconButton size="large" color="primary">
            <NotificationsIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              src={
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
            ></Avatar>
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
            <MenuItem
              component={Link}
              to={`/map`}
              onClick={handleUserMenuClose}
            >
              Map
            </MenuItem>
            <MenuItem
              component={Link}
              to={`/feed`}
              onClick={handleUserMenuClose}
            >
              Feed
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default PrimaryAppBar;
