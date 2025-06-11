import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';
import { Autocomplete, Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';
import { iPartMaster, mapJSONtoPart } from './PartInterface';
import PartInfoCard from './PartInfoCard';

const example = require('./DummyPartData.json');

const api = process.env.REACT_APP_BASE_URL;

const styles = {
  ReportGrid: {
    paddingTop: '20px',
  }
}


export default function PartMaster(props) {
  const [partSelection, setPartSelection] = React.useState<iPartMaster | null>(null);
  const [allParts, setAllParts] = React.useState<iPartMaster[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayPartInfo, setDisplayPartInfo] = React.useState(false);

  useEffect(() => {
    getPartList();
  }, [])

  useEffect(() => {
    setDisplayPartInfo(false);
  }, [partSelection])

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

  const PartDropdown = (
    <Box>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Autocomplete
          sx={{ m: 1, width: 400, paddingBottom: '13px' }}
          disabled={isLoading}
          options={allParts}
          getOptionLabel={(option: iPartMaster) => option.partNumber + ' | ' + option.partName + ' | ' + option.revision}
          autoComplete
          selectOnFocus
          clearOnBlur
          includeInputInList
          value={partSelection}
          onChange={(event: any, newValue: iPartMaster | null) => {
            setPartSelection(newValue)
          }}
          renderInput={(params) => (
            <TextField
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: "18px",
                    fontWeight: 550
                  }
                },
              }}
              {...params}
              label="Select a Part: Num | Name | Rev"
              variant="standard" />
          )}
        />
        <Button variant="outlined" color="primary" size="large"
          disabled={!partSelection} loading={isLoading}
          onClick={() => setDisplayPartInfo(true)}>
          Get Part Info
        </Button>
      </div>
    </Box>
  );

  return (
      <div>
        {PartDropdown}
        {(partSelection && displayPartInfo) &&
          <PartInfoCard partData={partSelection} isLoading={isLoading} setIsLoading={setIsLoading}>
          </PartInfoCard>}
      </div>
  );
}
