import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Customers from "./Pages/Customers";
import Packages from "./Pages/Packages";
import Invoices from "./Pages/Invoices";
import CustomerInvoice from "./Pages/CustomerInvoice";
import { Navbar, Sidebar } from "./Components";

// Functions
import { getData } from "./Functions";

function App() {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = async () => {
      const myData = await getData("/data.json");
      setAppData(myData);
    }
    data();
  }, []);

  // Delete Customer
  const handleDeleteCustomer = (id) => {
    setAppData({
      ...appData,
      customers: appData.customers.filter((c) => c.id !== id),
      packages: appData.packages.filter((p) => p.customerid !== id),
    });
  };

  // Delete Package
  const handleDeletePackage = (id) => {
    setAppData({
      ...appData,
      packages: appData.packages.filter((p) => p.id !== id),
    });
  }

  // Add Package
  const handleAddPackage = (packageData) => {
    const newPackage = {
      id: `pak${appData.packages.length + 1}`,
      weight: packageData.weight + 'kg',
      customerid: packageData.customerid,
      price: +packageData.price,
      shippingOrder: appData.packages.length + 1,
    }
    setAppData({
      ...appData,
      packages: [...appData.packages, newPackage],
    });
  }

  // Move Package Up
  const handleUp = (shippingOrder) => {
    const currnetPackage = appData.packages.find((p) => p.shippingOrder === shippingOrder);
    const prevPackage = appData.packages.find((p) => p.shippingOrder === shippingOrder - 1);
    if (prevPackage) {
      prevPackage.shippingOrder+=1;
      currnetPackage.shippingOrder-=1;
      
      setAppData({
        ...appData,
        packages: [...appData.packages],
      });
    }
    else {
      alert("Can't move up");
    }
  }

  // Move Package Down
  const handleDown = (shippingOrder) => {
    const nextPackage = appData.packages.find((p) => p.shippingOrder === shippingOrder + 1);
    const currnetPackage = appData.packages.find((p) => p.shippingOrder === shippingOrder);
    if (shippingOrder+1 <= appData.packages.length) {
      nextPackage.shippingOrder-=1;
      currnetPackage.shippingOrder+=1;
      
      setAppData({
        ...appData,
        packages: [...appData.packages],
      });
    }
    else {
      alert("Can't move down");
    }
  }

  useEffect(() => {
    const finalInvoices = []
    const allInv = appData.packages.map((p) => {
      const customer = appData.customers.find((c) => c.id === p.customerid);
      return {
          customerid: customer?.id,
          name: customer?.name,
          price: p.price,
          weight: +p.weight.slice(0, -2),
      };
    });

    allInv.forEach((inv) => {
      const invoice = finalInvoices.find((i) => i.customerid === inv.customerid);
      if (invoice) {
        invoice.price += inv.price;
        invoice.weight += inv.weight;
      } else {
        finalInvoices.push(inv);
      }
    })
    setInvoices(finalInvoices);
  }, [appData]);

  return (
    <div className="App">
      <Router>
        <Navbar setOpen={setOpen} />
        <Switch>
          <Route exact path="/">
            <Packages 
              appData={appData}
              handleDeletePackage={handleDeletePackage}
              handleUp={handleUp}
              handleDown={handleDown}
              handleAddPackage={handleAddPackage}
            />
          </Route>
          <Route path={"/customer/:id/invoice"}>
            <CustomerInvoice appData={appData} />
          </Route>
          <Route path="/customers">
            <Customers
              appData={appData}
              handleDeleteCustomer={handleDeleteCustomer}
            />
          </Route>
          <Route path="/invoices">
            <Invoices invoices={invoices} />
          </Route>
        </Switch>
        <Sidebar open={open} setOpen={setOpen} />
      </Router>
    </div>
  );
}

export default App;
