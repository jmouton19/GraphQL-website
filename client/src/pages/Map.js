import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container } from '@mui/material';
import marker from '../assets/cheese-pin.png';
import { Icon } from 'leaflet';

const myIcon = new Icon({
 iconUrl: marker,
 iconSize: [32,46]
})

function Map() {
  return (
    <>
      <Container maxWidth="md">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '50vh' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          />
          <Marker position={[51.505, -0.09]} icon={myIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Container>
    </>
  );
}

export default Map;
