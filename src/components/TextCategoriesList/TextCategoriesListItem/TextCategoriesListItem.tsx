import { ListItem, Typography, Stack, Box, IconButton, Dialog, DialogTitle, DialogActions, Button, Snackbar } from '@mui/material';
import TextCategory from "../../../types/TextCategory";
import TextState from "../../../types/TextState";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';



interface TextCategoriesListItemProps {
    category: TextCategory;
}

export default function TextCategoriesListItem({category}: TextCategoriesListItemProps) {
  const [dialog, setDialog] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  
  const handleDelete = () => {
        setDialog(true);
  };


  const handleModalConfirm = () => {
    setDialog(false);
    //delete category

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

    return (
        <ListItem
          sx={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
            marginBottom: '12px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            padding="16px"
          >
            <Stack flex={1} alignItems="flex-start">
              <Typography fontWeight="bold">ID</Typography>
              <Typography fontWeight="normal">{category.idCategory}</Typography>
            </Stack>
            <Stack flex={1} alignItems="flex-start">
              <Typography fontWeight="bold"> Language</Typography>
              <Typography fontWeight="normal">
                {category.language}
              </Typography>
            </Stack>
            <Stack flex={1} alignItems="flex-start">
              <Typography fontWeight="bold">Default</Typography>
              <Typography fontWeight="normal">
                {category.isDefault ? "Yes" : "No"}
              </Typography>
            </Stack>
            <Stack flex={1} alignItems="flex-start">
              <Typography fontWeight="bold">Number of texts</Typography>
              <Typography fontWeight="normal">
                {category.List.length}
              </Typography>
            </Stack>
          <Box>
            <IconButton aria-label="Delete the text category" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
          </Stack>
          
          <Dialog open={dialog} onClose={() => setDialog(false)}>
            <DialogTitle>{`You sure you want to delete the text category ${category.idCategory}?`}</DialogTitle>
            <DialogActions>
                <Button onClick={() => setDialog(false)}>No</Button>
                <Button onClick={handleModalConfirm}>Yes</Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                Category delete successfully
            </MuiAlert>
          </Snackbar>
        </ListItem>
      );
}