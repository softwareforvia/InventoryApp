/* File of different reports, empty objects, and maps */

import dayjs, { Dayjs } from "dayjs";
import { renderCustom } from "../components/DataGridUtils";
import { GridColDef } from "@mui/x-data-grid";

// report selection
export interface iQBReportSelect {
  reportName: string,
  tableID: string,
  reportID: string,
  dataMapper: (data: any) => any,
  reportColumns: (dataRow: any) => GridColDef[]
}

/* REPORTS SECTION */

// All Generic Reports
export const mapReportColumns = (rowOne: any) => {
  const allFields = (Object.keys(rowOne).map((key) => {
      return ({ field: key, headerName: key, renderCell: renderCustom, flex: 1 })
  }))
  return allFields.filter((f) => f.field !== "uniqueGridID")
}

// Data for all generic reports. More careful processing elsewhere for reports we care about
export const mapReportData = (rawData: any) => {
  let gridID = 1;
  return rawData.map((row) => {
    const oneRow = {};
    Object.entries(row).forEach(([key, value]) => {
        // date to dayjs... it pays to be cautious, so we don't catch all of these well
        // but this is the only way I can get SOME dates at all without also catching numeric fields
        if(dayjs(String(value), 'YYYY-MM-DD').isValid()){
          oneRow[key] = dayjs(new Date(String(value)));
        }
        else if(typeof value === 'object' && value !== null){
          oneRow[key] = JSON.stringify(value);
        }
        else {
          oneRow[key] = value;
        }
    })
    oneRow["uniqueGridID"] = gridID++;
    return oneRow;
  })
}

//Report: MS - PO
export interface iQBasePOReport {
  DateCreated: Dayjs,
  RecordID: number,
  PONum: number,
  Approver: string,
  Team: string,
  Supplier: string,
  ShippingCity: string,
  Total: number,
  TotalValBilled: number,
  Requestor: string,
  ShipToName: string,
  Status: string,
  ShipToOption: string,
  Receiver: string,
  uniqueGridID: number
};

export const mapBasePOReport = (rawData: any[]) => {
  let gridID = 1;
  return rawData.map((raw: any) => {
    const reportRow: iQBasePOReport =
    {
      Approver: raw['Approver Name'],
      DateCreated: dayjs(raw['Date Created']),
      RecordID: raw['Record ID#'],
      PONum: raw['PO#'],
      Team: raw.Team,
      Supplier: raw.Supplier,
      ShippingCity: raw['Shipping Address: City'],
      Total: raw['PO Total'],
      TotalValBilled: raw['Total Value of Goods/Services Billed To Date'],
      Requestor: raw['Requestor - Full Name'],
      ShipToName: raw['Ship To Name'],
      Status: raw.Status,
      ShipToOption: raw['Ship To Option'],
      Receiver: raw['Receiver - Full Name'],
      uniqueGridID: gridID++
    }
    return reportRow;
  });
}

export const basePOReportColumns: GridColDef[] = [
  {
    field: 'DateCreated',
    headerName: 'Date Created',
    renderCell: renderCustom
  },
  {
    field: 'PONum',
    headerName: 'PO Number',
    renderCell: renderCustom
  },
  {
    field: 'Approver',
    headerName: 'Approver',
    renderCell: renderCustom
  },
  {
    field: 'Team',
    headerName: 'Team',
    renderCell: renderCustom
  },
  {
    field: 'Supplier',
    headerName: 'Supplier',
    renderCell: renderCustom
  },
  {
    field: 'ShippingCity',
    headerName: 'Ship to City',
    renderCell: renderCustom
  },
  {
    field: 'Total',
    headerName: 'PO Total',
    renderCell: renderCustom
  },
  {
    field: 'TotalValBilled',
    headerName: 'Total Billed',
    renderCell: renderCustom
  },
  {
    field: 'Requestor',
    headerName: 'Requestor',
    renderCell: renderCustom
  },
  {
    field: 'Status',
    headerName: 'Status',
    renderCell: renderCustom
  },
  {
    field: 'ShipToOption',
    headerName: 'Ship To',
    renderCell: renderCustom
  },
  {
    field: 'Receiver',
    headerName: 'Receiver',
    renderCell: renderCustom
  },
];

/* END REPORTS SECTION */

// we hard code the report options we provide. 
// tableID, and reportID accessed from api thru https://github.com/tflanagan/node-quickbase?tab=readme-ov-file
// all report options, even unmapped ones, should be entered here unless it's necessary to set dynamically
// we set some of our reports dynamically because it's annoying and the queries aren't used elsewhere in the app
export const qbReportOptions: iQBReportSelect[] = (
  [
    {
      reportName: "PO Report",
      tableID: 'brmcrtevy',
      reportID: '91',
      dataMapper: (data) =>mapBasePOReport(data),
      reportColumns: (rowOne) => {return(basePOReportColumns)}
    },
    {
      reportName: "Kodiak - All issued POs",
      tableID: 'brmcrtevy',
      reportID: '80',
      dataMapper: (data) => mapReportData(data),
      reportColumns: (rowOne) => mapReportColumns(rowOne)
    },
    {
      reportName: "Team Members",
      tableID: 'brvah5c7u',
      reportID: '1',
      dataMapper: (data) => mapReportData(data),
      reportColumns: (rowOne) => mapReportColumns(rowOne)
    },
    {
      reportName: "All Suppliers",
      tableID: 'brmcrtfa4',
      reportID: '5',
      dataMapper: (data) => mapReportData(data),
      reportColumns: (rowOne) => mapReportColumns(rowOne)
    },
    {
      reportName: "Supplier Contact Info",
      tableID: 'bru9cjtwx',
      reportID: '1',
      dataMapper: (data) => mapReportData(data),
      reportColumns: (rowOne) => mapReportColumns(rowOne)
    },
    {
      reportName: "PO Receipts",
      tableID: 'bssi2yucd',
      reportID: '1',
      dataMapper: (data) => mapReportData(data),
      reportColumns: (rowOne) => mapReportColumns(rowOne)
    }
  ]
);