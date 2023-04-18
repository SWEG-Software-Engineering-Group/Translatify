import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface GoToPageButtonProps {
  page: string;
  label?: string;
}

export default function GoToPageButton({ page, label = `Go to ${page}` }: GoToPageButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(page);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {label}
    </Button>
  );
}