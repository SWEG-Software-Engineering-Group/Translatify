import { Link } from "react-router-dom";
import {Card, CardContent, Typography} from '@mui/material';
import Text from "../../types/Text";

interface UserTranslationItemProps{
    text : Text,
    idCategory : string,
    language : string
}

export default function UserTranslationItem({text, idCategory, language} : UserTranslationItemProps) {
    return(
        <Link
            to={`/editTranslation/${idCategory}/${text.id}/${language}`}
            style={{ textDecoration: 'none' }}
        >
            <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                {text.text}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {text.feedback ? `Feedback: ${text.feedback}` : ''}
                </Typography>
                <Typography variant="body1" gutterBottom>
                Comment: {text.comment}
                </Typography>
            </CardContent>
            </Card>
        </Link>
    );
};