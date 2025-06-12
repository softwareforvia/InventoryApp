import * as React from 'react';
import { useEffect } from 'react';
import { iPartMaster, mapJSONtoPart, partGridColumns } from './PartInterface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card } from '@mui/material';

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
  const [allParts, setAllParts] = React.useState<iPartMaster[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getPartList();
  }, [])

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
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 13
                },
              },
            }}
            pageSizeOptions={[5, 10, 13, 20, 50]}
          />
        </div>
    </Card>
  );
}