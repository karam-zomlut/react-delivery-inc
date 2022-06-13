import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DrawerLink = ({ link, setOpen }) => {
  return (
    <ListItem button onClick={() => setOpen(false)}>
      <Link to={link.linkTo} className="link">
        <ListItemText primary={link.linkName} />
      </Link>
    </ListItem>
  );
};

export default DrawerLink;
