import React from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ChangeView from './ChangeView';
import cheeseMarker from '../../assets/cheese-pin.png';
import userMarker from '../../assets/userMarker.png';
import { Icon } from 'leaflet';
import { useUserLocation } from '../../providers/LocationProvider';
import { usePosts } from '../../providers/PostProvider';

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

const userIcon = new Icon({
  iconUrl: userMarker,
  iconSize: [32, 32],
});

function MapView({
  centerLocation,
  setCenterLocation,
  setFocusedPost,
  useRadius,
  radius,
}) {
  const userLocation = useUserLocation();
  const posts = usePosts();

  return (
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
  );
}

export default MapView;
