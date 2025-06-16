import { Button, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

// all our custom data rendering goes through here. 
// Add new checks and update this method based on types, or write a new export to this file
export const renderCustom = (params: GridRenderCellParams<any, any>) => {
  return (dayjs.isDayjs(params.value) ? renderCustomDate(params) : renderCustomString(params));
}

// callback: set some value equal to row data when button clicked
export const renderButton = (params: GridRenderCellParams<any, string>, setFunction: Function) => {
  return (
    <Button
      style={{ color: 'purple' }}
      sx={{ textDecoration: 'underline' }}
      onClick={() => setFunction(params.row)}>
      {params.value}
    </Button>
  );
};

// imagine a world where everything is a string
const renderCustomString = (params: GridRenderCellParams<any, any>) => {
  return (
    <Tooltip title={String(params.value)}>
      <span>{String(params.value)}</span>
    </Tooltip>
  );
};

// all date data for grids should be in dayjs. This is default display
// dayjs takes dates internally saved in UTC and converts them to local time automatically. Both ways
const renderCustomDate = (params: GridRenderCellParams<any, Dayjs>) => {
  return (
    <Tooltip title={params.value?.format('DD MMM YYYY hh:mm:ss a')}>
      <span>{params.value?.format('DD MMM YYYY')}</span>
    </Tooltip>
  );
};