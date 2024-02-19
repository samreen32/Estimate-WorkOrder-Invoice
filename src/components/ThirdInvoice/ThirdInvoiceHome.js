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
  const { workOrderData, setWorkOrderData, formatPhoneNumber, formatPhone } =
    UserLogin();
  const [visibleAddressFields, setVisibleAddressFields] = useState(1);
  const [visibleMaterialFields, setVisibleMaterialFields] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [focusedMaterialField, setFocusedMaterialField] = useState(null);
  const [rawPhone, setRawPhone] = useState(workOrderData?.phone || "");

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
            work_address: [...prevData.work_address],
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

  const handlePhoneChange = (e) => {
    const { value } = e.target;

    // Format the phone number and update the state
    const formattedPhone = formatPhoneNumber(value);
    setRawPhone(value);

    // Update the workOrderData state
    handleInputChange(undefined, {
      target: { name: "phone", value: formattedPhone },
    });
  };

  /* Endpoint integration */
  const handleCreateInvoice = async () => {
    try {
      const response = await axios.post(
        `${CREATE_WORKOUT_INVOICE}`,
        workOrderData
      );
      setWorkOrderData((prevData) => ({
        ...prevData,
        items: [],
      }));

      navigate(`/generated_workout_invoice`);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Work Order Generated!",
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
            Please Enter details
          </span>
        </h2>
      </div>
      <div
        className="container px-5 py-5"
        style={{ width: "100%" }}
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

        <div className="row py-5" style={{ fontSize: "20px" }}>
          <div className="col-10">
            <div className="row">
              <div className="col-md-2">
                <p>Customer ID</p>
              </div>
              <div className="col-md-4">
                <TextField
                  id="cust_id"
                  type="text"
                  variant="standard"
                  name="cust_id"
                  style={{ width: "100%" }}
                  value={workOrderData?.cust_id || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                <p>Installer Name</p>
              </div>
              <div className="col-md-4">
                <TextField
                  id="installer_name"
                  type="text"
                  variant="standard"
                  name="installer_name"
                  style={{ width: "100%" }}
                  value={workOrderData?.installer_name || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                Job Name
                <br />
                <TextField
                  id="job_name"
                  type="text"
                  variant="standard"
                  style={{ width: "100%" }}
                  name="job_name"
                  value={workOrderData?.job_name || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-4">
                Phone
                <br />
                <TextField
                  id="phone"
                  type="text"
                  variant="standard"
                  name="phone"
                  value={formatPhone(rawPhone)}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="col-md-2">
                Date <br />
                <TextField
                  id="work_date"
                  type="date"
                  variant="standard"
                  name="work_date"
                  value={workOrderData?.work_date || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="row mt-4">
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
                City <br />
                <TextField
                  id="city"
                  type="text"
                  variant="standard"
                  name="city"
                  value={workOrderData?.city || ""}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col-md-2">
                Zip <br />
                <TextField
                  id="zip"
                  type="text"
                  variant="standard"
                  name="zip"
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
                  style={{ width: "100%" }}
                  value={workOrderData?.special_instruction || ""}
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

        <div className="row mt-4" style={{ fontSize: "20px" }}>
          <div className="col">
            Material Description
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

        <div className="row py-3" style={{ fontSize: "20px" }}>
          <div className="col-md-8">
            Tools or Suppliers
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
            Labor
            <TextField
              id="labor"
              type="number"
              variant="standard"
              name="labor"
              value={workOrderData?.labor || ""}
              style={{ width: "100%" }}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
        </div>

        <div className="row py-3" style={{ fontSize: "20px" }}>
          <div className="col-md-12">Materials Expenses Supplies</div>
        </div>
        <br />
        <div className="row" style={{ fontSize: "20px" }}>
          <div className="col-md-3">For the Sum of X</div>
          <div className="col-md-9">
            <TextField
              id="sum_of"
              type="text"
              variant="standard"
              name="sum_of"
              value={workOrderData?.sum_of || ""}
              style={{ width: "108%", marginLeft: "-70px" }}
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
        <div className="row py-3" style={{ fontSize: "20px" }}>
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

        <div className="row py-3" style={{ fontSize: "20px" }}>
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

        <div className="row py-3" style={{ fontSize: "20px" }}>
          <div className="col-md-6">
            Date
            <br />
            <TextField
              id="contractor_date"
              type="date"
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
              type="date"
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
