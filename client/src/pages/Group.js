import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import cheeseMarker from '../assets/cheese-pin.png';

import { Avatar, Typography, AvatarGroup } from '@mui/material';
import { usePosts } from '../providers/PostProvider';
import PostCard from '../components/PostCard';

import shortid from 'shortid';
import AddPostCard from '../components/AddPostCard';
import { gql, useApolloClient } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Badge } from '@mui/material';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAuthUser } from '../providers/AuthProvider';
import Button from '@mui/material/Button';

function Group() {
  const data = usePosts();
  const [activeTabNumber, setActiveTabNumber] = React.useState('1');

  const [groupData, setGroupData] = useState(undefined);

  const authUser = useAuthUser();
  const [authUserIsMember, setAuthUserIsMember] = React.useState(false); // true if auth use is actually a member
  const [authUserMembershipId, setAuthUserMembershipId] =
    React.useState(undefined);

  const params = useParams();

  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            groups(where: { name: { eq: "${params.groupname}" } }) {
              id
              avatar
              dateCreated
              description
              name
              owner {
                username
                firstName
                lastName
                avatar
              }
              memberships {
                id
                user {
                  username
                  firstName
                  lastName
                  avatar
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        const newGroupData = result.data.groups[0];
        setGroupData(newGroupData);

        // allow auth user to make post if he/she is a member
        newGroupData.memberships.forEach((membership) => {
          if (membership.user.username === authUser.username) {
            setAuthUserIsMember(true);
            setAuthUserMembershipId(membership.id);
          }
        });
      });
  }, [client, params, authUser]);

  console.log(authUserMembershipId);

  const handleTabChange = (event, newValue) => {
    setActiveTabNumber(newValue);
  };

  if (groupData) {
    return (
      <Container>
        <Stack direction="column" spacing={1} mt={12} alignItems="center">
          <Avatar
            src={groupData.avatar}
            sx={{
              width: 200,
              height: 200,
              border: 4,
              borderColor: '#ffc619',
            }}
          />
          <AvatarGroup total={groupData.memberships.length}>
            {groupData.memberships.map((membership) => (
              <Avatar src={membership.user.avatar} />
            ))}
          </AvatarGroup>
          <Typography variant="h4">{`${groupData.name}`}</Typography>
          <Stack direction="row" spacing={0.2}>
            <img
              alt="Location Icon"
              src={cheeseMarker}
              style={{ width: 25, height: 35, marginRight: 10 }}
            />
            <Typography variant="h6">Cape Town, South Africa</Typography>
          </Stack>
          <Typography>{groupData.description}</Typography>
          {authUserIsMember ? (
            <Button variant="outlined" color="primary">
              Leave Group
            </Button>
          ) : (
            <Button variant="outlined" color="primary">
              Request To Join
            </Button>
          )}
        </Stack>
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
                <Tab label="Members" value="2" />
              </TabList>
            </Stack>
          </Box>
          <TabPanel value="1">
            <Stack spacing={2}>
              {authUserIsMember && (
                <AddPostCard creatorId={authUserMembershipId} />
              )}
              {data.map((postData) => (
                <PostCard key={shortid.generate()} postData={postData} />
              ))}
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={<ManageAccountsIcon />}
                >
                  <Avatar src={groupData.owner.avatar} />
                </Badge>
                <Typography>{`${groupData.owner.firstName} ${groupData.owner.lastName} (owner)`}</Typography>
              </Stack>
              {groupData.memberships.map((membership) => {
                if (groupData.owner.username === membership.user.username)
                  return null; // don't display owner again

                return (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={membership.user.avatar} />
                    <Typography>{`${membership.user.firstName} ${membership.user.lastName}`}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </TabPanel>
        </TabContext>
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default Group;
