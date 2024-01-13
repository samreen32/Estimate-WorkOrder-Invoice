import React, { useEffect, useRef, useState } from "react";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_SPECIFIC_WORKOUT_INVOICE,
  UPDATE_WORKOUT_INVOICE,
} from "../../Auth_API";
import generatePDF from "react-to-pdf";

function EditThirdInvoice() {
  let navigate = useNavigate();
  const targetRef = useRef();
  const { state } = useLocation();
  const { invoiceId } = state;
  const { workOrderUpdateData, setWorkOrderUpdateData } = UserLogin();
  const [visibleAddressFields, setVisibleAddressFields] = useState(1);
  const [visibleMaterialFields, setVisibleMaterialFields] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [focusedMaterialField, setFocusedMaterialField] = useState(null);

  /* Input field validation */
  const handleInputChange = (index, e) => {
    const { name, value } = e?.target || {};

    setWorkOrderUpdateData((prevData) => {
      if (index !== undefined) {
        const updatedItems = [...prevData.items];
        updatedItems[index] = {
          ...updatedItems[index],
          [name]: value,
        };

        return {
          ...prevData,
          items: updatedItems,
        };
      } else {
        if (
          name === "work_address_1" ||
          name === "work_address_2" ||
          name === "work_address_3"
        ) {
          const updatedAddress = [...prevData.work_address];
          const fieldIndex = Number(name.split("_")[2]);
          updatedAddress[fieldIndex - 1] = value;

          return {
            ...prevData,
            work_address: updatedAddress,
            material_desc: [...prevData.material_desc], // Keep material_desc unchanged
          };
        } else if (
          name === "material_desc_1" ||
          name === "material_desc_2" ||
          name === "material_desc_3"
        ) {
          const updatedMaterial = [...prevData.material_desc];
          const fieldIndex = Number(name.split("_")[2]);
          updatedMaterial[fieldIndex - 1] = value;

          return {
            ...prevData,
            work_address: [...prevData.work_address], // Keep work_address unchanged
            material_desc: updatedMaterial,
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
          `${GET_SPECIFIC_WORKOUT_INVOICE}/${invoiceId}`
        );
        if (response.data.success) {
          setWorkOrderUpdateData(response.data.invoice);
          console.log(response.data.invoice);
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
        `${UPDATE_WORKOUT_INVOICE}/${invoiceId}`,
        workOrderUpdateData
      );
      if (response.data.success) {
        navigate("/workout_report");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Invoice updated successfully.",
        });
        setWorkOrderUpdateData({
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

  /* Press enter key to add new field as well as key focus */
  const handleAddressEnterKey = (e, fieldIndex) => {
    if (e.key === "Enter") {
      const nextVisibleFields = Math.min(visibleAddressFields + 1, 3);
      setVisibleAddressFields(nextVisibleFields);
      setFocusedField(nextVisibleFields - 1);
      e.preventDefault();
    }
  };

  const handleMaterialEnterKey = (e, fieldIndex) => {
    if (e.key === "Enter") {
      const nextVisibleFields = Math.min(visibleMaterialFields + 1, 3);
      setVisibleMaterialFields(nextVisibleFields);
      setFocusedMaterialField(nextVisibleFields - 1);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (focusedField !== null) {
      const inputRef = document.getElementById(
        `work_address_${focusedField + 1}`
      );
      if (inputRef) {
        inputRef.focus();
      }
    }
    if (focusedMaterialField !== null) {
      const inputRef = document.getElementById(
        `material_desc_${focusedMaterialField + 1}`
      );
      if (inputRef) {
        inputRef.focus();
      }
    }
  }, [focusedField, focusedMaterialField]);

  const handleGenerateNew = () => {
    setWorkOrderUpdateData({
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
    navigate("/workout_report");
  };

  return (
    <div id="invoice-generated">
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
            Update invoice
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
        <div
          className="row justify-content-center text-align-center"
          style={{ background: "#B31312" }}
        >
          <div className="col-md-8 text-center">
            <span style={{ cursor: "pointer" }}>
              <h2 style={{ color: "white", padding: "20px" }}>
                Work Order Requisition
              </h2>
            </span>
          </div>
        </div>

        <div className="row mt-3" style={{ fontSize: "25px" }}>
          <div className="col-10">
            <div className="row">
              <b>Customer ID</b>
              <TextField
                id="cust_id"
                type="text"
                variant="standard"
                name="cust_id"
                style={{ width: "25%" }}
                value={workOrderUpdateData?.cust_id || ""}
                onChange={(e) => handleInputChange(undefined, e)}
              />
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <b>Job Name</b>
                <br />
                <TextField
                  id="job_name"
                  type="text"
                  variant="standard"
                  name="job_name"
                  style={{ width: "100%" }}
                  value={workOrderUpdateData?.job_name || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-4">
                <b>Phone</b>
                <br />
                <TextField
                  id="phone"
                  type="text"
                  variant="standard"
                  name="phone"
                  value={workOrderUpdateData?.phone || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                <b>Date</b> <br />
                <TextField
                  id="work_date"
                  type="date"
                  variant="standard"
                  name="work_date"
                  value={workOrderUpdateData?.work_date || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-8">
                <b>Address </b> <br />
                {[1, 2, 3].map(
                  (fieldIndex) =>
                    fieldIndex <= visibleAddressFields && (
                      <React.Fragment key={`work_address_${fieldIndex}`}>
                        <TextField
                          id={`work_address_${fieldIndex}`}
                          type="text"
                          variant="standard"
                          name={`work_address_${fieldIndex}`}
                          style={{ width: "100%" }}
                          value={
                            workOrderUpdateData.work_address[fieldIndex - 1] ||
                            ""
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
              </div>

              <div className="col-md-2">
                <b>City</b> <br />
                <TextField
                  id="city"
                  type="text"
                  variant="standard"
                  name="city"
                  value={workOrderUpdateData?.city || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                <b>Zip</b> <br />
                <TextField
                  id="zip"
                  type="text"
                  variant="standard"
                  name="zip"
                  value={workOrderUpdateData?.zip || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="row mt-1">
              <div className="col">
                <b>Special Instructions</b>
                <br />
                <TextField
                  id="special_instruction"
                  type="text"
                  variant="standard"
                  name="special_instruction"
                  style={{ width: "100%" }}
                  value={workOrderUpdateData?.special_instruction || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>
          </div>

          <div className="col-2">
            <div>
              <img src={logo} alt="logo tub" width={180} />
            </div>
          </div>
        </div>

        <div className="blue-bar"></div>

        <div className="row mt-2" style={{ fontSize: "25px" }}>
          <div className="col">
            <b>Material Description</b>
            <br />
            {[1, 2, 3].map(
              (fieldIndex) =>
                fieldIndex <= visibleMaterialFields && (
                  <React.Fragment key={`material_desc_${fieldIndex}`}>
                    <TextField
                      id={`material_desc_${fieldIndex}`}
                      type="text"
                      variant="standard"
                      name={`material_desc_${fieldIndex}`}
                      style={{ width: "60%" }}
                      value={
                        workOrderUpdateData.material_desc[fieldIndex - 1] || ""
                      }
                      onChange={(e) => handleInputChange(undefined, e)}
                      onKeyDown={(e) => handleMaterialEnterKey(e, fieldIndex)}
                    />
                    <br />
                  </React.Fragment>
                )
            )}
          </div>
        </div>

        <div className="row mt-1" style={{ fontSize: "25px" }}>
          <div className="col-md-8">
            <b>Tools or Suppliers</b>

            <TextField
              id="tools"
              type="text"
              variant="standard"
              name="tools"
              value={workOrderUpdateData?.tools || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-4">
            <b>Labor ####</b>

            <TextField
              id="labor"
              type="text"
              variant="standard"
              name="labor"
              value={workOrderUpdateData?.labor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row mt-1" style={{ fontSize: "25px" }}>
          <div className="col-md-12">
            <b>Materials Expenses Supplies</b>
          </div>
          <div className="col-md-12">
            <b>For the Sum of X</b>
            <TextField
              id="sum_of"
              type="text"
              variant="standard"
              name="sum_of"
              value={workOrderUpdateData?.sum_of || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        {/* Theory */}
        <div className="row mt-3" style={{ fontSize: "19px" }}>
          <p>
            The above specified project s to be completed in trict conformance
            with all specifications relating to this agreement. | addition, the
            project is to be performed in compliance with OSHA regulations,
            local, state and national building codes. Although the contractor
            has control over the quality of all work relating to this project,
            the independent Contractor is an independent Contractor in all
            respects. The. independents responsible for his employees, his
            subcontractors, materials, equipment and all applicable taxes,
            benefits and insurances. The independent Contractor is responsible
            for coordinating. his activity with other trades and promptly
            cleaning up any surplus or debris created by his work. <br />
            <br />
            The independent Contractor hereby acknowledges receipt of all monies
            due on the above job as of his date, and does hereby waive, release,
            remise and relinquish any and allright to claim any liens for work
            done or material furnished or any kind or class of lien whatsoever
            on the property above described. It is further sworn that any
            laborers and or material suppliers who furnished above labor and or
            materials for the above mentioned property have been paid by the
            independent contractor, and all related taxes. and insurance have
            also been paid.
          </p>
        </div>

        {/* Contractor */}
        <div className="row" style={{ fontSize: "25px" }}>
          <div className="col-md-6">
            <b>Contractor X</b>
            <br />
            <TextField
              id="contractor"
              type="text"
              variant="standard"
              name="contractor"
              value={workOrderUpdateData?.contractor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-6">
            <b>Independent Contractor X</b>
            <br />
            <TextField
              id="independent_contractor"
              type="text"
              variant="standard"
              name="independent_contractor"
              value={workOrderUpdateData?.independent_contractor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row mt-2" style={{ fontSize: "25px" }}>
          <div className="col-md-6">
            <b>Authorized Signagure X</b>
            <br />
            <TextField
              id="contractor_auth_sign"
              type="text"
              variant="standard"
              name="contractor_auth_sign"
              value={workOrderUpdateData?.contractor_auth_sign || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-6">
            <b>Authorized Signagure X</b>
            <br />
            <TextField
              id="independent_contractor_auth_sign"
              type="text"
              variant="standard"
              name="independent_contractor_auth_sign"
              value={
                workOrderUpdateData?.independent_contractor_auth_sign || ""
              }
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row mt-2" style={{ fontSize: "25px" }}>
          <div className="col-md-6">
            <b>Date</b>
            <br />
            <TextField
              id="contractor_date"
              type="date"
              variant="standard"
              name="contractor_date"
              value={workOrderUpdateData?.contractor_date || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-6">
            <b>Date</b>
            <br />
            <TextField
              id="independent_contractor_date"
              type="date"
              variant="standard"
              name="independent_contractor_date"
              value={workOrderUpdateData?.independent_contractor_date || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditThirdInvoice;
