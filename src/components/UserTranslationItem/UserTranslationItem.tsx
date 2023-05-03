import { Link } from "react-router-dom";
import {Card, CardContent, Typography} from '@mui/material';
import Text from "../../types/Text";

interface UserTranslationItemProps{
    text : Text,
}

export default function UserTranslationItem({text} : UserTranslationItemProps) {
    return(
        <Link
            to={`/editTranslation/${text.category.id}/${text.id}/${text.language}`}
            style={{ textDecoration: 'none' }}
        >
            <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}} gutterBottom>
                {text.text}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {text.feedback ? `Feedback: ${text.feedback}` : ''}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <span style={{color: 'red'}}>Title:</span> {text.title ? text.title : 'No Title'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <span style={{color: 'red'}}>Comment:</span> {text.comment ? text.comment : 'No comment'}
                </Typography>
                {text.feedback ? 
                    <Typography variant="body1" gutterBottom>
                        <span style={{color: 'red'}}>Comment:</span> {text.comment ? text.comment : 'No comment'}
                    </Typography>
                    :
                    <></>
                }
            </CardContent>
            </Card>
        </Link>
    );
};