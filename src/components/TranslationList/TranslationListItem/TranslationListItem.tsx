import * as React from 'react';
import Text from '../../../types/Text';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export interface TranslationListItemProps {
  translation: Text;
}

export default function TranslationListItem({translation}: TranslationListItemProps) {
  return (
    <Box sx={{
      backgroundColor: '#F5F5F5',
      borderRadius: '10px',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
      padding: '16px'
    }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {translation.id}
      </Typography>
      <Typography variant="body1" sx={{ marginY: '12px' }}>
        {translation.text}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6B6B6B' }}>
        {`Stato: ${translation.state}`}
      </Typography>
      {translation.feedback && (
        <Box sx={{ marginY: '12px' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Feedback:
          </Typography>
          <Typography variant="body2" sx={{ marginY: '4px' }}>
            {translation.feedback}
          </Typography>
        </Box>
      )}
      {translation.comment && (
        <Box sx={{ marginY: '12px' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Comment:
          </Typography>
          <Typography variant="body2" sx={{ marginY: '4px' }}>
            {translation.comment}
          </Typography>
        </Box>
      )}
      {translation.link && (
        <Button
          variant="outlined"
          href={translation.link}
          target="_blank"
          sx={{ marginTop: '12px' }}
        >
          Open link
        </Button>
      )}
    </Box>
  );
};
