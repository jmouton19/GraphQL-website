import { Stack, Box } from '@mui/material';
import React, { Component } from 'react';
import Slider from 'react-slick';
import PostCard from '../posts/PostCard';

import shortid from 'shortid';
export default class PostSlider extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.focusedPost !== this.props.focusedPost) {
      this.slider.current.slickGoTo(
        this.props.posts.indexOf(this.props.focusedPost) -
          (window.innerWidth > 1024 ? 1 : 0)
      );
    }
  }
  render() {
    const { posts } = this.props;
    const settings = {
      infinite: posts.length < 3 ? false : true,
      slidesToShow: posts.length < 3 ? posts.length : 3,
      speed: 500,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Box mt={2} ml={2} mr={2}>
        <Slider {...settings} ref={this.slider}>
          {posts.map((post) => (
            <Stack key={shortid.generate()} padding={1}>
              <PostCard postData={post} />
            </Stack>
          ))}
        </Slider>
      </Box>
    );
  }
}
