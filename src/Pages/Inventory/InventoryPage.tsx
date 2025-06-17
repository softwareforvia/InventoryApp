import { Box, Card, CssBaseline, Tab, Tabs } from "@mui/material";
import React from "react";
import AppTheme from "../../shared-theme/AppTheme";
import AppAppBar from "../components/AppAppBar";
import Footer from "../components/Footer";
import { Route, useLocation, Routes, Navigate, Link } from "react-router-dom";
import InventoryView from "./InventoryView";


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

export default function InventoryPage(props) {
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
                        <Tab sx={{ fontSize: '18px', marginRight: '30px' }} component={Link} to="/inventory/inventory-view" value="/inventory/inventory-view" label="Inventory Viewer" />
                        <Tab sx={{ fontSize: '18px', marginRight: '30px' }} component={Link} to="/inventory/locations" value="/inventory/locations" label="Manage Locations" />
                        <Tab sx={{ fontSize: '18px' }} component={Link} to="/inventory/inventory-lookup" value="/inventory/inventory-lookup" label="Item Lookup" />
                    </Tabs>
                </Box>
            </div>
            <Card variant="outlined" style={styles.ContentCard}>
                <Routes>
                    <Route index element={<Navigate to="/inventory/inventory-view" />} />
                    <Route path="/locations" element={<InventoryView />} />
                    <Route path="/inventory-view" element={<InventoryView />} />
                    <Route path="/inventory-lookup" element={<InventoryView />} />
                </Routes>
            </Card>
            <Footer />
        </AppTheme>
    );
}