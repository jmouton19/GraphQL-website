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
      location: [-33.9293, 18.864],
    },
    {
      name: 'Phillip Shommarz',
      group: 'Cape Town Karate',
      caption: 'Karate is awesome!',
      src: 'https://cdnapisec.kaltura.com/p/4587423/sp/458742300/embedIframeJs/uiconf_id/49951063/partner_id/4587423?iframeembed=true&playerId=kaltura_player_1649463014&entry_id=1_bsnotct4',
      location: [-33.9293, 18.8615],
    },
	// {
	// 	name: 'Phillip Shommarz',
	// 	group: 'Sleep Enthusiasts 101',
	// 	caption: 'I want to sleep!',
	// 	src: null,
	// 	location: [-33.9293, 18.8616],
	// },
  ];
  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}

export default PostProvider;
