import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import Menu from '@mui/material/Menu';
import { gray } from '../../shared-theme/themePrimitives';

const styles = {
  NavbarButtons: {
    paddingLeft: '13px',
    paddingRight: '13px'
  },
  BorderedButton: {
    backgroundColor: alpha(gray[50], 0.3),
    border: '1px solid ',
    borderColor: gray[200],
  }
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const topBarOption = (page: string, route: string, menues: { name: string, route: string }[]) => {
    return (
      <>
        <Button variant="text" color="info" size="medium"
          id={route + "-button"}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={styles.NavbarButtons}>
          {page}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={navOpen}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': route + "-button",
            },
          }}
        >
          {menues.map((menu) => {
            return (
              <MenuItem onClick={handleClose}>
                <Button variant="text" color="info" size="medium" href={"/" + route + "/" + menu.route}>
                  {menu.name}
                </Button>
              </MenuItem>
            )
          })}
        </Menu>
      </>
    )
  }

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="medium" href="/" style={styles.NavbarButtons}>
                Home
              </Button>
              <Button variant="text" color="info" size="medium" href="/qb-reports" style={styles.NavbarButtons}>
                QuickBase Reports
              </Button>
              <Button variant="text" color="info" size="medium" href="/inventory" style={styles.NavbarButtons}>
                Inventory
              </Button>
              {topBarOption('Parts', 'parts', [
                { name: "Part Master", route: "part-master" },
                { name: "Part Viewer", route: "parts-viewer" },
                { name: "Create New Part", route: "part-master2" }
              ])}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            <ColorModeIconDropdown sx={styles.BorderedButton} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown sx={styles.BorderedButton} size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth href="/">
                    Home
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth href="/qb-reports">
                    QuickBase Reports
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth href="/inventory">
                    Inventory
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth href="/part-master">
                    Part Master
                  </Button>
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
