import React, { useState, useEffect } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import deFlag from '../assets/flags/de.png';
import enFlag from '../assets/flags/en.png';
import ruFlag from '../assets/flags/ru.png';
import espFlag from '../assets/flags/esp.png';
import frFlag from '../assets/flags/fr.png';
import chFlag from '../assets/flags/ch.png';

import { useTranslation } from 'react-i18next';

const languages = [
  {
    title: 'English',
    flag: enFlag,
    language: 'en',
  },
  {
    title: 'Deutsch',
    flag: deFlag,
    language: 'de',
  },
  {
    title: 'Русский',
    flag: ruFlag,
    language: 'ru',
  },
  {
    title: 'Español',
    flag: espFlag,
    language: 'esp',
  },
  {
    title: 'Français',
    flag: frFlag,
    language: 'fr',
  },
  {
    title: '中国',
    flag: chFlag,
    language: 'ch',
  }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(languages[0]);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  useEffect(() => {
    i18n.changeLanguage(language['language']);
  }, [language, i18n]);

  const handleMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenu}>
        <Avatar src={language['flag']} sx={{ height: 25, width: 25 }} />
      </IconButton>
      <Menu
        anchorEl={userMenuAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
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
        {languages.map((lng) => (
          <MenuItem
          key = {lng.language}
            selected={lng.title === language.title}
            onClick={() => {
              setLanguage(lng);
              handleUserMenuClose();
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={lng.flag} sx={{ height: 25, width: 25 }}/>
              <Typography>{lng.title}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
