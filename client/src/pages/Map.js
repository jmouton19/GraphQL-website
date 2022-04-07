import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import marker from '../assets/cheese-pin.png';
import { Icon } from 'leaflet';

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 46],
});

function Map() {
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
        zoom={13}
        style={{ height: '50vh', marginTop: '65px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <Marker position={userLocation} icon={myIcon}>
          <Popup>
            You are Gruyère.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default Map;
