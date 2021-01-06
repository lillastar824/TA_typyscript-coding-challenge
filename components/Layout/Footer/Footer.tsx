import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTheme, Theme } from '@material-ui/core/styles';

const Footer: React.FC = () => {
  const today: Date = new Date();
  const theme: Theme = useTheme();
  return (
    <Grid
      container
      justify="center"
      style={{
        backgroundColor: theme.palette.primary.main,
        backgroundImage: `radial-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      }}
    >
      <Box
        p={5}
        color="#fff"
        component="a"
        onClick={() => window.open(`https://neddaxs.com`, '_blank')}
      >
        Copyright &copy; {today.getFullYear()} neddaxs.com
      </Box>
    </Grid>
  );
};

export default Footer;
