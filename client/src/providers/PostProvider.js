import { gql, useApolloClient } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const PostsContext = createContext();

export function usePosts() {
  return useContext(PostsContext);
}

function PostProvider({ children }) {
  // state:
  const [postData, setPostData] = useState([]);

  // hooks:
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            posts {
              id
              body
              creator {
                user {
                  firstName
                  lastName
                  avatar
                }
                group {
                  name
                }
              }
              dateCreated
              latitude
              longitude
              video
            }
          }
        `,
      })
      .then((result) => {
        setPostData(result.data.posts);
      });
  }, [client]);

  return (
    <PostsContext.Provider value={postData}>{children}</PostsContext.Provider>
  );
}

export default PostProvider;
