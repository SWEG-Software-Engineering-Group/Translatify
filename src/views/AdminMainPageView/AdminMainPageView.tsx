import { Grid, Paper, Typography } from "@mui/material"
import GoToSettings from "../../components/buttons/GoToLink/GoToSettings";
import GoToReview from "../../components/buttons/GoToLink/GoToReview";
import GoToTexts from "../../components/buttons/GoToLink/GoToTexts";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import GoToCategories from "../../components/buttons/GoToLink/GoToCategories";
import PageTitle from "../../components/PageTitle/PageTitle";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

const styles = {
    paper: {
      padding: 3,
      textAlign: 'center',
      color: '#5b5b5b',
      borderRadius: 10,
      boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
    },
    paperTitle: {
      marginBottom: 16,
      color: '#444444',
      fontWeight: 'bold',
    },
    paperSubtitle: {
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: 10,
      padding: 8,
      minWidth: 100,
      fontWeight: 'bold',
    }
  }
  export default function AdminMainPageView() {
    return (
      <PrivateRoute allowedUsers={['admin']}>
        <LayoutWrapper userType="admin">
          <Grid container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            textAlign={'center'}
            flexWrap="wrap"
            direction={'row'}
            >
            <Grid item xs={12}>
              <PageTitle title='Admin Dashboard'/>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h6" style={styles.paperTitle}>Settings</Typography>
                <Typography variant="subtitle1" style={styles.paperSubtitle}>Configure your Tenant settings</Typography>
                <GoToSettings></GoToSettings>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h6" style={styles.paperTitle}>Reviews</Typography>
                <Typography variant="subtitle1" style={styles.paperSubtitle}>Approve or decline your Tenant Texts</Typography>
                <GoToReview></GoToReview>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h6" style={styles.paperTitle}>Texts</Typography>
                <Typography variant="subtitle1" style={styles.paperSubtitle}>Manage your Tenant Texts</Typography>
                <GoToTexts></GoToTexts>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h6" style={styles.paperTitle}>Text Categories</Typography>
                <Typography variant="subtitle1" style={styles.paperSubtitle}>Manage your Tenant Text Categories</Typography>
                <GoToCategories></GoToCategories>
              </Paper>
            </Grid>
          </Grid>
        </LayoutWrapper>
      </PrivateRoute>
    );
  }
