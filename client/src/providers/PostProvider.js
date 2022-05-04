import { gql, useApolloClient } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const PostsContext = createContext();
const AddPostContext = createContext();
const DeletePostContext = createContext();
const RefreshPostsContext = createContext();
const FilterPostsContext = createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function useAddPost() {
  return useContext(AddPostContext);
}

export function useDeletePost() {
  return useContext(DeletePostContext);
}

export function useRefreshPosts() {
  return useContext(RefreshPostsContext);
}

export function useFilterPosts() {
  return useContext(FilterPostsContext);
}

async function loadGroupPosts(client, groupId, order) {
  return new Promise((resolve) => {
    client
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            posts(where: { creator: { groupId: { eq: ${groupId} } } }, order: { dateCreated: ${order} }) {
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
        resolve(result.data.posts);
      });
  });
}

async function loadUserPosts(client, userId, order) {
  return new Promise((resolve) => {
    client
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
        query {
          posts (where: {creator: {userId:{eq:${userId}}}}, order: { dateCreated: ${order} }) {
              id
              body
              creator{
                  user {
                      avatar
                      firstName
                      lastName
                      username
                  }
              }
              creatorId
              dateCreated
              dateCreated
              latitude
              longitude
              video
          }
        }
        `,
      })
      .then((result) => {
        resolve(result.data.posts);
      });
  });
}

async function loadAllPosts(client, order) {
  return new Promise((resolve) => {
    client
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
          query {
            posts(order: { dateCreated: ${order} }) {
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
                  avatar
                  id
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
        resolve(result.data.posts);
      });
  });
}

function PostProvider(props) {
  // props:
  const { children, config } = props;

  const order = 'DESC';

  /*
  Examples of config prop
  const config = {
    type: 'group',
    groupId: 1,
  };
  */
  // order can be "DESC" or "ASC"

  // state:
  const [postData, setPostData] = useState([]);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [filterBy, setFilterBy] = useState('all');

  // hooks:
  const client = useApolloClient();

  // load posts initially
  useEffect(() => {
    if (config === undefined)
      loadAllPosts(client, order)
        .then((data) => {
          setPostData(data);
        })
        .catch((e) => console.error(e));

    if (config && config.type === 'group')
      loadGroupPosts(client, config.groupId, order)
        .then((data) => {
          setPostData(data);
        })
        .catch((e) => console.error(e));

    if (config && config.type === 'user')
      loadUserPosts(client, config.userId, order)
        .then((data) => {
          setPostData(data);
        })
        .catch((e) => console.error(e));

    setNeedsRefresh(false);
  }, [client, config, order, needsRefresh]);

  async function addPost(video, body, creatorId, latitude, longitude) {
    // if video is true, then the body is the Cloudinary Public ID of the uploaded video
    // if video is false, then the body is the text content of the text post

    const date = new Date();
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
            ) {
              success
              message
            }
          }
        `,
        })
        .then((result) => {
          const { success, message } = result.data.addPost;
          if (success) {
            resolve(message);
          } else {
            reject(message);
          }
        });
    });
  }

  async function deletePost(postId) {
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: gql`
          mutation {
            deletePost(postId: ${postId}){
              success
              message
            }
          }
        `,
        })
        .then((result) => {
          const { success, message } = result.data.deletePost;
          if (success) {
            resolve(message);
          } else {
            reject(message);
          }
        });
    });
  }

  function setFilterMethod(method) {
    setFilterBy(method);
  }

  function refreshPosts() {
    setNeedsRefresh(true);
  }

  return (
    <PostsContext.Provider
      value={postData.filter((item) => {
        if (filterBy === 'all') return true;
        if (filterBy === 'video') return item.video;
        if (filterBy === 'text') return !item.video;
        return false;
      })}
    >
      <AddPostContext.Provider value={addPost}>
        <RefreshPostsContext.Provider value={refreshPosts}>
          <FilterPostsContext.Provider value={setFilterMethod}>
            <DeletePostContext.Provider value={deletePost}>
              {children}
            </DeletePostContext.Provider>
          </FilterPostsContext.Provider>
        </RefreshPostsContext.Provider>
      </AddPostContext.Provider>
    </PostsContext.Provider>
  );
}

export default PostProvider;
