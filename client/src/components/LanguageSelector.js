import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (event, lng) => {
    if (lng !== null) {
      setLanguage(lng);
    }
  };

  return (
    <ToggleButtonGroup
      value={language}
      exclusive
      onChange={changeLanguage}
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="de">DE</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSelector;
