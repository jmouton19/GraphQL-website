import React from 'react';
import { usePosts } from '../../providers/PostProvider';
import PostCard from './PostCard';

function PostsViewer() {
  const data = usePosts();

  console.log(data);
  return (
    <React.Fragment>
      {data.map((postData) => (
        <PostCard key={postData.id} postId={postData.id} />
      ))}
    </React.Fragment>
  );
}

export default PostsViewer;
