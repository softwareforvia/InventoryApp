import * as React from 'react';
import { useEffect } from 'react';
import { iPartData, mapJSONtoPart } from './PartInterface';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Card, Tooltip } from '@mui/material';
import PartInfoCard from './PartInfoCard';
import { Dayjs } from 'dayjs';
import CustomDataGridToolbar from '../components/CustomDataGridToolbar';

const example = require('./DummyPartData.json');

const api = process.env.REACT_APP_BASE_URL;

const styles = {
  Card: {
    marginTop: '30px',
    maginBottom: '30px',
    marginLeft: '30px',
    marginRight: '30px',
    padding: '20px'
  },
}

export default function PartsViewer(props) {
  const [allParts, setAllParts] = React.useState<iPartData[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [partSelection, setPartSelection] = React.useState<iPartData | null>(null);

  useEffect(() => {
    getPartList();
  }, [])

  // view in part master when button for part clicked
  const PartMasterButton = (params: GridRenderCellParams<any, string>) => {
    return (
      <Button
        style={{ color: 'purple' }}
        sx={{ textDecoration: 'underline' }}
        onClick={() => setPartSelection(params.row)}>
        {params.value}
      </Button>
    );
  };

  const renderCustom = (params: GridRenderCellParams<any, string>) => {
    return (
      <Tooltip title={params.value}>
        <span>{params.value}</span>
      </Tooltip>
    );
  };

  const renderDate = (params: GridRenderCellParams<any, Dayjs>) => {
    return (
      <Tooltip title={params.value?.format('DD MMM YYYY hh:mm:ss a')}>
        <span>{params.value?.format('DD MMM YYYY')}</span>
      </Tooltip>
    );
  };

  const partGridColumns: GridColDef[] = [
    {
      field: 'partNumber',
      headerName: 'Part Number',
      renderCell: PartMasterButton
    },
    {
      field: 'revision',
      headerName: 'Revision',
      renderCell: renderCustom
    },
    {
      field: 'partName',
      headerName: 'Part Name',
      width: 250,
      renderCell: renderCustom
    },
    {
      field: 'unitMeasure',
      headerName: 'Unit',
      renderCell: renderCustom
    },
    {
      field: 'conversion',
      headerName: 'Unit Conversion',
      renderCell: renderCustom
    },
    {
      field: 'price',
      headerName: 'Part Price',
      renderCell: renderCustom
    },
    {
      field: 'partCategory',
      headerName: 'Part Category',
      renderCell: renderCustom
    },
    {
      field: 'partFamily',
      headerName: 'Part Family',
      renderCell: renderCustom
    },
    {
      field: 'traceabilityInfo',
      headerName: 'Traceability Metric',
      renderCell: renderCustom
    },
    {
      field: 'supplierPartNumber',
      headerName: 'Supplier Part Num',
      renderCell: renderCustom
    },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      renderCell: renderCustom
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      renderCell: renderCustom
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      renderCell: renderDate
    },
    {
      field: 'lastModifiedDate',
      headerName: 'Last Modified',
      renderCell: renderDate
    },
  ];

  async function getPartList() {
    setIsLoading(true);

    const url = api + "/Part-Master/getAllParts";

    try {

      const json: any = example;

      setAllParts(json.map((part: any) => mapJSONtoPart(part)));

      setIsLoading(false);

    } catch (error: any) {
      setIsLoading(false);
      alert('Failed to reach API');
      console.error(error.message);
    }
  }

  return (
    <>
      <Card style={styles.Card}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <DataGrid
            rows={allParts}
            style={{ padding: '0px 10px 5px' }}
            columns={partGridColumns}
            loading={isLoading}
            getRowId={(row) => row.partID}
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
        </div>
      </Card>
      {(partSelection) &&
        <PartInfoCard partData={partSelection} isLoading={isLoading} setIsLoading={setIsLoading}>
        </PartInfoCard>}
    </>
  );
}