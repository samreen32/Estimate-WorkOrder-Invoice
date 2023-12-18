import React, { useEffect, useState } from "react";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { CREATE_WORKOUT_INVOICE } from "../../Auth_API";

function ThirdInvoiceHome() {
  let navigate = useNavigate();
  const { workOrderData, setWorkOrderData } = UserLogin();
  const [visibleAddressFields, setVisibleAddressFields] = useState(1);
  const [visibleMaterialFields, setVisibleMaterialFields] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [focusedMaterialField, setFocusedMaterialField] = useState(null);

  /* Input field validation */
  const handleInputChange = (index, e) => {
    const { name, value } = e?.target || {};

    setWorkOrderData((prevData) => {
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
  const handleCreateInvoice = async () => {
    try {
      const response = await axios.post(
        `${CREATE_WORKOUT_INVOICE}`,
        workOrderData
      );
      console.log("Invoice created successfully:", response.data);
      setWorkOrderData((prevData) => ({
        ...prevData,
        items: [],
      }));

      navigate(`/generated_workout_invoice`);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Invoice Generated!",
      });
      return;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create invoice. Please try again later.",
      });
      console.error("Failed to create invoice:", error.message);
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

  return (
    <div id="invoice-generated">
      <div style={{ display: "flex" }}>
        <h2>
          <span
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer", marginLeft: "-40%" }}
          >
            <i class="fa fa-chevron-left fa-1x" aria-hidden="true"></i>
          </span>
          <span style={{ cursor: "pointer", marginLeft: "40%" }}>
            Please Enter your Invoice details
          </span>
        </h2>
      </div>
      <div
        className="container px-5 py-5"
        style={{ width: "100%", marginTop: "5%" }}
      >
        <i
          onClick={handleCreateInvoice}
          style={{ cursor: "pointer", marginLeft: "100%", marginBottom: "2%" }}
          className="fa fa-chevron-right fa-2x"
          aria-hidden="true"
        ></i>
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

        <div className="row py-5">
          <div className="col-10">
            <div className="row px-3">
              Customer ID
              <br />
              <TextField
                id="cust_id"
                type="text"
                variant="standard"
                name="cust_id"
                InputProps={{ disableUnderline: true }}
                value={workOrderData?.cust_id || ""}
                readonly
              />
            </div>

            <div className="row py-3">
              <div className="col-md-8">
                Job Name
                <br />
                <TextField
                  id="job_name"
                  type="text"
                  variant="standard"
                  name="job_name"
                  InputProps={{ disableUnderline: true }}
                  value={workOrderData?.job_name || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                Phone
                <br />
                <TextField
                  id="phone"
                  type="text"
                  variant="standard"
                  name="phone"
                  InputProps={{ disableUnderline: true }}
                  value={workOrderData?.phone || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                Date
                <br />
                <TextField
                  id="work_date"
                  type="text"
                  variant="standard"
                  name="work_date"
                  InputProps={{ disableUnderline: true }}
                  value={workOrderData?.work_date || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="row py-3">
              <div className="col-md-8">
                Address <br />
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
                            workOrderData.work_address[fieldIndex - 1] || ""
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
                City
                <br />
                <TextField
                  id="city"
                  type="text"
                  variant="standard"
                  name="city"
                  InputProps={{ disableUnderline: true }}
                  value={workOrderData?.city || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                Zip
                <br />
                <TextField
                  id="zip"
                  type="text"
                  variant="standard"
                  name="zip"
                  InputProps={{ disableUnderline: true }}
                  value={workOrderData?.zip || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="row py-3">
              <div className="col">
                Special Instructions
                <br />
                <TextField
                  id="special_instruction"
                  type="text"
                  variant="standard"
                  name="special_instruction"
                  InputProps={{ disableUnderline: true }}
                  value={workOrderData?.special_instruction || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>
          </div>

          <div className="col-2">
            <div>
              <img src={logo} alt="logo tub" />
            </div>
          </div>
        </div>

        <div className="blue-bar"></div>

        <div className="row py-5">
          <div className="col">
            Material Description <br />
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
                      value={workOrderData.material_desc[fieldIndex - 1] || ""}
                      onChange={(e) => handleInputChange(undefined, e)}
                      onKeyDown={(e) => handleMaterialEnterKey(e, fieldIndex)}
                    />
                    <br />
                  </React.Fragment>
                )
            )}
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            Tools or Suppliers
            <br />
            <TextField
              id="tools"
              type="text"
              variant="standard"
              name="tools"
              value={workOrderData?.tools || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-4">
            Labor ####
            <br />
            <TextField
              id="labor"
              type="text"
              variant="standard"
              name="labor"
              value={workOrderData?.labor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-12">Materials Expenses Supplies</div>
          <br />
          <br />
          <div className="col-md-12">
            For the Sum of X
            <br />
            <TextField
              id="sum_of"
              type="text"
              variant="standard"
              name="sum_of"
              value={workOrderData?.sum_of || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        {/* Theory */}
        <div className="row py-3">
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
        <div className="row py-3">
          <div className="col-md-6">
            Contractor X
            <br />
            <TextField
              id="contractor"
              type="text"
              variant="standard"
              name="contractor"
              value={workOrderData?.contractor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-6">
            Independent Contractor X
            <br />
            <TextField
              id="independent_contractor"
              type="text"
              variant="standard"
              name="independent_contractor"
              value={workOrderData?.independent_contractor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-6">
            Authorized Signagure X
            <br />
            <TextField
              id="contractor_auth_sign"
              type="text"
              variant="standard"
              name="contractor_auth_sign"
              value={workOrderData?.contractor_auth_sign || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-6">
            Authorized Signagure X
            <br />
            <TextField
              id="independent_contractor_auth_sign"
              type="text"
              variant="standard"
              name="independent_contractor_auth_sign"
              value={workOrderData?.independent_contractor_auth_sign || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-6">
            Date
            <br />
            <TextField
              id="contractor_date"
              type="text"
              variant="standard"
              name="contractor_date"
              value={workOrderData?.contractor_date || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="col-md-6">
            Date
            <br />
            <TextField
              id="independent_contractor_date"
              type="text"
              variant="standard"
              name="independent_contractor_date"
              value={workOrderData?.independent_contractor_date || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdInvoiceHome;
