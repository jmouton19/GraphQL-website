import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cheeseMarker from '../assets/cheese-pin.png';
import userMarker from '../assets/userMarker.png';
import { Icon } from 'leaflet';
import ChangeView from '../components/MapComponents/ChangeView';
import PostSlider from '../components/MapComponents/PostSlider';
import {
  Container,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  Snackbar,
  SnackbarContent,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { usePosts } from '../providers/PostProvider';
import { useTheme } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import shortid from 'shortid';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

const userIcon = new Icon({
  iconUrl: userMarker,
  iconSize: [32, 32],
});

function MapPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [hasLocationAccess, setHasLocationAccess] = useState(
    JSON.parse(window.sessionStorage.getItem('locationAccess'))
  );
  const [userLocation, setUserLocation] = useState([-33.9321, 18.8602]);
  const [focusedPost, setFocusedPost] = useState(null);
  const [centerLocation, setCenterLocation] = useState([-33.9321, 18.8602]);
  const [radius, setRadius] = useState(30);
  const [useRadius, setUseRadius] = useState(false);
  const posts = usePosts();

  useEffect(() => {
    if (hasLocationAccess) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [hasLocationAccess]);

  useEffect(() => {
    setCenterLocation(userLocation);
  }, [userLocation]);

  function setLocationAccessState(state) {
    setHasLocationAccess(state);
    window.sessionStorage.setItem('locationAccess', state);
  }

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

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
      <MapContainer center={userLocation} zoom={12} style={{ height: '40vh' }} >
        <ChangeView center={centerLocation}/>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            You are Gru-<b>hère</b>.
          </Popup>
        </Marker>
        {posts.map((post) => (
          <Marker
            key={shortid.generate()}
            position={[post.latitude, post.longitude]}
            icon={cheeseIcon}
            eventHandlers={{
              click: () => {
                setFocusedPost(post);
                setCenterLocation([post.latitude, post.longitude]);
              },
            }}
          >
            <Popup>{post.video ? 'Video' : post.body}</Popup>
          </Marker>
        ))}
        {useRadius && (
          <Circle center={userLocation} radius={radius*100}/>
        )}
      </MapContainer>
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
              label={`${t('radius.label')}: ${(radius/10).toFixed(0)} km`}
              labelPlacement="end"
              value={useRadius}
              onChange={() => setUseRadius(!useRadius)}
            />
          </FormControl>
          <Box sx={{ width: '50%' }}>
            <Slider
              max={15000}
              value={radius}
              onChange={handleRadiusChange}
              disabled={!useRadius}
            />
          </Box>
        </Stack>
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
    </>
  );
}

export default MapPage;
