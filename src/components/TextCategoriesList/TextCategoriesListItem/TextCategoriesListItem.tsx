import { ListItem, Typography, Stack } from '@mui/material';
import TextCategory from "../../../types/TextCategory";
import DeleteTextCategoryButton from '../../buttons/DeleteTextCategoryButton/DeleteTextCategoryButton';
import { useNavigate } from 'react-router-dom';

interface TextCategoriesListItemProps {
    category: TextCategory;
}

export default function TextCategoriesListItem({category}: TextCategoriesListItemProps) {
  const navigate = useNavigate();

  const handleDelete = () =>{
    setTimeout(()=>{      
      navigate(-1);
    }, 2000)
  }

  const languageCountMap = new Map<string, number>();
  category.List.forEach((text) => {
    const language = category.language;
    if (languageCountMap.has(language)) {
      languageCountMap.set(language, languageCountMap.get(language)! + 1);
    } else {
      languageCountMap.set(language, 1);
    }
  });

  const languageCountArray = Array.from(languageCountMap.entries());
  const languageCounts = languageCountArray.map(([language, count]) => `${language} - ${count}`);

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
          <Typography fontWeight="bold">Total category texts</Typography>
          <Typography fontWeight="normal">
            {category.List.length}
          </Typography>
        </Stack>
        <Stack flex={2} alignItems="flex-start">
          <Typography fontWeight="bold">Texts per language</Typography>
          <Typography fontWeight="normal">
            {languageCounts.join(', ')}
          </Typography>
        </Stack>
        <Stack flex={1} alignItems="flex-end">
          <DeleteTextCategoryButton category={category} handleDelete={handleDelete} />
        </Stack>
      </Stack>
    </ListItem>
  );
}
