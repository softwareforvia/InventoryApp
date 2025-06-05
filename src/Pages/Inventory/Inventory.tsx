import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';
import { Box } from '@mui/material'
const example = require('./exampleInventory.json');

const api = process.env.REACT_APP_BASE_URL;

const styles = {
  Box: {
    paddingTop: '150px',
    paddingBottom: '50px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  ReportGrid: {
    paddingTop: '20px',
  }
}


export default function Inventory(props) {
  const [reportSelection, setReportSelection] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelection = (event) => {
    setReportSelection(event.target.value);
  };

  const generateReport = () => {
    getData();
  };

  async function getData() {
    setIsLoading(true);

    const url = api + "report";
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json: any = example;

      setIsLoading(false);

      console.log(json);

    } catch (error: any) {
      setIsLoading(false);
      alert('Failed to reach API');
      console.error(error.message);
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Box style={styles.Box}>
      </Box>
      <Footer />
    </AppTheme>
  );
}
