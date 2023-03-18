import React from 'react';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import Router from './Router';
import { blue, orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

export default function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router/>
    </ThemeProvider>
    </>
  );
}
