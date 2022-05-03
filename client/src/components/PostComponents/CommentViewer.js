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
} from '../../providers/CommentProvider';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import LoadingPage from '../../pages/LoadingPage';

function CommentViewer() {
  const [newCommentBody, setNewCommentBody] = useState('');
  const commentsData = useComments();
  const removeComment = useCommentRemove();
  const addComment = useCommentAdd();

  if (commentsData === null) {
    return <LoadingPage minHeight={5} />;
  }

  return (
    <Stack spacing={2}>
      <Typography paragraph>
        {commentsData.length === 0 ? 'No comments yet.' : 'Comments:'}
      </Typography>
      {commentsData.map((comment) => (
        <Stack key={comment.id} spacing={2} direction="row">
          <Avatar src={comment.creator.avatar} />
          <Paper
            style={{
              backgroundColor: '#222222',
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <Typography variant="caption">
              <strong>{`${comment.creator.firstName} ${comment.creator.lastName}`}</strong>
            </Typography>
            <br></br>
            <Typography variant="caption">{comment.body}</Typography>
          </Paper>
          <IconButton
            style={{ marginLeft: 'auto' }}
            onClick={() => removeComment(comment.id)}
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
          value={newCommentBody}
          variant="outlined"
          onChange={(event) => {
            setNewCommentBody(event.target.value);
          }}
        />
        <IconButton
          onClick={() => {
            if (newCommentBody !== '') {
              addComment(newCommentBody);
              setNewCommentBody('');
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default CommentViewer;
