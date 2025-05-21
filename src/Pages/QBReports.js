import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import AppTheme from '../shared-theme/AppTheme';
import { Box, Button, MenuItem, FormControl, Select } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

const styles = {
  Box: {
    paddingTop: '150px',
    paddingBottom: '50px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  ReportGrid: {
    height: 400,
    width: 800,
    paddingTop: '20px',
  }
}
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function About(props) {
  const [reportSelection, setReportSelection] = React.useState('');
  const [showDataGrid, setShowDataGrid] = React.useState(false);

  const handleSelection = (event) => {
    setReportSelection(event.target.value);
  };

  const generateReport = () =>{
    setShowDataGrid(true);
  };


  const ReportDropdown = (
    <Box>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <FormControl sx={{ m: 1, width: 200 }}>
          <Select
            value={reportSelection}
            label="Select Report"
            onChange={handleSelection}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            <MenuItem value={'Option A'}>Option A</MenuItem>
            <MenuItem value={'Option B'}>Option B</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="warning" size="large" disabled={!reportSelection} onClick={generateReport}>
          Generate Report
        </Button>
      </div>
    </Box>
  );

  const ReportGrid = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box hidden={!showDataGrid} style={styles.ReportGrid}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Box style={styles.Box}>
        {ReportDropdown}
        {ReportGrid}
      </Box>
      <Footer />
    </AppTheme>
  );
}
