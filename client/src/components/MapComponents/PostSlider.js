import { Card, CardContent, Stack, Box } from '@mui/material';
import React, { Component } from 'react';
import Slider from 'react-slick';

export default class PostSlider extends Component {
  render() {
    const { posts } = this.props;
    const settings = {
      className: 'center',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }
      ]
    };
    return (
      <Box mt={2} ml={2} mr={2}>
        <Slider {...settings}>
          {posts.map((post) => (
            <Stack padding={1}>
              <Card key={post['id']}>
                <CardContent>{`${post['location'][0]}, ${post['location'][1]}`}</CardContent>
              </Card>
            </Stack>
          ))}
        </Slider>
      </Box>
    );
  }
}
