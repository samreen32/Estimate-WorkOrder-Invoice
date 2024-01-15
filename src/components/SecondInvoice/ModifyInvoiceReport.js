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
  const [focusedField, setFocusedField] = useState(null);
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
          invoice_date: "",
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

  const handleGenerateNew = () => {
    setEstimateUpdateData({
      estimate_no: "",
      estimate_address: [""],
      invoice_date: "",
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
        style={{ width: "100%", marginTop: "2%" }}
        ref={targetRef}
      >
        <>
          <div className="row">
            <div className="invoice-first-div col-10 px-5">
              <address className="mt-3 px-3">
                H FLOOR COVERING LLC <br />
                1148 BLAKES FIELD PL <br />
                HENDERSON NV 89011
              </address>
            </div>
            <div className="col-2" style={{ display: "flex" }}>
              <div>
                <h4 style={{ textAlign: "center", fontSize: "30px" }}>
                  Invoice
                </h4>
                <img src={logo} alt="logo tub" width={150} />
              </div>

              {/* <i
                onClick={handleUpdateInvoice}
                style={{ cursor: "pointer", marginTop: "-20%" }}
                className="fa fa-chevron-right fa-2x"
                aria-hidden="true"
              ></i> */}
            </div>
          </div>

          <form>
            <div className="estimate_address_div px-5">
              <p>
                Name/Address <br />
                {[1, 2, 3].map(
                  (fieldIndex) =>
                    fieldIndex <= visibleAddressFields && (
                      <React.Fragment key={`estimate_address_${fieldIndex}`}>
                        <TextField
                          id={`estimate_address_${fieldIndex}`}
                          type="text"
                          variant="standard"
                          name={`estimate_address_${fieldIndex}`}
                          style={{ width: "60%" }}
                          value={
                            estimateUpdateData.estimate_address[
                              fieldIndex - 1
                            ] || ""
                          }
                          onChange={(e) => handleInputChange(undefined, e)}
                          onKeyDown={(e) =>
                            handleAddressEnterKey(e, fieldIndex)
                          }
                        />
                        <br />
                      </React.Fragment>
                    )
                )}
              </p>
            </div>
            <br />
            <br />

            <div className="row estimate_details_div px-5 ">
              <div className="col-md-5">
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
              <div className="col-md-5">
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
            </div>

            <div className="line"></div>
            <br />

            <div className="row item_details_div px-5">
              <div className="col-md-2">
                <span className="plus-icon" onClick={handleAddItem}>
                  <i className="fas fa-plus-circle fa-xl"></i>
                  &nbsp;<span className="items-span">Item</span>
                </span>
              </div>
              <div className="col-md-4">
                {" "}
                <p>Description</p>
              </div>
              <div className="col-md-2" style={{ marginLeft: "-1.5%" }}>
                <p>Quantity</p>
              </div>
              <div className="col-md-2">
                <p>Cost</p>
              </div>
              <div className="col-md-2">
                <p>Total</p>
              </div>
            </div>

            <div className="row item_details_div px-5">
              <React.Fragment>
                {estimateUpdateData.items.map((item, index) => (
                  <div className="row" style={{ marginTop: "-25px" }}>
                    <div className="col-md-2">
                      <TextField
                        id="estimate_item"
                        variant="standard"
                        type="text"
                        name="estimate_item"
                        value={item.estimate_item}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-md-4">
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
                    <div className="col-md-2">
                      <TextField
                        id="estimate_quantity"
                        variant="standard"
                        type="number"
                        name="estimate_quantity"
                        value={item.estimate_quantity}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ width: "80%" }}
                      />
                    </div>
                    <div className="col-md-2">
                      <TextField
                        id="estimate_cost"
                        variant="standard"
                        type="text"
                        name="estimate_cost"
                        value={item.estimate_cost}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-md-2 my-2">
                      <TextField
                        id="estimate_total"
                        variant="standard"
                        type="text"
                        InputProps={{ disableUnderline: true }}
                        readonly
                        value={`${" "}$ ${
                          (item.estimate_quantity || 0) *
                          (item.estimate_cost || 0)
                        }`}
                      />
                    </div>
                  </div>
                ))}
                <br />
              </React.Fragment>

              <div className="invoice-last-div" style={{ marginTop: "75%" }}>
                <div className="row">
                  <div className="col-md-9">
                    <span>All jobs are completely guaranteed</span>
                  </div>
                  <div className="col-md-3 px-5">
                    <span>Total </span>$
                    {estimateUpdateData.estimate_total || ""}
                  </div>
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
