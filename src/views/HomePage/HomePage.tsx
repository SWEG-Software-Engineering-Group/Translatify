import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Box, Typography } from "@mui/material";

const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "#f1f1f1",
    },
    content:{
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
        textAlign: "center",
        flexGrow: 0,
    },
    heading: {
      fontSize: "3rem",
      marginBottom: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
    },
    text: {
      fontSize: "1.2rem",
      marginBottom: "2rem",
      textAlign: "center",
      color: "#666",
    },

  };

export default function HomePage() {
    const auth = useAuth();
    return (
    <Box sx={styles.root}>
        {auth.isAuthenticated ? (
        <LayoutWrapper userType={auth.user.role}>
        <Box sx={styles.content}>
            <Typography variant="h1" sx={styles.heading}>
                Welcome, {auth.user.name}!
            </Typography>
            <Typography variant="body1" sx={styles.text}>
                Use the menu button in the top left corner to navigate between your pages or logout from the system.
            </Typography>
            </Box>
        </LayoutWrapper>
        ) : (
        <LayoutWrapper userType={null}>
            <Box sx={styles.content}>
            <Typography variant="h1" sx={styles.heading}>
                Welcome to our system!
            </Typography>
            <Typography variant="body1" sx={styles.text}>
                To access your pages, please login using the menu button in the top left corner.
            </Typography>
            </Box>
        </LayoutWrapper>
        )}
    </Box>
    );
};