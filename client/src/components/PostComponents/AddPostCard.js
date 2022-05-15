import React, { useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import cheeseMarker from '../../assets/cheese-pin.png';
import {
  Avatar,
  Box,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  CardMedia,
} from '@mui/material';

import { showUploadWidget } from '../cloudindary/upload';
import VideoPlayer from '../cloudindary/VideoPlayer';
import { useAddPost, useRefreshPosts } from '../../providers/PostProvider';
import { useNotify } from '../../providers/NotificationProvider';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import ChangeView from '../MapComponents/ChangeView';

import { useAuthUser } from '../../providers/AuthProvider'

const emptyPostData = {
  description: '',
  videoPublicID: '',
  latitude: -33.9321,
  longitude: 18.8602,
};

const cheeseIcon = new Icon({
  iconUrl: cheeseMarker,
  iconSize: [32, 46],
});

function LocationMarker(props) {
  const { newPostData } = props;
  useMapEvents({
    click(e) {
      props.setNewPostData({ ...newPostData, latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });
  return null;
}

function AddPostCard({ creatorId }) {
  const { t } = useTranslation();
  const [newPostData, setNewPostData] = useState(emptyPostData);
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);

  const handleLocationClick = (event) => {
    setLocationAnchorEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchorEl(null);
  };

  const handleUploadSuccess = (publicID) => {
    setNewPostData({
      ...newPostData,
      videoPublicID: publicID,
    });
  };

  const addPost = useAddPost();
  const refreshPosts = useRefreshPosts();

  const hasVideoData = newPostData.videoPublicID !== '';
  const hasTextData = newPostData.description !== '';

  const notify = useNotify();
  const authUser = useAuthUser();

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setNewPostData({ ...newPostData, latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={authUser.avatar} />
          {!hasVideoData && (
            <TextField
              fullWidth
              id="outlined-basic"
              label={t('saySomething.label')}
              value={newPostData.description}
              variant="outlined"
              onChange={(event) => {
                setNewPostData({
                  ...newPostData,
                  description: event.target.value,
                });
              }}
            />
          )}
        </Stack>
      </CardContent>
      {hasVideoData && (
        <CardMedia>
          <VideoPlayer
            cloudName="de7amnbmo"
            publicId={newPostData.videoPublicID}
          />
        </CardMedia>
      )}
      <CardActions>
        <Tooltip title={t('addVideo.label')}>
          <IconButton
            color="primary"
            disabled={hasVideoData || hasTextData}
            onClick={() => {
              showUploadWidget(handleUploadSuccess);
            }}
          >
            <VideocamIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('location.label')}>
          <IconButton onClick={handleLocationClick}>
            <AddLocationIcon color="primary" />
          </IconButton>
        </Tooltip>
        {(hasVideoData || hasTextData) && (
          <Button
            variant="outlined"
            color="error"
            style={{ marginLeft: 'auto' }}
            onClick={() => {
              setNewPostData(emptyPostData);
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          disabled={!(hasVideoData || hasTextData)}
          style={{ marginLeft: 'auto', marginRight: 10 }}
          onClick={() => {
            let video, body;
            if (hasVideoData) {
              video = true;
              body = newPostData.videoPublicID;
            } else if (hasTextData) {
              video = false;
              body = newPostData.description;
            }
            addPost(video, body, creatorId, newPostData.latitude, newPostData.longitude)
              .then((message) => {
                notify('success', message);
                setNewPostData(emptyPostData);
                refreshPosts();
              })
              .catch((message) => {
                notify('error', message);
              });
          }}
        >
          {t('post.label')}
        </Button>
      </CardActions>
      <Popover
        open={Boolean(locationAnchorEl)}
        anchorEl={locationAnchorEl}
        onClose={handleLocationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box mb={1}>
          <Stack spacing={1}>
            <MapContainer
              center={[newPostData.latitude, newPostData.longitude]}
              zoom={12}
              style={{ minWidth: 300, minHeight: 250 }}
            >
              <ChangeView center={[newPostData.latitude, newPostData.longitude]} />
              <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />
              <LocationMarker setNewPostData={setNewPostData} newPostData={newPostData} />
              <Marker position={[newPostData.latitude, newPostData.longitude]} icon={cheeseIcon} />
            </MapContainer>
            <Button onClick={useCurrentLocation}>
              {t('useCurrentLocation.label')}
            </Button>
          </Stack>
        </Box>
      </Popover>
    </Card>
  );
}

export default AddPostCard;
