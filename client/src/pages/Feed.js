import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import React from 'react';
import PostCard from '../components/PostCard';

const data = [
  {
    name: 'Nicol Visser',
    group: 'Stellenbosch Hiking',
    caption: 'Very windy on top of Botmaskop',
    src: 'https://cdnapisec.kaltura.com/p/4587423/sp/458742300/embedIframeJs/uiconf_id/49951063/partner_id/4587423?iframeembed=true&playerId=kaltura_player_1649462954&entry_id=1_4j2r7mb1',
  },
  {
    name: 'Phillip Shommarz',
    group: 'Cape Town Karate',
    caption: 'Karate is awesome!',
    src: 'https://cdnapisec.kaltura.com/p/4587423/sp/458742300/embedIframeJs/uiconf_id/49951063/partner_id/4587423?iframeembed=true&playerId=kaltura_player_1649463014&entry_id=1_bsnotct4',
  },
];

function Feed() {
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
              <PostCard postData={postData} />
            ))}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Feed;
