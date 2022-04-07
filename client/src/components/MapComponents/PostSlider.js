import { Card, CardContent, Stack } from '@mui/material';
import React, { Component } from 'react';
import Slider from 'react-slick';

export default class PostSlider extends Component {
  render() {
    const { posts } = this.props;
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
    };
    return (
      <Stack padding={1}>
        <Slider {...settings}>
          {posts.map((post) => (
            <Stack padding={1}>
              <Card>
                <CardContent>{post['location'][0]}</CardContent>
              </Card>
            </Stack>
          ))}
        </Slider>
      </Stack>
    );
  }
}
