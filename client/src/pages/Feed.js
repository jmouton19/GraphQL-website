import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import React from 'react';
import PostCard from '../components/PostCard';
import { usePosts } from '../providers/PostProvider';

import shortid from 'shortid';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';

import { showUploadWidget } from '../components/cloudindary/upload';

function Feed() {
  const data = usePosts();
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Stack spacing={2}>
            <Paper style={{ padding: 20 }}>
              <Button
                variant="contained"
                onClick={() => {
                  showUploadWidget();
                }}
              >
                {' '}
                Add Video
              </Button>
            </Paper>

            {data.map((postData) => (
              <PostCard
                key={shortid.generate()}
                postData={postData}
                frameHeight="460"
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Feed;
