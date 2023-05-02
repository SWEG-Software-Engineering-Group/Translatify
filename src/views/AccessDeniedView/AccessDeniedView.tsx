import { Link } from "react-router-dom";
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

export default function AccessDeniedView() {
    const auth = useAuth();
    return (
    <Box sx={styles.root}>
        <LayoutWrapper userType={auth.user.group}>
            <Box sx={styles.content}>
            <Typography variant="h1" sx={styles.heading}>
                You don't have access rights for that page
            </Typography>
            <Typography variant="body1" sx={styles.text}>
                Click <Link to={'/'}>here</Link> to go back to the homepage
            </Typography>
            </Box>
        </LayoutWrapper>
    </Box>
    );
};