import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';
import { Box, Button, MenuItem, FormControl, Select, Tooltip } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { qbReportOptions, iQBasePOReport, mapBasePOReport, iQBReportSelect, basePOReportColumns, mapReportColumns } from './QBReportInterfaces';
import CustomDataGridToolbar from '../components/CustomDataGridToolbar';
import { renderCustom } from '../components/DataGridUtils';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


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

export default function QBReports(props) {
  const [reportSelection, setReportSelection] = React.useState<iQBReportSelect>();
  const [showDataGrid, setShowDataGrid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<iQBasePOReport[]>([]);
  const [reportColumns, setReportColumns] = React.useState<GridColDef[]>([]);

  const handleSelection = (event) => {
    setReportSelection(qbReportOptions.find((i) => i.reportName === event.target.value));
  };

  const generateReport = () => {
    getData();
  };

  async function getData() {
    setIsLoading(true);

    const url = api + "report";
    const params = new URLSearchParams();
    params.append("tableId", reportSelection?.tableID || '');
    params.append("reportId", reportSelection?.reportID || '');

    console.log(url + `?${params}`)

    try {
      const response = await fetch(url + `?${params}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json: any = await response.json();

      setIsLoading(false);

      //we must have a valid report selected to show data
      if (reportSelection) {
        setReportData(reportSelection.dataMapper(json));
        setReportColumns(reportSelection.reportColumns(json[0]));
        setShowDataGrid(true);
      }

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
            value={reportSelection?.reportName || ""}
            label="Select Report"
            onChange={handleSelection}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {qbReportOptions?.map((report) => {
              return (
                <MenuItem key={report.reportName} value={report.reportName || ""}>
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
          columns={reportColumns}
          getRowId={(row) => row.uniqueGridID}
          slots={{
            toolbar: CustomDataGridToolbar,
          }}
          showToolbar
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
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
