import { gql, useApolloClient } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNotify } from './NotificationProvider';

const CommentsContext = createContext();
const CommentAddContext = createContext();
const CommentRemoveContext = createContext();

export function useComments() {
  return useContext(CommentsContext);
}

export function useCommentAdd() {
  return useContext(CommentAddContext);
}

export function useCommentRemove() {
  return useContext(CommentRemoveContext);
}

function CommentProvider({ children, postId }) {
  const notify = useNotify();
  const [comments, setComments] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
            query {
              comments(where: { postId: { eq: ${postId} } }) {
                id
                body
                creator {
                  firstName
                  lastName
                  avatar
                  username
                }
                dateCreated
              }
            }
          `,
      })
      .then((result) => {
        setComments(result.data.comments);
      });

    setNeedsRefresh(false);
  }, [client, postId, needsRefresh]);

  const addComment = async (body) => {
    const date = new Date();
    client
      .mutate({
        mutation: gql`
          mutation {
            addCommment(
              input: {
                body: "${body}"
                dateCreated: "${date.toUTCString()}"
                postId: ${postId}
              }
            ) {
              success
              message
            }
          }
        `,
      })
      .then((result) => {
        const { success, message } = result.data.addCommment;
        if (success) {
          setNeedsRefresh(true);
          notify('success', message);
        } else {
          notify('error', message);
        }
      });
  };

  const removeComment = (commentId) => {
    client
      .mutate({
        mutation: gql`
          mutation {
            deleteComment(commentId:${commentId}){
              success
              message
            }
          }
        `,
      })
      .then((result) => {
        const { success, message } = result.data.deleteComment;
        if (success) {
          setNeedsRefresh(true);
          notify('success', message);
        } else {
          notify('error', message);
        }
      });
  };

  return (
    <CommentsContext.Provider value={comments}>
      <CommentAddContext.Provider value={addComment}>
        <CommentRemoveContext.Provider value={removeComment}>
          {children}
        </CommentRemoveContext.Provider>
      </CommentAddContext.Provider>
    </CommentsContext.Provider>
  );
}

export default CommentProvider;
