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
      videoPublicID: 'IMG_0684_qo3ud7',
      location: [-33.9293, 18.864],
    },
    {
      name: 'JC Mouton',
      group: 'Nightowls',
      caption: 'Another easy 3am code push :sunglasses:',
      videoPublicID: 'u4vuh4i7wb9atdvj11rs',
      location: [-33.9293, 18.866],
    },
    {
      name: 'Phillip Shommarz',
      group: 'Cape Town Karate',
      caption: 'Karate is awesome!',
      videoPublicID: 'pexels-artem-podrez-6253404_iktwt4',
      location: [-33.9293, 18.8615],
    },
    {
      name: 'Phillip Shommarz',
      group: 'Sleep Enthusiasts 101',
      caption: 'I want to sleep!',
      videoPublicID: null,
      location: [-33.9293, 18.8616],
    },
  ];
  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}

export default PostProvider;
