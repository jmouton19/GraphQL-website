import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddPostCard from '../components/posts/AddPostCard';
import PostList from '../components/posts/PostList';
import { useAuthUser } from '../providers/AuthProvider';
import PostProvider from '../providers/PostProvider';

function Feed() {
  const authUser = useAuthUser();

  // find correct membership id to make individual posts
  const [creatorId, setCreatorId] = useState(null);
  useEffect(() => {
    if (authUser) {
      authUser.memberships.forEach((membership) => {
        if (membership.groupId === null) {
          setCreatorId(membership.id);
        }
      });
    }
  }, [authUser]);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          sx={{
            padding: 2,
          }}
        >
          <PostProvider>
            <Stack spacing={2}>
              {creatorId && <AddPostCard creatorId={creatorId} />}
              <PostList />
            </Stack>
          </PostProvider>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Feed;
