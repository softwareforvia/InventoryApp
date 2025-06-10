import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import AppTheme from '../shared-theme/AppTheme';
import { Card, CardContent, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Box, Grid } from '@mui/material';

const styles = {
  CardContent: {
    paddingTop: '10px',
    width: 310,
    height: 150
  },
  Card: {
    width: 350,
    height: 180
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
            <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
              {icon}
              <br/>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>
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
      <Box style={styles.Box}>
        <Grid container spacing={4} columns={12} alignItems="center" justifyContent="center" >
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<HomeIcon />, 'Home', 'Application Home Page', '')}
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<AssessmentIcon />, 'QuickBase Reports', 'Access and Generate Quickbase Reports', 'qb-reports')}
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<InventoryIcon />, 'Inventory Manager', 'View and Manage Inventory Data', 'inventory')}
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<ConstructionIcon />, 'Part Master', 'Part Lookup and Managing', 'part-master')}
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {cardGen(<PersonAddAlt1Icon />, 'Users', 'View and Manage Users')}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </AppTheme>
  );
}
