import { gql, useApolloClient } from '@apollo/client';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddPostCard from '../components/PostComponents/AddPostCard';
import PostList from '../components/PostComponents/PostList';
import { useAuthUser } from '../providers/AuthProvider';
import PostProvider from '../providers/PostProvider';

function Feed() {
  const authUser = useAuthUser();
  const client = useApolloClient();

  // fetch correct membership id to make individual posts
  const [creatorId, setCreatorId] = useState(1);
  useEffect(() => {
    if (authUser) {
      client
        .query({
          query: gql`
            query {
              users(where: { email: { eq: "${authUser.email}" } }) {
                memberships {
                  id
                  groupId
                }
              }
            }
          `,
        })
        .then((result) => {
          result.data.users[0].memberships.forEach((membership) => {
            if (membership.groupId === null) {
              setCreatorId(membership.id)
            }
          });
        });
    }
  }, [authUser, client]);

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
