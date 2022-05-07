import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import PostSwiper from '../components/MapComponents/PostSwiper';
import {
  Container,
  Fab,
  FormControl,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
} from '@mui/material';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useUserLocation } from '../providers/LocationProvider';
import MapView from '../components/MapComponents/MapView';
import PostProvider from '../providers/PostProvider';

function scaleSlider(value) {
  return 0.9 ** -value - 1;
}

function MapPage() {
  const [focusedPost, setFocusedPost] = useState(null);
  const [radius, setRadius] = useState(30);
  const [useRadius, setUseRadius] = useState(false);

  const [centerLocation, setCenterLocation] = useState([-33.9321, 18.8602]);

  const { t } = useTranslation();
  const userLocation = useUserLocation();

  useEffect(() => {
    setCenterLocation(userLocation);
  }, [userLocation]);

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

  return (
    <PostProvider page="map" location={userLocation}>
      <MapView
        centerLocation={centerLocation}
        setCenterLocation={setCenterLocation}
        setFocusedPost={setFocusedPost}
        useRadius={useRadius}
        radius={radius}
      />
      <Container>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          mt={2}
          alignItems="center"
        >
          <FormControl>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={`${t('radius.label')}: ${(
                (0.9 ** -radius - 1) /
                10
              ).toFixed(0)} km`}
              labelPlacement="end"
              value={useRadius}
              onChange={() => setUseRadius(!useRadius)}
            />
          </FormControl>
          <Box sx={{ width: '50%' }}>
            <Slider
              max={100}
              value={radius}
              onChange={handleRadiusChange}
              disabled={!useRadius}
              scale={scaleSlider}
            />
          </Box>
        </Stack>
        <PostSwiper focusedPost={focusedPost} />
      </Container>
      <Fab
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}
        color="primary"
        aria-label="edit"
        onClick={() => {
          setCenterLocation([...userLocation]);
        }}
      >
        <CenterFocusStrongIcon />
      </Fab>
    </PostProvider>
  );
}

export default MapPage;
