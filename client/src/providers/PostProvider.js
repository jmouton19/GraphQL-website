import React, { createContext, useContext } from 'react';

const PostsContext = createContext();

export function usePosts() {
  return useContext(PostsContext);
}

function PostProvider({ children }) {
  const data = [
    {
      name: 'Nicol Visser',
      group: 'Stellenbosch Hiking',
      caption: 'Very windy on top of Botmaskop',
      src: 'https://cdnapisec.kaltura.com/p/4587423/sp/458742300/embedIframeJs/uiconf_id/49951063/partner_id/4587423?iframeembed=true&playerId=kaltura_player_1649462954&entry_id=1_4j2r7mb1',
      location: {
        longitude: -33.9421,
        latitude: 18.8702,
      },
    },
    {
      name: 'Phillip Shommarz',
      group: 'Cape Town Karate',
      caption: 'Karate is awesome!',
      src: 'https://cdnapisec.kaltura.com/p/4587423/sp/458742300/embedIframeJs/uiconf_id/49951063/partner_id/4587423?iframeembed=true&playerId=kaltura_player_1649463014&entry_id=1_bsnotct4',
      location: {
        longitude: -33.9521,
        latitude: 18.8722,
      },
    },
  ];
  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}

export default PostProvider;
