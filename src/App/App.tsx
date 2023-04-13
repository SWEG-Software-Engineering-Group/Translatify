import React from 'react';
import { Box, CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import Router from './Router';
import { blue, orange } from '@mui/material/colors';
import { useAuth } from '../hooks/useAuth';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});


export default function App() {
  const auth = useAuth();
  if (auth.isLoading) {
      return <Box />;
  }
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router/>
      </ThemeProvider>
  );
}
