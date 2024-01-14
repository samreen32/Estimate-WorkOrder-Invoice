import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import HomeForm from "./components/SecondInvoice/HomeForm";
import GeneratedInvoice from "./components/SecondInvoice/GeneratedInvoice";
import ThirdInvoiceHome from "./components/ThirdInvoice/ThirdInvoiceHome";
import GeneratedWorkInvoice from "./components/ThirdInvoice/GeneratedWorkInvoice";
import Invoicemain from "./components/Invoicemain";
import CheckHome from "./components/CheckInvoice/CheckHome";
import TableInvoices from "./components/SecondInvoice/TableInvoices";
import EditInvoice from "./components/SecondInvoice/EditInvoice";
import TableThirdInvoice from "./components/ThirdInvoice/TableThirdInvoice";
import EditThirdInvoice from "./components/ThirdInvoice/EditThirdInvoice";
import EditInvoice2 from "./components/SecondInvoice/EditInvoice2";
import GenerateCheck from "./components/CheckInvoice/GenerateCheck";
import TableEstimate from "./components/SecondInvoice/TableEstimate";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<Invoicemain />} />
          <Route exact path="/work_order_invoice" element={<ThirdInvoiceHome />} />
          <Route exact path="/estimate_report" element={<TableEstimate />} />
          <Route exact path="/invoice_report" element={<TableInvoices />} />
          <Route exact path="/modify_estimate_report" element={<EditInvoice />} />
          <Route exact path="/modify_invoice_report" element={<EditInvoice2 />} />
          <Route exact path="/estimate_invoice" element={<HomeForm />} />
          <Route
            exact
            path="/generated_invoice"
            element={<GeneratedInvoice />}
          />
          <Route
            exact
            path="/generated_workout_invoice"
            element={<GeneratedWorkInvoice />}
          />
          <Route
            exact
            path="/workout_report"
            element={<TableThirdInvoice />}
          />
            <Route
            exact
            path="/modify_workorder_report"
            element={<EditThirdInvoice />}
          />
           <Route
            exact
            path="/check"
            element={<CheckHome  />}
          />
          <Route
            exact
            path="/generate_check"
            element={<GenerateCheck  />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
