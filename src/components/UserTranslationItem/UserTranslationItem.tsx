import { Link } from "react-router-dom";
import {Card, CardContent, Typography} from '@mui/material';
import Text from "../../types/Text";
import convertTextState from "../../utils/Text/convertTextState";
import TextState from "../../types/TextState";

interface UserTranslationItemProps{
    text : Text,
}

export default function UserTranslationItem({text} : UserTranslationItemProps) {
    return(
        <Link
            to={`/editTranslation/${text.category.id}/${text.title}/${text.language}`}
            style={{ textDecoration: 'none', justifyContent:'stretch' }}
        >
            <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
                {/* <Typography variant="h6" sx={{fontWeight: 'bold'}} gutterBottom>
                {text.text}
                </Typography> */}
                <Typography variant="body1" gutterBottom>
                    <span style={{color: 'red'}}>Title:</span> {text.title ? text.title : 'No Title'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <span style={{color: 'red'}}>Comment:</span> {text.comment ? text.comment : 'No comment'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <span style={{color: 'red'}}>State:</span> {convertTextState(TextState[text.state])}
                </Typography>
                {text.state === 4    ? 
                <Typography variant="body1" gutterBottom>
                    <span style={{color: 'red'}}>Feedback:</span> {text.feedback ? text.feedback : 'No feedback'}
                </Typography>
                :
                <></>
                }
            </CardContent>
            </Card>
        </Link>
    );
};