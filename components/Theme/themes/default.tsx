import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0C71C3',
      light: '#2EA3F2',
      dark: '#084578',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#272C2F',
      light: '#909ba2',
      dark: '#000000',
      contrastText: '#FFF',
    },
  },
  typography: {
    fontFamily: 'GothamPro',
  },
});

export default theme;
