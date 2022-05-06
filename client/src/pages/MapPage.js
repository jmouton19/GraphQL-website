import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cheeseMarker from '../assets/cheese-pin.png';
import userMarker from '../assets/userMarker.png';
import { Icon } from 'leaflet';
import ChangeView from '../components/MapComponents/ChangeView';
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
import { usePosts } from '../providers/PostProvider';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useUserLocation } from '../providers/LocationProvider';

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

const userIcon = new Icon({
  iconUrl: userMarker,
  iconSize: [32, 32],
});

function scaleSlider(value) {
  return 0.9 ** -value - 1;
}

function MapPage() {
  const [focusedPost, setFocusedPost] = useState(null);
  const [centerLocation, setCenterLocation] = useState([-33.9321, 18.8602]);
  const [radius, setRadius] = useState(30);
  const [useRadius, setUseRadius] = useState(false);

  const posts = usePosts();
  const { t } = useTranslation();
  const userLocation = useUserLocation();

  useEffect(() => {
    setCenterLocation(userLocation);
  }, [userLocation]);

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

  return (
    <>
      <MapContainer center={userLocation} zoom={12} style={{ height: '40vh' }}>
        <ChangeView center={centerLocation} />
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
            key={post.id}
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
          <Circle center={userLocation} radius={(0.9 ** -radius - 1) * 100} />
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
        <PostSwiper posts={posts} focusedPost={focusedPost} />
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
