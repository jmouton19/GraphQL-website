import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostCard from '../PostComponents/PostCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';

function PostSwiper({ posts, focusedPost }) {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    console.log(`${swiper ? "Swiper": "No swiper"}`);
    if (swiper) {
      swiper.slideTo(posts.indexOf(focusedPost) );
    }
  }, [swiper, focusedPost]);

  return (
    <>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} padding={1}>
            <PostCard postData={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default React.memo(PostSwiper);
