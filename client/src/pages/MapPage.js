import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cheeseMarker from '../assets/cheese-pin.png';
import userMarker from '../assets/userMarker.png'
import { Icon } from 'leaflet';
import ChangeView from '../components/MapComponents/ChangeView';
import PostSlider from '../components/MapComponents/PostSlider';
import { Container, Fab } from '@mui/material';
import { usePosts } from '../providers/PostProvider';

import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

const userIcon = new Icon({
  iconUrl: userMarker,
  iconSize: [32, 32],
})

function MapPage() {
  const [userLocation, setUserLocation] = useState([-33.9321, 18.8602]);
  const [focusedPost, setFocusedPost] = useState(null);
  const [center, setCenter] = useState([-33.9321, 18.8602])
  const posts = usePosts();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    setCenter(userLocation);
  }, [userLocation])
  

  return (
    <>
      <MapContainer
        center={center}
        zoom={16}
        style={{ height: '40vh', marginTop: '65px' }}
      >
        <ChangeView center={center} zoom={16} />
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
            position={post.location}
            icon={cheeseIcon}
            eventHandlers={{
              click: (e) => {
                setFocusedPost(post);
                setCenter(post.location);
              },
            }}
          />
        ))}
      </MapContainer>
      <Container flexGrow>
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
          setCenter([...userLocation]);
        }}
      >
        <CenterFocusStrongIcon />
      </Fab>
    </>
  );
}

export default MapPage;
