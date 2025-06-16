import { Box, Card, CssBaseline, Tab, Tabs } from "@mui/material";
import React from "react";
import AppTheme from "../../shared-theme/AppTheme";
import AppAppBar from "../components/AppAppBar";
import Footer from "../components/Footer";
import PartMaster from "./PartMaster";
import { Route, useLocation, Routes, Navigate, Link } from "react-router-dom";
import Inventory from "../Inventory/Inventory";
import PartsViewer from "./PartsViewer";
import SubmitNewPart from "./SubmitNewPart";


const styles = {
    Box: {
        paddingTop: '150px',
        paddingBottom: '50px',
        paddingLeft: '50px',
        paddingRight: '50px',
        width: '600px'
    },
    ContentCard: {
        marginLeft: '50px',
        marginRight: '50px',
        paddingBottom: '50px',
        marginBottom: '100px'
    }
}

export default function PartsPage(props) {
    const { pathname } = useLocation();

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <AppAppBar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box style={styles.Box}>
                    <Tabs
                        centered
                        value={pathname}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab sx={{ fontSize: '20px', marginRight: '30px' }} component={Link} to="/parts/part-master" value="/parts/part-master" label="Part Master" />
                        <Tab sx={{ fontSize: '20px', marginRight: '30px' }} component={Link} to="/parts/parts-viewer" value="/parts/parts-viewer" label="Parts Viewer" />
                        <Tab sx={{ fontSize: '20px' }} component={Link} to="/parts/new-part" value="/parts/new-part" label="Submit New Part" />
                    </Tabs>
                </Box>
            </div>
            <Card variant="outlined" style={styles.ContentCard}>
                <Routes>
                    <Route index element={<Navigate to="/parts/part-master" />} />
                    <Route path="/part-master" element={<PartMaster />} />
                    <Route path="/parts-viewer" element={<PartsViewer />} />
                    <Route path="/new-part" element={<SubmitNewPart />} />
                </Routes>
            </Card>
            <Footer />
        </AppTheme>
    );
}