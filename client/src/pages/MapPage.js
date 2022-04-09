import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cheeseMarker from '../assets/cheese-pin.png';
import { Icon } from 'leaflet';
import ChangeView from '../components/MapComponents/ChangeView';
import PostSlider from '../components/MapComponents/PostSlider';
import { Container } from '@mui/material';

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

const posts = [
  { id: 1, location: [-33.9321, 18.8602] },
  { id: 2, location: [-33.9421, 18.8702] },
  { id: 3, location: [-33.9521, 18.8802] },
  { id: 4, location: [-33.9321, 18.8902] },
  { id: 5, location: [-33.9421, 18.8502] },
  { id: 6, location: [-33.9521, 18.8402] },
];

function MapPage() {
  const [userLocation, setUserLocation] = useState([-33.9321, 18.8602]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={16}
        style={{ height: '50vh', marginTop: '65px' }}
      >
        <ChangeView center={userLocation} zoom={16} />
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <Marker position={userLocation} icon={cheeseIcon}>
          <Popup>
            You are Gru-<b>hère</b>.
          </Popup>
        </Marker>
        {posts.map((post)=> (
          <Marker key={post['id']} position={post['location']} icon={cheeseIcon}/>
        ))}
      </MapContainer>
      <Container flexGrow>
        <PostSlider posts={posts}/>
      </Container>
    </>
  );
}

export default MapPage;
