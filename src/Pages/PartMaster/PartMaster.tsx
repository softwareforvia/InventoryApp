import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';
import { Autocomplete, Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';
import { iPartMaster, mapJSONtoPart } from './PartInterface';

const example = require('./DummyPartData.json');

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

const emptyPart: iPartMaster = {
  partID: 0,
  partNumber: '',
  revision: '',
  partName: '',
  partDescription: '',
  unitMeasure: '',
  conversion: '',
  price: 0,
  partCategory: '',
  partFamily: '',
  traceabilityInfo: '',
  supplierPartNumber: '',
  manufacturer: '',
  vendor: '',
  hazard: '',
  storageRequirement: '',
  packagingRequirement: '',
  requireShelfLife: false,
  shelfLife: '',
  inspectionRequired: false,
  inspectionDetails: '',
  owner: '',
  createdDate: new Date(),
  lastModifiedDate: new Date(),
  lastModifiedBy: '',
  notes: ''
}


export default function PartMaster(props) {
  const [partSelection, setPartSelection] = React.useState<iPartMaster | null>(emptyPart);
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
        getOptionLabel={(option: iPartMaster) => option.partNumber + ' | ' + option.partName}
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
      }},
  }}
          {...params} 
          label="Select a Part: Num | Name" 
          variant="standard" />
        )}
      />
        <Button variant="outlined" color="warning" size="large"
          disabled={!partSelection} loading={isLoading}
          onClick={() => alert(JSON.stringify(partSelection))}>
          Get Part Info
        </Button>
      </div>
    </Box>
  );

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Box style={styles.Box}>
        {PartDropdown}
      </Box>
      <Footer />
    </AppTheme>
  );
}
