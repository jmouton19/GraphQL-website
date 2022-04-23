import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { Divider } from '@mui/material';
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import {
  useCommentAdd,
  useCommentRemove,
  useComments,
} from '../providers/CommentProvider';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

import shortid from 'shortid';

const emptyComment = {
  id: shortid.generate(),
  name: 'This User',
  avatarURL: null,
  text: '',
};

function CommentViewer() {
  const [newCommentData, setNewCommentData] = useState(emptyComment);
  const commentsData = useComments();
  const removeComment = useCommentRemove();
  const addComment = useCommentAdd();

  return (
    <Stack spacing={2}>
      <Typography paragraph>
        {commentsData.length === 0 ? 'No comments yet.' : 'Comments:'}
      </Typography>
      {commentsData.map((comment) => (
        <Stack key={comment.id} spacing={2} direction="row">
          <Avatar src={comment.creator.user.avatar} />
          <Paper
            style={{
              backgroundColor: '#222222',
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <Typography variant="caption">
              <strong>{`${comment.creator.user.firstName} ${comment.creator.user.lastName}`}</strong>
            </Typography>
            <br></br>
            <Typography variant="caption">{comment.body}</Typography>
          </Paper>
          <IconButton
            style={{ marginLeft: 'auto' }}
            onClick={() => removeComment(comment)}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      ))}
      <Divider />
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Write a comment..."
          value={newCommentData.text}
          variant="outlined"
          onChange={(event) => {
            setNewCommentData({ ...newCommentData, text: event.target.value });
          }}
        />
        <IconButton
          onClick={() => {
            addComment(newCommentData);
            setNewCommentData(emptyComment);
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default CommentViewer;
