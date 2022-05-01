import React from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ToggleButtonGroup exclusive  color='primary'>
      <Tooltip title="English">
        <ToggleButton onClick={() => changeLanguage("en")}>
          EN
        </ToggleButton>
      </Tooltip>

      <Tooltip title="Deutsch">
        <ToggleButton onClick={() => changeLanguage("de")}>
          DE
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default LanguageSelector;
