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

const emptyPostData = {
  description: '',
  videoPublicID: '',
};

function AddPostCard() {
  const [newPostData, setNewPostData] = useState(emptyPostData);

  const handleUploadSuccess = (publicID) => {
    setNewPostData({
      ...newPostData,
      videoPublicID: publicID,
    });
  };

  const hasVideoData = newPostData.videoPublicID !== '';
  const hasTextData = newPostData.description !== '';

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar />
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
        <Tooltip title="Add Video">
          <IconButton
            color="primary"
            disabled={hasVideoData}
            onClick={() => {
              console.log('Clicked');
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
            alert(JSON.stringify(newPostData));
            console.log(newPostData);
          }}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddPostCard;
