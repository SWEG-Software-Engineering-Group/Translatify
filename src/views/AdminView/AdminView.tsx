import { Box, Card, CardContent, CardHeader, Grid, Typography, useTheme } from "@mui/material";
import GoToPageButton from "../../components/buttons/GoToPageButton/GoToPageButton";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

export default function AdminView() {
  const theme = useTheme();

  return (
    <PrivateRoute allowedUsers={['admin']}>
      <LayoutWrapper userType="admin">
        <Grid container spacing={3} justifyContent="center" alignItems="center" textAlign={'center'} flexWrap="wrap" direction={'row'}>
          <Grid item xs={12}>
            <PageTitle title='Admin Dashboard'/>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Card sx={{ 
                backgroundSize: 'cover', 
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[5],
                color: theme.palette.text.primary 
              }}>
              <CardHeader title={<Typography variant="h6" color="inherit">Settings</Typography>} />
              <CardContent>
                <Typography variant="body1" color="inherit">
                  Manage Tenant settings
                </Typography>
                <Box mt={2}>
                  <GoToPageButton page="/TenantSettings" label="Go To Tenant Settings"/>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Card sx={{ 
                backgroundSize: 'cover', 
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[5],
                color: theme.palette.text.primary 
              }}>
              <CardHeader title={<Typography variant="h6" color="inherit">Reviews</Typography>} />
              <CardContent>
                <Typography variant="body1" color="inherit">
                  Approve or reject your Tenant Texts
                </Typography>
                <Box mt={2}>
                  <GoToPageButton page="/ReviewTexts" label="Go To Reviews"/>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Card sx={{ 
                backgroundSize: 'cover', 
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[5],
                color: theme.palette.text.primary 
              }}>
              <CardHeader title={<Typography variant="h6" color="inherit">Texts</Typography>} />
              <CardContent>
                <Typography variant="body1" color="inherit">
                  Manage all your Tenant texts and translations
                </Typography>
                <Box mt={2}>
                  <GoToPageButton page="/TenantTexts" label="Go To Tenant Texts"/>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Card sx={{ 
                backgroundSize: 'cover', 
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[5],
                color: theme.palette.text.primary 
              }}>
              <CardHeader title={<Typography variant="h6" color="inherit">Categories</Typography>} />
              <CardContent>
                <Typography variant="body1" color="inherit">
                  Manage your Tenant text categories.
                </Typography>
                <Box mt={2}>
                  <GoToPageButton page="/TenantTextCategories" label="Go To Text Categories"/>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </LayoutWrapper>
    </PrivateRoute>
  );
}