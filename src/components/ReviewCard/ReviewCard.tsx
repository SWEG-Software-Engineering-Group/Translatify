import React from 'react';
import Text from '../../types/Text';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextState from '../../types/TextState';
import { useState } from "react";
import convertTextState from '../../utils/Text/convertTextState';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Divider from '@mui/material/Divider';

export interface TranslationListItemProps {
    translation: Text;
}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function ReviewCard({translation} : TranslationListItemProps) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 400 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                A
              </Avatar>
            }
            title= {translation.id}
            subheader= {convertTextState(TextState[translation.state])}
          />
          <CardContent>
            <Typography variant="inherit" color="text.secondary">
                Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {translation.feedback}
            </Typography>
            <Divider variant="fullWidth" sx={{marginTop: 1, marginBottom: 1}} />
            <Typography variant="inherit" color="text.secondary" >
                Comment
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {translation.comment}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ThumbDownIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Text:</Typography>
              <Typography paragraph>
                {translation.text}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      );
}