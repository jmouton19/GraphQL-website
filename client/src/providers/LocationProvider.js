import { Close as CloseIcon } from '@mui/icons-material';
import { Done as DoneIcon } from '@mui/icons-material';
import { SnackbarContent } from '@mui/material';
import { useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import { Snackbar } from '@mui/material';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const UserLocationContext = createContext();

export function useUserLocation() {
  return useContext(UserLocationContext);
}

function LocationProvider({ children }) {
  const [hasLocationAccess, setHasLocationAccess] = useState(
    JSON.parse(window.sessionStorage.getItem('locationAccess'))
  );
  const [userLocation, setUserLocation] = useState([-33.9321, 18.8602]);

  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (hasLocationAccess) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [hasLocationAccess]);

  function setLocationAccessState(state) {
    setHasLocationAccess(state);
    window.sessionStorage.setItem('locationAccess', state);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={hasLocationAccess == null ? true : false}
      >
        <SnackbarContent
          sx={{ backgroundColor: theme.palette.primary.main }}
          action={
            <>
              <IconButton
                color="inherit"
                onClick={() => setLocationAccessState(true)}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => setLocationAccessState(false)}
              >
                <CloseIcon />
              </IconButton>
            </>
          }
          message={t('provideLocationAccess.label')}
        />
      </Snackbar>
      <UserLocationContext.Provider value={userLocation}>
        {children}
      </UserLocationContext.Provider>
    </>
  );
}

export default LocationProvider;
