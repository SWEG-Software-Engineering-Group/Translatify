import { ListItem, Typography, Stack } from '@mui/material';
import TextCategory from "../../../types/TextCategory";
import DeleteTextCategoryButton from '../../buttons/DeleteTextCategoryButton/DeleteTextCategoryButton';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../../services/axios/axiosFunctions';
import { useEffect, useState } from 'react';
import { useAuth } from "../../../hooks/useAuth";

interface TextCategoriesListItemProps {
    category: TextCategory;
    handleDeleteFromList: (idCat: string) => void;
}

interface TextCategoryCount {
  language: string;
  count: number;
}

export default function TextCategoriesListItem({category, handleDeleteFromList}: TextCategoriesListItemProps) {
  const navigate = useNavigate();
  const [textCategoryCounts, setTextCategoryCounts] = useState<TextCategoryCount[]>([]);
  const { tenant } = useAuth();

  //   useEffect(() => {
  //     console.log(category.idCategory);
  //     getData(`${process.env.REACT_APP_API_KEY}/tenant/${tenant.id}/${category.idCategory}/countTexts`)
  //       .then(res=>{
  //         console.log(res.data);
  //         setTextCategoryCounts(res.data);
  //       }
  //     )
  //     .catch(error=>{
  //       console.log(error);
  //     }
  //   )
  // }, [category.idCategory, tenant.id]);

  const handleDelete = () =>{
    handleDeleteFromList(category.idCategory);
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
            {/* {category.List.length} */}
          </Typography>
        </Stack>
        <Stack flex={2} alignItems="flex-start">
          <Typography fontWeight="bold">Texts per language</Typography>
          <Typography fontWeight="normal">
          {Array.isArray(textCategoryCounts) && textCategoryCounts.map((textCategoryCount) => (
            `${textCategoryCount.language} - ${textCategoryCount.count}`
          )).join(', ')}
          </Typography>
        </Stack>
        <Stack flex={1} alignItems="flex-end">
          <DeleteTextCategoryButton category={category} categoryId={category.idCategory} handleDelete={handleDelete} />
        </Stack>
      </Stack>
    </ListItem>
  );
}
