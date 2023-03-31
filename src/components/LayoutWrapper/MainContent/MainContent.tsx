import Box from "@mui/material/Box";

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        maxWidth="1024px"
        margin="auto"
        paddingX="2rem"
      >
        {children}
      </Box>
    );
}