import { Drawer, List } from "@mui/material";
import React from "react";
import DrawerLink from "./DrawerLink";

const Sidebar = ({ open, setOpen }) => {
  // Create an array of links to render in the sidebar
  const links = [
    { linkName: "Packages", linkTo: "/" },
    { linkName: "Customers", linkTo: "/customers" },
    { linkName: "Invoices", linkTo: "/invoices" },
  ];
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <List style={{ width: "300px" }}>
        {/* Loop For Sidbar Links */}
        {links.map((link, index) => {
          return <DrawerLink key={index} link={link} setOpen={setOpen} />;
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
