import { ListItem, Typography, Stack } from '@mui/material';
import Category from "../../../types/Category";
import DeleteTextCategoryButton from '../../buttons/DeleteTextCategoryButton/DeleteTextCategoryButton';

interface TextCategoriesListItemProps {
    category: Category;
    handleDeleteFromList: (idCat: string) => void;
}

export default function TextCategoriesListItem({category, handleDeleteFromList}: TextCategoriesListItemProps) {

  const handleDelete = () =>{
    handleDeleteFromList(category.id);
  }

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
        <Stack flex={3} alignItems="flex-start">
          <Typography fontWeight="bold">Name</Typography>
          <Typography fontWeight="normal">{category.name}</Typography>
        </Stack>
        <Stack flex={3} alignItems="flex-start">
          <Typography fontWeight="bold">ID</Typography>
          <Typography fontWeight="normal">{category.id}</Typography>
        </Stack>
        <Stack flex={1} alignItems="flex-end">
          <DeleteTextCategoryButton category={category} categoryId={category.id} handleDelete={handleDelete} />
        </Stack>
      </Stack>
    </ListItem>
  );
}
