import React from "react";
import Timer from "./Timer";
import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#69f0ae',
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Timer></Timer>
      </ThemeProvider>
    </div>
  );
}

export default App;
