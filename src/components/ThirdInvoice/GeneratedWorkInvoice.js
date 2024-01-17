import React, { useRef } from "react";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import { useNavigate } from "react-router";
import generatePDF from "react-to-pdf";

function GeneratedWorkInvoice() {
  let navigate = useNavigate();
  const { workOrderData, setWorkOrderData } = UserLogin();
  const targetRef = useRef();

  const handleGenerateNew = () => {
    setWorkOrderData({
      cust_id: "",
      installer_name: "",
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
    navigate("/work_order_invoice");
  };

  return (
    <div id="invoice-generated">
      <div className="row">
        <div className="col-4" style={{ marginTop: "40px" }}>
          <div className="add-container">
            <span onClick={handleGenerateNew} className="new-invoice-btn">
              Generate new workorder
            </span>
          </div>
        </div>
        <div className="col-4">
          <h2>Work Order Details</h2>
        </div>
        <div className="col-4" style={{ marginTop: "50px" }}>
          <span
            onClick={() => generatePDF(targetRef, { filename: "invoice.pdf" })}
            className="new-invoice-btn"
          >
            Save PDF
          </span>
        </div>
      </div>

      <div
        className="container px-5 py-5"
        style={{ width: "100%" }}
        ref={targetRef}
      >
        <div id="pdf">
          {/* Top */}
          <>
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
          </>
          {/* after top */}
          <>
            <div className="row py-5 px-5" style={{ fontSize: "23px" }}>
              <div className="col-10">
                <div className="row">
                  <div className="col-md-6">
                    <b>Customer ID</b>
                    &nbsp;&nbsp;{workOrderData.cust_id}
                  </div>
                  <div className="col-md-6">
                    <b>Installer Name</b>
                    &nbsp;&nbsp;{workOrderData.installer_name}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <b>Job Name</b>
                    <br />
                    {workOrderData.job_name}
                  </div>
                  <div className="col-md-4">
                    <b>Phone</b>
                    <br />
                    {workOrderData.phone}
                  </div>
                  <div className="col-md-2">
                    <b>Date</b>
                    <br />
                    {workOrderData.work_date}
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-8">
                    <b>Address</b> <br />
                    {workOrderData.work_address.map((field, index) => (
                      <React.Fragment key={`work_address_${index}`}>
                        {field}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="col-md-2">
                    <b>City</b>
                    <br />
                    {workOrderData.city}
                  </div>
                  <div className="col-md-2">
                    <b>Zip</b>
                    <br />
                    {workOrderData.zip}
                  </div>
                </div>

                <div
                  className="row"
                  style={{ fontSize: "23px", marginTop: "-30px" }}
                >
                  <div className="col">
                    <b>Special Instructions</b>
                    <br />
                    {workOrderData.special_instruction}
                  </div>
                </div>
              </div>

              <div className="col-2">
                <div>
                  <h4 style={{ textAlign: "center", fontSize: "30px" }}>
                    <em>
                      <b>Invoice</b>
                    </em>
                  </h4>
                  <img src={logo} alt="logo tub" width={180} />
                </div>
              </div>
            </div>
          </>

          <div className="blue-bar"></div>

          <>
            <div className="row px-5 mt-1" style={{ fontSize: "23px" }}>
              <div className="col">
                <b>Material Description</b> <br />
                {workOrderData.material_desc.map((field, index) => (
                  <React.Fragment key={`material_desc_${index}`}>
                    {field}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>

          <>
            <div
              className="row py-3 px-5"
              style={{ fontSize: "23px", marginTop: "-40px" }}
            >
              <div className="col-md-8">
                <b>Tools or Suppliers</b>
                <br />
                {workOrderData.tools}
              </div>
              <div className="col-md-4">
                <b>Labor ####</b>
                <br />
                {workOrderData.labor}
              </div>
            </div>
          </>

          <>
            <div className="row mt-2 px-5" style={{ fontSize: "23px" }}>
              <div className="col-md-12">
                <b>Materials Expenses Supplies</b>
              </div>
              <div className="col-md-12">
                For the Sum of X: &nbsp; &nbsp;
                {workOrderData.sum_of}
              </div>
            </div>
          </>

          <>
            {/* Theory */}
            <div className="row py-3 px-5" style={{ fontSize: "19px" }}>
              <p>
                The above specified project s to be completed in trict
                conformance with all specifications relating to this agreement.
                | addition, the project is to be performed in compliance with
                OSHA regulations, local, state and national building codes.
                Although the contractor has control over the quality of all work
                relating to this project, the independent Contractor is an
                independent Contractor in all respects. The. independents
                responsible for his employees, his subcontractors, materials,
                equipment and all applicable taxes, benefits and insurances. The
                independent Contractor is responsible for coordinating. his
                activity with other trades and promptly cleaning up any surplus
                or debris created by his work. <br />
                <br />
                The independent Contractor hereby acknowledges receipt of all
                monies due on the above job as of his date, and does hereby
                waive, release, remise and relinquish any and allright to claim
                any liens for work done or material furnished or any kind or
                class of lien whatsoever on the property above described. It is
                further sworn that any laborers and or material suppliers who
                furnished above labor and or materials for the above mentioned
                property have been paid by the independent contractor, and all
                related taxes. and insurance have also been paid.
              </p>
            </div>
          </>

          <>
            {/* Contractor */}
            <div className="row px-5" style={{ fontSize: "23px" }}>
              <div className="col-md-6">
                <b>Contractor X</b>
                <br />
                {workOrderData.contractor}
              </div>
              <div className="col-md-6">
                <b>Independent Contractor X</b>
                <br />
                {workOrderData.independent_contractor}
              </div>
            </div>

            <div className="row px-5 mt-3" style={{ fontSize: "23px" }}>
              <div className="col-md-6">
                <b>Authorized Signagure X</b>
                <br />
                {workOrderData.contractor_auth_sign}
              </div>
              <div className="col-md-6">
                <b>Authorized Signagure X</b>
                <br />
                {workOrderData.independent_contractor_auth_sign}
              </div>
            </div>

            <div className="row mt-3 px-5" style={{ fontSize: "23px" }}>
              <div className="col-md-6">
                <b>Date</b>
                <br />
                {workOrderData.contractor_date}
              </div>
              <div className="col-md-6">
                <b>Date</b>
                <br />
                {workOrderData.independent_contractor_date}
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default GeneratedWorkInvoice;
