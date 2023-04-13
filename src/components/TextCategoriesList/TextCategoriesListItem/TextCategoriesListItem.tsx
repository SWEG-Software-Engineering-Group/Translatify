import { ListItem, Typography, Stack, Box } from '@mui/material';
import TextCategory from "../../../types/TextCategory";
import DeleteTextCategoryButton from '../../buttons/DeleteTextCategoryButton/DeleteTextCategoryButton';

interface TextCategoriesListItemProps {
    category: TextCategory;
}

export default function TextCategoriesListItem({category}: TextCategoriesListItemProps) {
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
            <Stack flex={2} alignItems="flex-start">
              <Typography fontWeight="bold">ID</Typography>
              <Typography fontWeight="normal">{category.idCategory}</Typography>
            </Stack>
            <Stack flex={2} alignItems="flex-start">
              <Typography fontWeight="bold">Language</Typography>
              <Typography fontWeight="normal">
                {category.language}
              </Typography>
            </Stack>
            <Stack flex={2} alignItems="flex-start">
              <Typography fontWeight="bold">Default</Typography>
              <Typography fontWeight="normal">
                {category.isDefault ? "Yes" : "No"}
              </Typography>
            </Stack>
            <Stack flex={2} alignItems="flex-start">
              <Typography fontWeight="bold">Number of texts</Typography>
              <Typography fontWeight="normal">
                {category.List.length}
              </Typography>
            </Stack>
            <Stack flex={1} alignItems="flex-end">
              <DeleteTextCategoryButton category={category} handleDelete={() => {}} />
            </Stack>
          </Stack>
        </ListItem>
      );
}