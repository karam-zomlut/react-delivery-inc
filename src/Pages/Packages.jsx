import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const Packages = ({ appData, handleDeletePackage, handleUp, handleDown, handleAddPackage }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    weight: "",
    customerid: "",
    price: "",
  });

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = () => {
    if (formData.weight && formData.customerid && formData.price && formData.weight > 0 && formData.price > 0) {
      handleAddPackage(formData);
      setFormData({
        weight: "",
        customerid: "",
        price: "",
      });
      setOpen(false);
    } else {
      alert("Please Check Your Inputs");
    }

  }


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setOpen(true)}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData && appData.packages
              .sort((a, b) => a.shippingOrder - b.shippingOrder)
              .map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>

                    <TableCell>
                      {
                        appData.customers.find(
                          (customer) => customer.id === row.customerid
                        ).name
                      }
                    </TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell className="actions">
                      <Button
                        variant="contained"
                        onClick={() => handleDeletePackage(row.id)}
                      >
                        Delete
                      </Button>
                      <Button onClick={() => handleUp(row.shippingOrder)}>
                        <KeyboardArrowUpIcon />
                      </Button>
                      <Button onClick={() => handleDown(row.shippingOrder)}>
                        <KeyboardArrowDownIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Start Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Add Package</DialogTitle>
        <DialogContent>
          <FormControl className="form-control" fullWidth>
            <InputLabel id="customer">Customer</InputLabel>
            <Select
              labelId="customer"
              id="customerid"
              name="customerid"
              value={formData?.customerid}
              label="Customer"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {appData.customers.map((customer) => {
                return (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl className="form-control" fullWidth>
            <TextField
              id="weight"
              name="weight"
              label="Weight"
              type="number"
              value={formData?.weight}
              onChange={(e) => handleChange(e)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0
              }}
            />
          </FormControl>
          <FormControl className="form-control" fullWidth>
            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formData?.price}
              onChange={(e) => handleChange(e)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Packages;
