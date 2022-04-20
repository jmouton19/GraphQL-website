import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import cheeseMarker from '../assets/cheese-pin.png';
import { Avatar, Typography } from '@mui/material';
import { usePosts } from '../providers/PostProvider';
import PostCard from '../components/PostCard';
import { gql, useApolloClient } from '@apollo/client';
import shortid from 'shortid';
import { useAuthUser } from '../providers/AuthProvider';
import { useParams } from 'react-router-dom';
import {
  useNotifyError,
  useNotifySuccess,
} from '../providers/NotificationProvider';
import LoadingPage from './LoadingPage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { stringToObject } from '../utils/utils';

function Profile() {
  const authUser = useAuthUser();
  const [viewUser, setViewUser] = useState(null);
  const client = useApolloClient();
  const params = useParams();
  const data = usePosts();
  const [activeTabNumber, setActiveTabNumber] = useState('1');
  const notifyError = useNotifyError();
  const notifySuccess = useNotifySuccess();

  const handleTabChange = (event, newValue) => {
    setActiveTabNumber(newValue);
  };

  useEffect(() => {
    if (params.username === authUser.username) {
      setViewUser(authUser);
    } else {
      loadViewUser();
    }
  }, [params]);

  function loadViewUser() {
    client
      .query({
        query: gql`
      query {
        users(where: { username: { eq: "${params.username}" } }) {
          email
          id
          firstName
          lastName
          avatar
          username
        }
      }
    `,
      })
      .then((result) => {
        const retrievedProfile = result.data.users[0];
        if (retrievedProfile) {
          setViewUser(retrievedProfile);
        } else {
          notifyError('Could not load user profile from server.');
        }
      });
  }

  function addFriend() {
    client
      .mutate({
        mutation: gql`
        mutation {
          addFriend(input: { senderId: ${authUser.id}, receiverId: ${viewUser.id} })
        }
      `,
      })
      .then((result) => {
        let resultData = stringToObject(result.data.addFriend);
        if (resultData.success == 'true') {
          notifySuccess(resultData.message);
        } else {
          notifyError(resultData.message);
        }
      });
  }

  function acceptFriend() {
    client
      .mutate({
        mutation: gql`
        mutation {
          addFriend(input: { senderId: ${authUser.id}, receiverId: ${viewUser.id} })
        }
      `,
      })
      .then((result) => {
        let resultData = stringToObject(result.data.addFriend);
        if (resultData.success == 'true') {
          notifySuccess(resultData.message);
        } else {
          notifyError(resultData.message);
        }
      });
  }

  if (!viewUser) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <Stack direction="column" spacing={1} mt={12} alignItems="center">
        <Avatar
          src={viewUser.avatar}
          sx={{
            width: 200,
            height: 200,
            border: 4,
            borderColor: '#ffc619',
          }}
        />
        <Typography variant="h4">{`${viewUser.firstName} ${viewUser.lastName}`}</Typography>
        <Stack direction="row" spacing={0.2} alignItems="center">
          <img
            alt="Location Icon"
            src={cheeseMarker}
            style={{ width: 25, height: 35, marginRight: 10 }}
          />
          <Typography variant="h6">Cape Town, South Africa</Typography>
          {authUser !== viewUser && (
            <IconButton color="primary" onClick={() => addFriend()}>
              <PersonAddIcon fontSize="large" />
            </IconButton>
          )}
        </Stack>
        <Typography>Bio ?</Typography>
      </Stack>
      {authUser === viewUser && (
        <TabContext value={activeTabNumber}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Stack direction="row">
              <TabList
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Groups" value="2" />
                <Tab label="Friends" value="3" />
              </TabList>
            </Stack>
          </Box>
          <TabPanel value="1">
            <Stack spacing={2}>
              {data.map((postData) => (
                <PostCard key={shortid.generate()} postData={postData} />
              ))}
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Typography>Add groups</Typography>
          </TabPanel>
          <TabPanel value="3">
            <Typography>Add friends</Typography>
          </TabPanel>
        </TabContext>
      )}
    </Container>
  );
}
export default Profile;
