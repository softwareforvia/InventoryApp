/* File of different reports, empty objects, and maps */

export interface iQBReportSelect {
  reportName: string,
  tableID: string,
  reportID: string
}

export const qbReportOptions: iQBReportSelect[] = (
  [
    {
      reportName: "PO Report",
      tableID: 'brmcrtevy',
      reportID: '91'
    },
    {
      reportName: "Not Implemented",
      tableID: 'brmcrtevy',
      reportID: '111191'
    },
    {
      reportName: "Third Option",
      tableID: 'brmcrtevy',
      reportID: '1243491'
    }
  ]
);

//Report: MS - PO
export interface iQBBaseReport {
  DateCreated: Date,
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
  Receiver: string
};

export const emptyBaseReport = [{
  DateCreated: new Date(),
  RecordID: 0,
  PONum: 0,
  Approver: '',
  Team: '',
  Supplier: '',
  ShippingCity: '',
  Total: 0,
  TotalValBilled: 0,
  Requestor: '',
  ShipToName: '',
  Status: '',
  ShipToOption: '',
  Receiver: ''
}];

export const mapBaseReport = (rawData: any[]) => {
  return rawData.map((raw: any) => {
    const reportRow: iQBBaseReport =
    {
      Approver: raw['Approver Name'],
      DateCreated: raw['Date Created'],
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
      Receiver: raw['Receiver - Full Name']
    }
    return reportRow;
  });
}