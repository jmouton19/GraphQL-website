import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StraightenIcon from '@mui/icons-material/Straighten';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Stack } from '@mui/material';
import { useFilterPosts, useSortPosts } from '../../providers/PostProvider';
import { useTranslation } from 'react-i18next';

function PostSorter() {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState('all');

  const filterPostsBy = useFilterPosts();
  const sortPostsBy = useSortPosts();

  const handleSortByChange = (event, newSortMethod) => {
    if (newSortMethod) {
      sortPostsBy(newSortMethod);
    }
  };

  const handleFilterTypeChange = (event) => {
    if (filterType === 'all') setFilterType('video');
    if (filterType === 'video') setFilterType('text');
    if (filterType === 'text') setFilterType('all');
  };

  useEffect(() => {
    filterPostsBy(filterType);
  }, [filterType, filterPostsBy]);

  return (
    <Stack direction="row" spacing={2}>
      <ToggleButtonGroup exclusive onChange={handleSortByChange}>
        <Tooltip title={t('sortNewest.label')}>
          <ToggleButton value="time">
            <CalendarTodayIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={t('sortNearest.label')}>
          <ToggleButton value="location">
            <StraightenIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value="filter"
        exclusive
        onChange={handleFilterTypeChange}
      >
        <Tooltip title={`Show ${filterType} posts`}>
          <ToggleButton value="filter">
            {filterType !== 'text' && <VideoFileIcon />}
            {filterType !== 'video' && <InsertDriveFileIcon />}
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default PostSorter;
