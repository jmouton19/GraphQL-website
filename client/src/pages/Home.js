import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import React from 'react';
import PostCard from '../components/PostCard';
import { usePosts } from '../providers/PostProvider';

import shortid from 'shortid';

import AddPostCard from '../components/AddPostCard';

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
            <AddPostCard />
            {data.map((postData) => (
              <PostCard key={shortid.generate()} postData={postData} />
            ))}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Feed;
