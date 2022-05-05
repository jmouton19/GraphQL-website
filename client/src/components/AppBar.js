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
import { useAuthUser, useLogOut } from '../providers/AuthProvider';
import logo from '../assets/logo.png';
import { Stack } from '@mui/material';

import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from "react-i18next";

function PrimaryAppBar() {
  const { t } = useTranslation();
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
          <LanguageSelector/>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title={t("feedView.label")}>
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

          <Tooltip title={t("mapView.label")}>
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

          <SearchMenu />

          <Tooltip title={t("directMessages.label")}>
            <IconButton size="large" color="primary">
              <ChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("notifications.label")}>
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
                {t("login.label")}
              </MenuItem>
            )}
            {!authUser && (
              <MenuItem
                component={Link}
                to={`/signup`}
                onClick={handleUserMenuClose}
              >
                {t("signUp.label")}
              </MenuItem>
            )}
            {authUser && (
              <MenuItem
                component={Link}
                to={`/profile/${authUser.username}`}
                onClick={handleUserMenuClose}
              >
                {t("profile.label")}
              </MenuItem>
            )}
            {authUser && (
              <MenuItem
                component={Link}
                to={`/groups`}
                onClick={handleUserMenuClose}
              >
                {t("findGroups.label")}
              </MenuItem>
            )}
            {authUser && (
              <MenuItem
                onClick={() => {
                  logOut();
                }}
              >
                {t("logout.label")}
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default PrimaryAppBar;
