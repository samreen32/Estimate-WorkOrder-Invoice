import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const [estimateData, setEstimateData] = useState({
    estimate_no: generateRandomNumber(),
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
  const [workOrderData, setWorkOrderData] = useState({
    cust_id: generateRandomNumber(),
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

  return (
    <AuthContext.Provider
      value={{
        estimateData,
        setEstimateData,
        workOrderData,
        generateRandomNumber,
        setWorkOrderData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
