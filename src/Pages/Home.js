import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import AppTheme from '../shared-theme/AppTheme';
import { Card, CardContent, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Box, Grid } from '@mui/material';

const styles = {
  CardContent: {
    width: 300,
    height: 120
  },
  Card: {
    width: 350,
    height: 150
  },
  Box: {
    paddingTop: '200px',
    paddingBottom: '50px'
  }
}

const cardGen = (icon, title, text, href) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card variant="outlined" sx={styles.Card}>
        <CardActionArea component="a" href={href}>
          <CardContent sx={styles.CardContent}>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {icon}
              <br/>
              {title}
            </Typography>
            <Typography variant="body2">
              <br/>
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default function Home(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Box style={styles.Box}
      >
        <Grid container spacing={2} columns={12} alignItems="center" justifyContent="center" >
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<HomeIcon />, 'Home', 'Application Home Page', '')}
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<AssessmentIcon />, 'QuickBase Reports', 'Access and Generate Quickbase Reports', 'qb-reports')}
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<AssessmentIcon />, 'Users', 'View and Manage Users')}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </AppTheme>
  );
}
