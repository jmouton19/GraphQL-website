import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import React from 'react';
import PostCard from '../components/PostCard';
import { usePosts } from '../providers/PostProvider';

function Feed() {
  const data = usePosts();
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          sx={{
            padding: 2,
            paddingTop: 10,
          }}
        >
          <Stack spacing={2}>
            {data.map((postData) => (
              <PostCard postData={postData} frameHeight="460" />
            ))}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Feed;
