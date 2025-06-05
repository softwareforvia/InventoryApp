import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';
import { Box, Button, MenuItem, FormControl, Select } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { qbReportOptions, iQBBaseReport, emptyBaseReport, mapBaseReport, iQBReportSelect } from './QBReportInterfaces';

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

const columns: GridColDef[] = [
  {
    field: 'DateCreated',
    headerName: 'Date Created',
  },
  {
    field: 'PONum',
    headerName: 'PO Number',
  },
  {
    field: 'Approver',
    headerName: 'Approver',
  },
  {
    field: 'Team',
    headerName: 'Team',
  },
  {
    field: 'Supplier',
    headerName: 'Supplier',
  },
  {
    field: 'ShippingCity',
    headerName: 'Ship to City',
  },
  {
    field: 'Total',
    headerName: 'PO Total',
  },
  {
    field: 'TotalValBilled',
    headerName: 'Total Billed',
  },
  {
    field: 'Requestor',
    headerName: 'Requestor',
  },
  {
    field: 'Status',
    headerName: 'Status',
  },
  {
    field: 'ShipToOption',
    headerName: 'Ship To',
  },
  {
    field: 'Receiver',
    headerName: 'Receiver',
  },
];


export default function QBReports(props) {
  const [reportSelection, setReportSelection] = React.useState<iQBReportSelect>();
  const [showDataGrid, setShowDataGrid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<iQBBaseReport[]>(emptyBaseReport);

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

      const json: iQBBaseReport[] = await response.json();

      setIsLoading(false);
      setReportData(mapBaseReport(json));
      setShowDataGrid(true);

      console.log(json);

    } catch (error: any) {
      setIsLoading(false);
      alert('Failed to reach API');
      console.error(error.message);
    }
  }

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
            {qbReportOptions?.map((report) => {
              return (
                <MenuItem key={report.reportID} value={report.reportID}>
                  {report.reportName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button variant="outlined" color="warning" size="large" 
                disabled={!reportSelection} loading={isLoading} 
                onClick={generateReport}>
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
          rows={reportData}
          columns={columns}
          getRowId={(row) => row.RecordID}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              },
            },
          }}
          pageSizeOptions={[10]}
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
