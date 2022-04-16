import React, { createContext, useContext, useState } from 'react';

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

const sampleComments = [
  {
    id: 1,
    name: 'Lizé Steyn',
    avatarURL: 'https://i.ibb.co/k8p8KDr/0184708f25a9.jpg',
    text: 'Go to sleep, JC.',
  },

  {
    id: 2,
    name: 'Harry Potter',
    avatarURL: 'https://i.ibb.co/hm99dG4/20d9de001ebe.png',
    text: 'Avada Kedavra!',
  },
  {
    id: 3,
    name: 'Steve Jobs',
    avatarURL: 'https://i.ibb.co/nQ95htC/c7cca859106c.png',
    text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
  },
];

function CommentProvider({ children }) {
  const [comments, setComments] = useState(sampleComments);

  const addComment = (newComment) => {
    const { id, name, avatarURL, text } = newComment;
    const newComments = comments.concat([{ id, name, avatarURL, text }]);
    setComments(newComments);
  };

  const removeComment = (commentToDelete) => {
    const newComments = comments.filter(
      (comment) => comment !== commentToDelete
    );
    setComments(newComments);
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
