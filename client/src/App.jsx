import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
