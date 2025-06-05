import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const baseReportColumns: GridColDef[] = [
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


export default function QBReportTables({ data }: any) {

    const baseReportGrid = (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <DataGrid
                rows={data}
                columns={baseReportColumns}
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
        </div>
    );

    return (
        { baseReportGrid }
    )

}