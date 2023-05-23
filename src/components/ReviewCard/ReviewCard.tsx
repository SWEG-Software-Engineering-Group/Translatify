import Text from '../../types/Text';
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Divider} from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextState from '../../types/TextState';
import { useState } from "react";
import convertTextState from '../../utils/Text/convertTextState';
import AcceptTranslationButton from '../buttons/AcceptTranslationButton/AcceptTranslationButton';
import RejectTranslationButton from '../buttons/RejectTranslationButton/RejectTranslationButton';

export interface TranslationListItemProps {
    translation: Text;
    removeFromList: (title : string) => void;
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

export default function ReviewCard({translation, removeFromList} : TranslationListItemProps) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
      <Card sx={{ maxWidth: 400}}>
        <CardHeader
          title= {translation.title}
          subheader= {convertTextState(TextState[translation.state])}
        />
        <CardContent>
          <Typography variant="inherit" color="text.secondary">
              Feedback:
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {translation.feedback ? translation.feedback : "No feedback"}
          </Typography>
          <Divider variant="fullWidth" sx={{marginTop: 1, marginBottom: 1}} />
          <Typography variant="inherit" color="text.secondary" >
              Comment:
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {translation.comment ? translation.comment : "No comment"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <AcceptTranslationButton translation={translation} handleAccept={removeFromList} />
          <RejectTranslationButton translation={translation} handleReject={removeFromList} />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more details about the translation"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Text:</Typography>
              {translation.text === '' || translation.text === null ? 
              <Typography paragraph fontStyle='italic'>
                'Text field is empty, please reject translation' 
              </Typography>
              :
              <Typography paragraph>
                {translation.text}
              </Typography>
              }
          </CardContent>
        </Collapse>
      </Card>   
      );       
}
