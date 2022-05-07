import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostCard from '../PostComponents/PostCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';
import { usePosts } from '../../providers/PostProvider';

function PostSwiper({ focusedPost }) {
  const [swiper, setSwiper] = useState(null);

  const posts = usePosts();

  useEffect(() => {
    if (swiper) {
      swiper.slideToLoop(posts.indexOf(focusedPost) - 1);
    }
  }, [swiper, focusedPost, posts]);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#ffc619',
          '--swiper-pagination-color': '#ffc619',
        }}
        onSwiper={setSwiper}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} padding={1}>
            <PostCard postId={post.id} distance={post.distance} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default React.memo(PostSwiper);
