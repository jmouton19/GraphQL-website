import { gql, useApolloClient } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNotify } from './NotificationProvider';

const PostsContext = createContext();
const AddPostContext = createContext();
const DeletePostContext = createContext();
const RefreshPostsContext = createContext();
const FilterPostsContext = createContext();
const SortPostsContext = createContext();

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

export function useSortPosts() {
  return useContext(SortPostsContext);
}

function PostProvider(props) {
  // props:
  const { children, location, page, groupId, userId } = props;

  // state:
  const [postData, setPostData] = useState([]);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [sortByTime, setSortByTime] = useState(true);

  // hooks:
  const client = useApolloClient();
  const notify = useNotify();

  // load posts initially
  useEffect(() => {
    // load approprate posts here

    if (page === 'feed') {
      client
        .mutate({
          mutation: gql`
            mutation {
              distance(input: { latitude: ${location[0]}, longitude: ${
            location[1]
          }${sortByTime ? ', timeSort:true' : ''} }) {
                success
                message
                posts {
                  post {
                    id
                    video                  
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
              return {
                id: post.post.id,
                distance: post.distance,
                video: post.post.video,
              };
            });
            setPostData(newPostData);
          } else {
            notify('error', message);
          }
        });
    }

    if (page === 'group') {
      client
        .mutate({
          mutation: gql`
            mutation {
              distance(input: { latitude: ${location[0]}, longitude: ${
            location[1]
          }, groupId: ${groupId}${sortByTime ? ', timeSort:true' : ''} }) {
                success
                message
                posts {
                  post {
                    id
                    video
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
              return {
                id: post.post.id,
                distance: post.distance,
                video: post.post.video,
              };
            });
            setPostData(newPostData);
          } else {
            notify('error', message);
          }
        });
    }

    if (page === 'profile') {
      client
        .query({
          query: gql`
            query {
              posts(where: { creator: { userId: { eq: ${userId} } } }) {
                id
                video
              }
            }
          `,
        })
        .then((response) => {
          const newPostData = response.data.posts.map((post) => {
            return {
              id: post.id,
              distance: null,
              video: post.video,
            };
          });
          setPostData(newPostData);
        });
    }

    setNeedsRefresh(false);
  }, [
    client,
    needsRefresh,
    location,
    notify,
    page,
    sortByTime,
    groupId,
    userId,
  ]);

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

  function setSortMethod(method) {
    if (method === 'time') {
      setSortByTime(true);
    } else {
      setSortByTime(false);
    }
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
              <SortPostsContext.Provider value={setSortMethod}>
                {children}
              </SortPostsContext.Provider>
            </DeletePostContext.Provider>
          </FilterPostsContext.Provider>
        </RefreshPostsContext.Provider>
      </AddPostContext.Provider>
    </PostsContext.Provider>
  );
}

export default PostProvider;
