import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import HomeForm from "./components/SecondInvoice/HomeForm";
import GeneratedInvoice from "./components/SecondInvoice/GeneratedInvoice";
import ThirdInvoiceHome from "./components/ThirdInvoice/ThirdInvoiceHome";
import GeneratedWorkInvoice from "./components/ThirdInvoice/GeneratedWorkInvoice";
import Invoicemain from "./components/Invoicemain";
import CheckHome from "./components/CheckInvoice/CheckHome";
// import Invoicemain from "./components/Invoicemain";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<Invoicemain />} />
          <Route exact path="/work_order_invoice" element={<ThirdInvoiceHome />} />
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
            path="/check"
            element={<CheckHome  />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
