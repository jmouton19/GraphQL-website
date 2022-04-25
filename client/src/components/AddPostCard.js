import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';

import { showUploadWidget } from './cloudindary/upload';
import { CardMedia } from '@mui/material';
import VideoPlayer from './cloudindary/VideoPlayer';
import { useAddPost } from '../providers/PostProvider';
import {
  useNotifyError,
  useNotifySuccess,
} from '../providers/NotificationProvider';

const emptyPostData = {
  description: '',
  videoPublicID: '',
};

function AddPostCard({ creatorId }) {
  const [newPostData, setNewPostData] = useState(emptyPostData);

  const handleUploadSuccess = (publicID) => {
    setNewPostData({
      ...newPostData,
      videoPublicID: publicID,
    });
  };

  const addPost = useAddPost();

  const hasVideoData = newPostData.videoPublicID !== '';
  const hasTextData = newPostData.description !== '';

  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar />
          {!hasVideoData && (
            <TextField
              fullWidth
              id="outlined-basic"
              label="Say Something..."
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
        <Tooltip title="Add Video Instead">
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
            addPost(video, body, creatorId)
              .then((message) => notifySuccess(message))
              .catch((message) => notifyError(message));
          }}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddPostCard;
