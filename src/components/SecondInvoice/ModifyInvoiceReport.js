import React, { useEffect, useRef, useState } from "react";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { GET_ESTIMATE_INVOICE, UPDATE_ESTIMATE_INVOICE } from "../../Auth_API";
import generatePDF from "react-to-pdf";

function ModifyInvoiceReport() {
  let navigate = useNavigate();
  const { estimateUpdateData, setEstimateUpdateData } = UserLogin();
  const [visibleAddressFields, setVisibleAddressFields] = useState(1);
  const [visibleContractorFields, setVisibleContractorFields] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [focusedContractorField, setFocusedContractorField] = useState(null);
  const { state } = useLocation();
  const { invoiceId } = state;
  const targetRef = useRef();

  /* Input field validation */
  const handleInputChange = (index, e) => {
    const { name, value } = e?.target || {};

    setEstimateUpdateData((prevData) => {
      if (index !== undefined) {
        const updatedItems = [...prevData.items];
        updatedItems[index] = {
          ...updatedItems[index],
          [name]: value,
        };

        const totalAmount = updatedItems.reduce(
          (total, item) =>
            total + (item.estimate_quantity || 0) * (item.estimate_cost || 0),
          0
        );

        return {
          ...prevData,
          items: updatedItems,
          estimate_total: totalAmount,
        };
      } else {
        if (
          name === "estimate_address_1" ||
          name === "estimate_address_2" ||
          name === "estimate_address_3"
        ) {
          const updatedAddress = [...prevData.estimate_address];
          const fieldIndex = Number(name.split("_")[2]);
          updatedAddress[fieldIndex - 1] = value;

          return {
            ...prevData,
            estimate_address: updatedAddress,
          };
        } else if (
          name === "estimate_contractor_1" ||
          name === "estimate_contractor_2" ||
          name === "estimate_contractor_3"
        ) {
          const updatedEstimate = [...prevData.estimate_contractor];
          const fieldIndex = Number(name.split("_")[2]);
          updatedEstimate[fieldIndex - 1] = value;

          return {
            ...prevData,
            estimate_contractor: updatedEstimate,
          };
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      }
    });
  };

  /* Endpoint integration */
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await axios.get(
          `${GET_ESTIMATE_INVOICE}/${invoiceId}`
        );
        if (response.data.success) {
          setEstimateUpdateData(response.data.estimate_invoice);
          console.log(response.data.estimate_invoice);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchInvoiceDetails();
  }, [invoiceId]);

  /* Update Endpoint integration */
  const handleUpdateInvoice = async () => {
    try {
      const response = await axios.put(
        `${UPDATE_ESTIMATE_INVOICE}/${invoiceId}`,
        estimateUpdateData
      );
      if (response.data.success) {
        console.log(response.data, "updateddddddddddddd");
        navigate("/generate_invoice");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Invoice Generated successfully.",
        });
        setEstimateUpdateData({
          estimate_no: "",
          estimate_address: [""],
          estimate_name: "",
          estimate_zip: "",
          estimate_city: "",
          estimate_phone: "",
          estimate_custEmail: "",
          estimate_contractor: [""],
          estimate_date: "",
          estimate_project: "",
          estimate_project_manager: "",
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message || "Failed to update invoice.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update invoice. Please try again later.",
      });
      console.error("Failed to update invoice:", error.message);
    }
  };

  const handleAddItem = () => {
    setEstimateUpdateData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          estimate_item: "",
          estimate_description: "",
          estimate_quantity: 0,
          estimate_cost: 0,
          estimate_total: 0,
        },
      ],
    }));
  };

  /* Press enter key to add new field as well as key focus */
  const handleAddressEnterKey = (e, fieldIndex) => {
    if (e.key === "Enter") {
      const nextVisibleFields = Math.min(visibleAddressFields + 1, 3);
      setVisibleAddressFields(nextVisibleFields);
      setFocusedField(nextVisibleFields - 1);
      e.preventDefault();
    }
  };

  const handleContractorEnterKey = (e, fieldIndex) => {
    if (e.key === "Enter") {
      const nextVisibleFields = Math.min(visibleContractorFields + 1, 3);
      setVisibleContractorFields(nextVisibleFields);
      setFocusedContractorField(nextVisibleFields - 1);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (focusedField !== null) {
      const inputRef = document.getElementById(
        `estimate_address_${focusedField + 1}`
      );
      if (inputRef) {
        inputRef.focus();
      }
    }
  }, [focusedField]);

  useEffect(() => {
    if (focusedContractorField !== null) {
      const inputRef = document.getElementById(
        `estimate_contractor_${focusedContractorField + 1}`
      );
      if (inputRef) {
        inputRef.focus();
      }
    }
  }, [focusedContractorField]);

  const handleGenerateNew = () => {
    setEstimateUpdateData({
      estimate_no: "",
      estimate_address: [""],
      estimate_name: "",
      estimate_zip: "",
      estimate_city: "",
      estimate_phone: "",
      estimate_custEmail: "",
      estimate_contractor: [""],
      estimate_date: "",
      invoice_date: "",
      estimate_project: "",
      estimate_project_manager: "",
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
    navigate("/generate_invoice");
  };

  return (
    <div id="invoice-generated mt-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "transparent",
        }}
        className="container mt-5"
      >
        <span onClick={handleGenerateNew} style={{ cursor: "pointer" }}>
          <i className="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
        </span>

        <div style={{ display: "flex" }}>
          <span onClick={handleUpdateInvoice} className="new-invoice-btn mx-3">
            Update Invoice
          </span>
          <span
            onClick={() => generatePDF(targetRef, { filename: "invoice.pdf" })}
            className="new-invoice-btn"
            style={{ background: "gray" }}
          >
            Generate Print
          </span>
        </div>
      </div>

      <div
        className="container px-5 py-5"
        style={{ width: "100%" }}
        ref={targetRef}
      >
        <>
          <div className="row mt-3">
            <div className="invoice-first-div col-10 px-5">
              <address className="px-3">
                H FLOOR COVERING LLC <br />
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  {" "}
                  1148 BLAKES FIELD PL{" "}
                </span>{" "}
                <br />
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  HENDERSON NV 89011
                </span>{" "}
                <br />
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  702-463-2265
                </span>{" "}
              </address>
            </div>
            <div className="col-2" style={{ display: "flex" }}>
              <div>
                <h4 style={{ textAlign: "center", fontSize: "25px", fontWeight: 600 }}>
                  <i>Invoice</i>
                </h4>
                <img src={logo} alt="logo tub" width={190} />
              </div>
            </div>
          </div>

          <form>
            <div className="report-border">
              <div className="row estimate_address_div px-2">
                <div className="col-md-6" style={{ display: "flex" }}>
                  <p>Customer Email</p>
                  <TextField
                    style={{ cursor: "pointer", width: "100%" }}
                    id="estimate_custEmail"
                    type="email"
                    variant="standard"
                    name="estimate_custEmail"
                    value={estimateUpdateData.estimate_custEmail}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
                <div className="col-md-6" style={{ display: "flex" }}>
                  <p>
                    Contractor </p>&nbsp;&nbsp;&nbsp;
                  {[1, 2, 3].map(
                    (fieldIndex) =>
                      fieldIndex <= visibleContractorFields && (
                        <React.Fragment key={`estimate_contractor_${fieldIndex}`}>
                          <TextField
                            id={`estimate_contractor_${fieldIndex}`}
                            type="text"
                            variant="standard"
                            name={`estimate_contractor_${fieldIndex}`}
                            style={{ width: "100%" }}
                            value={
                              estimateUpdateData.estimate_contractor[fieldIndex - 1] || ""
                            }
                            onChange={(e) => handleInputChange(undefined, e)}
                            onKeyDown={(e) =>
                              handleContractorEnterKey(e, fieldIndex)
                            }
                          />
                          <br />
                        </React.Fragment>
                      )
                  )}
                </div>
              </div>
              <div className="row estimate_address_div px-2">
                <div className="col-md-6" style={{ display: "flex" }}>
                  <p>Name</p>&nbsp;&nbsp;&nbsp;
                  <TextField
                    style={{ cursor: "pointer", width: "100%" }}
                    id="estimate_name"
                    type="email"
                    variant="standard"
                    name="estimate_name"
                    value={estimateUpdateData.estimate_name}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
                <div className="col-md-6" style={{ display: "flex" }}>
                  <p>Address</p>&nbsp;&nbsp;&nbsp;
                  {[1].map((fieldIndex) => (
                    fieldIndex <= visibleAddressFields && (
                      <React.Fragment key={`estimate_address_${fieldIndex}`}>
                        <TextField
                          id={`estimate_address_${fieldIndex}`}
                          type="text"
                          variant="standard"
                          name={`estimate_address_${fieldIndex}`}
                          value={estimateUpdateData.estimate_address[fieldIndex - 1] || ""}
                          onChange={(e) => handleInputChange(undefined, e)}
                          onKeyDown={(e) => handleAddressEnterKey(e, fieldIndex)}
                          style={{ width: "100%" }}
                        />

                      </React.Fragment>
                    )
                  ))}
                </div>
              </div>
              <div className="row estimate_address_div px-2">
                <div className="col-md-4" style={{ display: "flex" }}>
                  <p>City</p>&nbsp;&nbsp;&nbsp;
                  <TextField
                    style={{ cursor: "pointer", width: "70%" }}
                    id="estimate_city"
                    type="text"
                    variant="standard"
                    name="estimate_city"
                    value={estimateUpdateData.estimate_city}

                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>

                <div className="col-md-3" style={{ display: "flex" }}>
                  <p>Zip</p>&nbsp;&nbsp;&nbsp;
                  <TextField
                    style={{ cursor: "pointer", width: "60%" }}
                    id="estimate_zip"
                    type="text"
                    variant="standard"
                    name="estimate_zip"
                    value={estimateUpdateData.estimate_zip}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
                <div className="col-md-5" style={{ display: "flex" }}>
                  <p>Phone</p>&nbsp;&nbsp;&nbsp;
                  <TextField
                    style={{ cursor: "pointer", width: "100%" }}
                    id="estimate_phone"
                    type="number"
                    variant="standard"
                    name="estimate_phone"
                    value={estimateUpdateData.estimate_phone}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
              </div>
            </div>

            <div className="report-border mt-2">
              <div className="row estimate_details_div px-2 mt-3">
                <div className="col-md-4">
                  <p>Invoice Date</p>
                  <TextField
                    style={{ cursor: "pointer" }}
                    id="invoice_date"
                    type="date"
                    variant="standard"
                    name="invoice_date"
                    InputProps={{ disableUnderline: true }}
                    value={estimateUpdateData.invoice_date}
                    onChange={(e) => handleInputChange(undefined, e)}
                    placeholder="MM/DD/YY"
                  />
                </div>
                <div className="col-md-3">
                  <p>Invoice No.</p>
                  <TextField
                    id="estimate_no"
                    type="text"
                    variant="standard"
                    name="estimate_no"
                    InputProps={{ disableUnderline: true }}
                    value={estimateUpdateData.estimate_no}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
                <div className="col-md-2">
                  <p>Project</p>
                  <TextField
                    id="estimate_project"
                    type="text"
                    variant="standard"
                    name="estimate_project"
                    InputProps={{ disableUnderline: true }}
                    value={estimateUpdateData.estimate_project}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
                <div className="col-md-3">
                  <p>Project Manager</p>
                  <TextField
                    id="estimate_project_manager"
                    type="text"
                    variant="standard"
                    name="estimate_project_manager"
                    InputProps={{ disableUnderline: true }}
                    value={estimateUpdateData.estimate_project_manager}
                    onChange={(e) => handleInputChange(undefined, e)}
                  />
                </div>
              </div>

              <div className="line"></div>

              <div className="row item_details_div px-2">
                <div className="col-md-1">
                  <span className="plus-icon" onClick={handleAddItem}>
                    <i className="fas fa-plus-circle fa-xl"></i>
                    &nbsp;<span className="items-span">Item</span>
                  </span>
                </div>
                <div className="col-md-7">
                  {" "}
                  <p>Description</p>
                </div>
                <div className="col-md-1" style={{ marginLeft: "-3%" }}>
                  <p>Quantity</p>
                </div>
                <div className="col-md-1" style={{ marginLeft: "1%" }}>
                  <p>Cost</p>
                </div>
                <div className="col-md-2">
                  <p>Total</p>
                </div>
              </div>

              <div className="row item_details_div px-2">
                <React.Fragment>
                  {estimateUpdateData.items.map((item, index) => (
                    <div className="row">
                      <div className="col-md-1">
                        <TextField
                          id="estimate_item"
                          variant="standard"
                          type="text"
                          name="estimate_item"
                          value={item.estimate_item}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                      <div className="col-md-7">
                        <TextField
                          id="estimate_description"
                          variant="standard"
                          type="text"
                          name="estimate_description"
                          value={item.estimate_description}
                          onChange={(e) => handleInputChange(index, e)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-md-1">
                        <TextField
                          id="estimate_quantity"
                          variant="standard"
                          type="number"
                          name="estimate_quantity"
                          value={item.estimate_quantity}
                          onChange={(e) => handleInputChange(index, e)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-md-1">
                        <TextField
                          id="estimate_cost"
                          variant="standard"
                          type="text"
                          name="estimate_cost"
                          value={item.estimate_cost}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                      <div className="col-md-2 mt-3">
                        <TextField
                          id="estimate_total"
                          variant="standard"
                          type="text"
                          InputProps={{ disableUnderline: true }}
                          style={{ marginTop: "-13px" }}
                          readonly
                          value={`${" "}$ ${(item.estimate_quantity || 0) *
                            (item.estimate_cost || 0)
                            }`}
                        />
                      </div>
                    </div>
                  ))}
                  <br />
                </React.Fragment>

                <div className="invoice-last-div">
                  <div className="row">
                    <div className="col-md-9">
                      {/* <span>All jobs are completely guaranteed</span> */}
                    </div>
                    <div className="col-md-3 px-5 pb-5">
                      <span>Total </span>$
                      {estimateUpdateData.estimate_total || ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ fontSize: "23px" }}>
                <div className="col-md-7">
                  <span>
                    <b>
                      <i>EXCLUSIONS: </i>
                    </b>
                    Moving Furniture, Major floor prep, Wax shot blasting,
                    Moisture barrier, Asbestos abatement, Wall board, track steps,
                    Unforeseeable conditions that may be discovered after existing
                    floor covering is removed.
                    <br /> <br />
                    <b>
                      <i>WARRANTY: </i>
                    </b>
                    One-year warranty after installation is complete.
                  </span>
                </div>
                <div className="col-md-5" style={{ textAlign: "right" }}>
                  <span>
                    Thank you for considering our Proposal.
                    <br />
                    All jobs are completely guaranteed
                  </span>
                </div>
              </div>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default ModifyInvoiceReport;
