import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF',
      light: '#8B84FF',
      dark: '#5A52D9'
    },
    secondary: {
      main: '#FF6584',
      light: '#FF8DA4',
      dark: '#E64A6A'
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0 2px 5px 0 rgba(0,0,0,0.05)',
    '0 3px 8px 0 rgba(0,0,0,0.05)',
    '0 4px 12px 0 rgba(0,0,0,0.07)',
    '0 6px 15px 0 rgba(0,0,0,0.09)',
    '0 8px 20px 0 rgba(0,0,0,0.10)',
    '0 10px 25px 0 rgba(0,0,0,0.12)',
    '0 12px 30px 0 rgba(0,0,0,0.14)',
    '0 14px 35px 0 rgba(0,0,0,0.16)',
    '0 16px 40px 0 rgba(0,0,0,0.18)',
    '0 18px 45px 0 rgba(0,0,0,0.20)',
    '0 20px 50px 0 rgba(0,0,0,0.22)',
    '0 22px 55px 0 rgba(0,0,0,0.24)',
    '0 24px 60px 0 rgba(0,0,0,0.26)',
    '0 26px 65px 0 rgba(0,0,0,0.28)',
    '0 28px 70px 0 rgba(0,0,0,0.30)',
    '0 30px 75px 0 rgba(0,0,0,0.32)',
    '0 32px 80px 0 rgba(0,0,0,0.34)',
    '0 34px 85px 0 rgba(0,0,0,0.36)',
    '0 36px 90px 0 rgba(0,0,0,0.38)',
    '0 38px 95px 0 rgba(0,0,0,0.40)',
    '0 40px 100px 0 rgba(0,0,0,0.42)',
    '0 42px 105px 0 rgba(0,0,0,0.44)',
    '0 44px 110px 0 rgba(0,0,0,0.46)',
    '0 46px 115px 0 rgba(0,0,0,0.48)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 20px 0 rgba(0,0,0,0.15)',
          },
        },
        contained: {
          color: '#ffffff'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          }
        }
      }
    }
  }
});

export default theme;
