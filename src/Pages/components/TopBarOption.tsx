import { Button, Menu, MenuItem } from "@mui/material";
import React, { PropsWithChildren } from "react";

const styles = {
  NavbarButtons: {
    paddingLeft: '13px',
    paddingRight: '13px'
  }
}
interface TopBarOptionProps extends PropsWithChildren<any> {
  page: string,
  route: string,
  menues: { name: string, route: string }[]
}

export default function TopBarOption({ page, route, menues }: TopBarOptionProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="text" color="info" size="medium"
        id={route + "-button"}
        aria-haspopup="true"
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