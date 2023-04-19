import Box from "@mui/material/Box";

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxHeight="80vh"
        maxWidth="1024px"
        margin="auto"
        paddingX="2rem"
        flexGrow={1}
      >
        {children}
      </Box>
    );
}