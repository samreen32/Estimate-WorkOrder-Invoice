import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const generateRandomNumber = () => {
  //   return Math.floor(10000 + Math.random() * 90000);
  // };
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [estimateData, setEstimateData] = useState({
    estimate_no: "",
    estimate_address: [""],
    estimate_date: "",
    estimate_project: "",
    items: [
      {
        estimate_item: "",
        estimate_description: "",
        estimate_quantity: "",
        estimate_cost: "",
      },
    ],
    estimate_invoice: {
      estimate_total: null,
    },
  });

  const [estimateUpdateData, setEstimateUpdateData] = useState({
    estimate_no: "",
    estimate_address: [""],
    estimate_date: "",
    estimate_project: "",
    items: [
      {
        estimate_item: "",
        estimate_description: "",
        estimate_quantity: "",
        estimate_cost: "",
      },
    ],
    estimate_invoice: {
      estimate_total: null,
    },
  });

  // Third Invoice
  const [workInvoiceDetails, setWorkInvoiceDetails] = useState(null);
  const [workOrderData, setWorkOrderData] = useState({
    cust_id: "",
    job_name: "",
    phone: "",
    work_date: "",
    work_address: ["", "", ""],
    city: "",
    zip: "",
    special_instruction: "",
    material_desc: ["", "", ""],
    tools: "",
    labor: "",
    sum_of: "",
    contractor: "",
    contractor_auth_sign: "",
    contractor_date: "",
    independent_contractor: "",
    independent_contractor_auth_sign: "",
    independent_contractor_date: "",
  });

  const [workOrderUpdateData, setWorkOrderUpdateData] = useState({
    cust_id: "",
    job_name: "",
    phone: "",
    work_date: "",
    work_address: ["", "", ""],
    city: "",
    zip: "",
    special_instruction: "",
    material_desc: ["", "", ""],
    tools: "",
    labor: "",
    sum_of: "",
    contractor: "",
    contractor_auth_sign: "",
    contractor_date: "",
    independent_contractor: "",
    independent_contractor_auth_sign: "",
    independent_contractor_date: "",
  });

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = `${phoneNumber}`.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const formatPhone = (inputPhone) => {
    const cleanedInput = inputPhone.replace(/\D/g, "");
    if (cleanedInput.length >= 3) {
      return (
        cleanedInput.slice(0, 3) +
        "-" +
        cleanedInput.slice(3, 6) +
        (cleanedInput.length > 6 ? "-" + cleanedInput.slice(6) : "")
      );
    } else {
      return cleanedInput;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        formatPhoneNumber,
        formatPhone,
        estimateData,
        setEstimateData,
        estimateUpdateData,
        setEstimateUpdateData,
        workInvoiceDetails,
        setWorkInvoiceDetails,
        workOrderData,
        // generateRandomNumber,
        setWorkOrderData,
        invoiceDetails,
        setInvoiceDetails,
        workOrderUpdateData, setWorkOrderUpdateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
