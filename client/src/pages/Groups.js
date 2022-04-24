import { gql, useApolloClient } from '@apollo/client';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';

function Groups() {
  const client = useApolloClient();

  const navigate = useNavigate();

  const [groupList, setGroupList] = useState([]);

  client
    .query({
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
          {groupList.map((group) => (
            <Paper sx={{padding: 2}}>
              <Stack key={group.id} direction="row" spacing={2} alignItems="center">
                <Avatar src={group.avatar} />
                <Typography variant="body">{group.name}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    navigate(`/group/${group.name}`);
                  }}
                >
                  Visit group
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
