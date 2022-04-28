import React from 'react';
import { usePosts } from '../../providers/PostProvider';
import PostCard from './PostCard';

function PostsViewer() {
  const data = usePosts();
  return (
    <React.Fragment>
      {data.map((postData) => (
        <PostCard key={postData.id} postData={postData} />
      ))}
    </React.Fragment>
  );
}

export default PostsViewer;
