import Text from '../../types/Text';
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Divider} from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextState from '../../types/TextState';
import { useState } from "react";
import convertTextState from '../../utils/Text/convertTextState';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

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
    const [open, setOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const handleThumbUpClick = () => {
        setConfirmAction("approve");
        setOpen(true);
    };
    
    const handleThumbDownClick = () => {
        setConfirmAction("reject");
        setOpen(true);
    };
    
    const handleModalConfirm = () => {
        setOpen(false);
        if(confirmAction === "approve") {
            translation.state = TextState.verified;
            setSnackbarOpen(true);
        } else {
            translation.state = TextState.rejected;
            setSnackbarOpen(true);
        }
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    return (
        <Card sx={{ maxWidth: 400}}>
          <CardHeader
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
          <IconButton aria-label="Approve the translation" onClick={handleThumbUpClick}>
              <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="Reject the translation" onClick={handleThumbDownClick}>
              <ThumbDownIcon />
          </IconButton>
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
              <Typography paragraph>
                {translation.text}
              </Typography>
            </CardContent>
          </Collapse>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{`You sure you want to ${confirmAction === "approve" ? "accept" : "reject"} the translation ${translation.id}?`}</DialogTitle>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>No</Button>
                <Button onClick={handleModalConfirm}>Yes</Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
              <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                  Translation {confirmAction === "approve" ? "accepted" : "rejected"} successfully
              </MuiAlert>
          </Snackbar>
        </Card>
      );
}
