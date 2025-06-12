import * as React from 'react';
import { Autocomplete, Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';
import { iPartData, mapJSONtoPart, mapPartsByRevision } from './PartInterface';
import PartInfoCard from './PartInfoCard';

const example = require('./DummyPartData.json');

const api = process.env.REACT_APP_BASE_URL;

export default function PartMaster(props) {
  const [partSelection, setPartSelection] = React.useState<iPartData | null>(null);
  const [allParts, setAllParts] = React.useState<iPartData[]>([]);
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
          getOptionLabel={(option: iPartData) => option.partNumber + ' | ' + option.partName + ' | ' + option.revision}
          autoComplete
          selectOnFocus
          clearOnBlur
          includeInputInList
          value={partSelection}
          onChange={(event: any, newValue: iPartData | null) => {
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
