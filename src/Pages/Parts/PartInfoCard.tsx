import * as React from 'react';
import { Card, Grid, FormControl, TextField, InputLabel, Switch, Typography, Button, Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PropsWithChildren, useEffect } from 'react';
import { iPartData } from './PartInterface';

const api = process.env.REACT_APP_BASE_URL;

const styles = {
    Card: {
        marginTop: '30px',
        maginBottom: '30px',
        marginLeft: '30px',
        marginRight: '30px',
        padding: '20px'
    },
    Header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px'
    },
    Buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: '20px'
    },
    NewPartHeader: {
        display: 'flex',
        margin: '10px 60px 50px',
    },
    ReportGrid: {
        paddingTop: '20px',
    }
}

interface PartInfoProps extends PropsWithChildren<any> {
    partData: iPartData,
    isLoading: boolean,
    setIsLoading: Function,
    isNewPart?: boolean
}

export default function PartInfoCard({ partData, isLoading, setIsLoading, isNewPart, children }: PartInfoProps) {

    const [disableEdits, setDisableEdits] = React.useState(isNewPart ? false : true);
    const [localPartData, setLocalPartData] = React.useState<iPartData>(partData);

    const handlePartUpdate = (value, field) => {
        setLocalPartData({ ...localPartData, [field]: value });
    };

    useEffect(() => {
        setDisableEdits(isNewPart ? false : true);
        setLocalPartData(partData);
    }, [partData])

    return (
        <Card style={styles.Card}>
            <Card variant="outlined">
                {!isNewPart &&
                    <div style={styles.Header}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25, paddingLeft: '50px' }}>
                            {(disableEdits ? "Displaying Info" : "Editing Info") + " for Part Number: " + partData.partNumber}
                        </Typography>
                        <div>
                        </div>
                        <Card variant="outlined" style={{ display: 'flex', flexDirection: 'row' }}>
                            <InputLabel style={{ paddingTop: '9px' }}>Enable Edits</InputLabel>
                            <Switch onChange={() => setDisableEdits(!disableEdits)} checked={!disableEdits} color="secondary" />
                        </Card>
                    </div>
                }
                {isNewPart && <div style={{margin: '20px 5px'}}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25, paddingLeft: '50px' }}>
                        Submit a New Part
                    </Typography>
                </div>}
                <Grid container columnSpacing={3} rowSpacing={4} columns={20} alignItems="center" justifyContent="center" >
                {isNewPart && 
                    <Grid size={{  xs: 10, md: 8, lg: 5, xl: 4 }}>
                        <InputLabel>Part Number</InputLabel>
                        <TextField
                            fullWidth
                            multiline
                            variant='standard'
                            value={localPartData.partNumber}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'partNumber');
                            }}
                        />
                    </Grid>}
                {isNewPart && 
                    <Grid size={{  xs: 10, md: 12, lg: 15, xl: 16 }}>
                    </Grid>}
                    <Grid size={{ xs: 10, md: 8, lg: 5, xl: 4 }}>
                        <InputLabel>Part Name</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            multiline
                            variant='standard'
                            value={localPartData.partName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'partName');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Revision</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.revision}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'revision');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 8 }}>
                        <InputLabel>Part Description</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            multiline
                            variant='standard'
                            value={localPartData.partDescription}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'partDescription');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Owner</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.owner}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'owner');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Part Category</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            multiline
                            variant='standard'
                            value={localPartData.partCategory}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'partCategory');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Part Family</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            multiline
                            variant='standard'
                            value={localPartData.partFamily}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'partFamily');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Traceability Metric</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.traceabilityInfo}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'traceabilityInfo');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 1 }}>
                        <InputLabel>Unit</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.unitMeasure}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'unitMeasure');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Unit Conversion</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.conversion}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'conversion');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Price</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.price}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'price');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <InputLabel>Supplier Part Num</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.supplierPartNumber}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'supplierPartNumber');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <InputLabel>Manufacturer</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.manufacturer}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'manufacturer');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <InputLabel>Vendor</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.vendor}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'vendor');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Created Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disabled={disableEdits}
                                value={localPartData.createdDate}
                                defaultValue={dayjs(new Date())}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setLocalPartData({ ...localPartData, createdDate: newValue })
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Last Modified</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disabled={disableEdits}
                                value={localPartData.lastModifiedDate}
                                defaultValue={dayjs(new Date())}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setLocalPartData({ ...localPartData, lastModifiedDate: newValue })
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 2 }}>
                        <InputLabel>Last Modified By</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.lastModifiedBy}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'lastModifiedBy');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <InputLabel>Storage Hazard</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.hazard}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'hazard');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <InputLabel>Storage Requirements</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.storageRequirement}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'storageRequirement');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <InputLabel>Packaging Requirements</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.packagingRequirement}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'packagingRequirement');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <InputLabel>Has Shelf Life</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.requireShelfLife}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'requireShelfLife');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <InputLabel>Shelf Life Details</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.shelfLife}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'shelfLife');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <InputLabel>Inspection Required</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.inspectionRequired}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'inspectionRequired');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <InputLabel>Inspection Details</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            variant='standard'
                            value={localPartData.inspectionDetails}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'inspectionDetails');
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 5, md: 3, lg: 2, xl: 8 }}>
                        <InputLabel>Notes</InputLabel>
                        <TextField
                            disabled={disableEdits}
                            fullWidth
                            maxRows={3}
                            multiline
                            variant='standard'
                            value={localPartData.notes}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handlePartUpdate(event.target.value, 'notes');
                            }}
                        />
                    </Grid>
                </Grid>
                {!disableEdits &&
                    <div style={styles.Buttons}>
                        <Card variant="outlined" style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button variant="outlined" size="large"
                                onClick={() => setLocalPartData(partData)}>
                                Clear Edits
                            </Button>
                            <Button variant="contained" size="large"
                                loading={isLoading}
                                onClick={() => setLocalPartData(partData)}>
                                Submit Edits
                            </Button>
                        </Card>
                    </div>
                }
            </Card>
        </Card>
    );
}
