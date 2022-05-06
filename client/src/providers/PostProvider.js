import { gql, useApolloClient } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNotify } from './NotificationProvider';

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

function PostProvider(props) {
  // props:
  const { children, page, location } = props;

  // state:
  const [postData, setPostData] = useState([]);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [filterBy, setFilterBy] = useState('all');

  // hooks:
  const client = useApolloClient();
  const notify = useNotify();

  // load posts initially
  useEffect(() => {
    // load approprate posts here

    console.log(location);

    if (page === 'feed') {
      client
        .mutate({
          mutation: gql`
            mutation {
              distance(input: { latitude: ${location[0]}, longitude: ${location[0]} }) {
                success
                message
                posts {
                  post {
                    id                    
                  }
                  distance
                }
              }
            }
          `,
        })
        .then((response) => {
          const { success, message, posts } = response.data.distance;
          if (success) {
            const newPostData = posts.map((post) => {
              return { id: post.post.id, distance: post.distance };
            });
            setPostData(newPostData);
          } else {
            notify('error', message);
          }
        });
    }
    setNeedsRefresh(false);
  }, [client, needsRefresh, location, notify, page]);

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
