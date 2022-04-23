import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cheeseMarker from '../assets/cheese-pin.png';
import userMarker from '../assets/userMarker.png';
import { Icon } from 'leaflet';
import ChangeView from '../components/MapComponents/ChangeView';
import PostSlider from '../components/MapComponents/PostSlider';
import {
  Container,
  Fab,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import { usePosts } from '../providers/PostProvider';
import { useTheme } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import shortid from 'shortid';

import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

const userIcon = new Icon({
  iconUrl: userMarker,
  iconSize: [32, 32],
});

function MapPage() {
  const theme = useTheme();
  const [hasLocationAccess, setHasLocationAccess] = useState(
    JSON.parse(window.sessionStorage.getItem('locationAccess'))
  );
  const [userLocation, setUserLocation] = useState([-33.9321, 18.8602]);
  const [focusedPost, setFocusedPost] = useState(null);
  const [centerLocation, setCenterLocation] = useState([-33.9321, 18.8602]);
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
          message="Provide location access"
        />
      </Snackbar>
      <MapContainer center={userLocation} zoom={16} style={{ height: '40vh' }}>
        <ChangeView center={centerLocation} zoom={16} />
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
      </MapContainer>
      <Container>
        <PostSlider posts={posts} focusedPost={focusedPost} />
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
