import Box from "@mui/material/Box";

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        maxWidth="100%"
      >
        {children}
      </Box>
    );
}