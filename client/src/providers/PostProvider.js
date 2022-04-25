import { gql, useApolloClient } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { stringToObject } from '../utils/utils';

const PostsContext = createContext();
const AddPostContext = createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function useAddPost() {
  return useContext(AddPostContext);
}

function PostProvider({ children }) {
  // state:
  const [postData, setPostData] = useState([]);

  // hooks:
  const client = useApolloClient();

  // load posts initially
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

  async function addPost(video, body, creatorId) {
    // if video is true, then the body is the Cloudinary Public ID of the uploaded video
    // if video is false, then the body is the text content of the text post

    const date = new Date();

    // Todo: get from current location
    const latitude = -33.96 + Math.random() * 0.4;
    const longitude = 18.86 + Math.random() * 0.4;

    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: gql`
          mutation {
            addPost(
              input: {
                body: "${body}"
                creatorId: ${creatorId}
                dateCreated: "${date.toUTCString()}"
                latitude: ${latitude}
                longitude: ${longitude}
                video: ${video ? 'true' : 'false'}
              }
            )
          }
        `,
        })
        .then((result) => {
          const responseData = stringToObject(result.data.addPost);
          if (responseData.success) {
            resolve(responseData.message);
          } else {
            reject(responseData.message);
          }
        });
    });
  }

  return (
    <PostsContext.Provider value={postData}>
      <AddPostContext.Provider value={addPost}>
        {children}
      </AddPostContext.Provider>
    </PostsContext.Provider>
  );
}

export default PostProvider;
