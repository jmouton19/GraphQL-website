import { gql, useApolloClient } from '@apollo/client';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import GroupDetails from '../components/GroupDetails';
import { useTranslation } from 'react-i18next';

function Groups() {
  const { t } = useTranslation();
  const client = useApolloClient();

  const navigate = useNavigate();

  const [groupList, setGroupList] = useState([]);

  client
    .query({
      fetchPolicy: 'no-cache',
      query: gql`
        query {
          groups {
            id
            avatar
            name
          }
        }
      `,
    })
    .then((result) => {
      setGroupList(result.data.groups);
    });

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Stack spacing={2}>
          <GroupDetails />
          {groupList.map((group) => (
            <Paper sx={{ padding: 2 }} key={group.id}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={group.avatar} />
                  <Typography variant="body">{group.name}</Typography>
                </Stack>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    navigate(`/group/${group.id}`);
                  }}
                >
                  {t("visitGroup.label")}
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}

export default Groups;
