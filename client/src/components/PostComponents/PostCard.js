import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VideoPlayer from '../cloudindary/VideoPlayer';
import CommentProvider from '../../providers/CommentProvider';
import CommentViewer from './CommentViewer';
import { Stack } from '@mui/material';
import StyledLink from '../StyledLink';
import { useTranslation } from 'react-i18next';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  //marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostCard({ postData }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={postData.creator.user.avatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${postData.creator.user.firstName} ${postData.creator.user.lastName}`}
        subheader={
          <Typography variant="caption" color="gray">
            {new Date(postData.dateCreated).toLocaleString()}
          </Typography>
        }
      />
      {postData.video ? (
        <CardMedia>
          <VideoPlayer cloudName="de7amnbmo" publicId={postData.body} />
        </CardMedia>
      ) : (
        <CardContent>
          <Typography variant="body" color="primary">
            {postData.body}
          </Typography>
        </CardContent>
      )}
      {postData.creator.group && (
        <CardContent sx={{ backgroundColor: '#282828' }}>
          <StyledLink to={`/group/${postData.creator.group.id}`}>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption" color="text.secondary">
                {t('postedIn.label')}
              </Typography>
              <Avatar
                sx={{ width: 20, height: 20 }}
                src={postData.creator.group.avatar}
              />
              <Typography variant="caption" color="text.secondary">
                {postData.creator.group.name}
              </Typography>
            </Stack>
          </StyledLink>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentProvider postId={postData.id}>
            <CommentViewer />
          </CommentProvider>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PostCard;
