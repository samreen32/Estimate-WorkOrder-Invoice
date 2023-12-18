import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import { useNavigate } from "react-router";

function GeneratedWorkInvoice() {
  let navigate = useNavigate();
  const { workOrderData } = UserLogin();

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pdfContent = document.getElementById("pdf");
    const contentHeight = pdfContent.clientHeight;
    const contentWidth = pdfContent.clientWidth;
    pdf.internal.pageSize.height = contentHeight;
    pdf.internal.pageSize.width = contentWidth;

    html2canvas(pdfContent, { scale: 1 }).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      pdf.addImage(contentDataURL, "PNG", 0, 0, contentWidth, contentHeight);
      pdf.save(`invoice.pdf`);
      pdf.internal.pageSize.height = 297;
      pdf.internal.pageSize.width = 210;
    });
  };

  return (
    <div id="invoice-generated">
      <div className="row">
        <div className="col-4" style={{ marginTop: "40px" }}>
          <div className="add-container">
            <span
              onClick={() => {
                navigate("/work_order_invoice");
              }}
              className="new-invoice-btn"
            >
              Generate new invoice
            </span>
          </div>
        </div>
        <div className="col-4">
          <h2>Invoice Details</h2>
        </div>
        <div className="col-4" style={{ marginTop: "50px" }}>
          <span onClick={generatePDF} className="new-invoice-btn">
            Save the PDF
          </span>
        </div>
      </div>

      <div className="container px-5 py-5" style={{ width: "100%" }}>
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
            <div className="row py-5 px-5">
              <div className="col-10">
                <div className="row px-3">
                  Customer ID
                  <br />
                  {workOrderData.cust_id}
                </div>
                <div className="row py-3">
                  <div className="col-md-8">
                    Job Name
                    <br />
                    {workOrderData.job_name}
                  </div>
                  <div className="col-md-2">
                    Phone
                    <br />
                    {workOrderData.phone}
                  </div>
                  <div className="col-md-2">
                    Date
                    <br />
                    {workOrderData.work_date}
                  </div>
                </div>

                <div className="row py-3">
                  <div className="col-md-8">
                    Address <br />
                    {workOrderData.work_address.map((field, index) => (
                      <React.Fragment key={`work_address_${index}`}>
                        {field}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="col-md-2">
                    City
                    <br />
                    {workOrderData.city}
                  </div>
                  <div className="col-md-2">
                    Zip
                    <br />
                    {workOrderData.zip}
                  </div>
                </div>

                <div className="row py-3">
                  <div className="col">
                    Special Instructions
                    <br />
                    {workOrderData.special_instruction}
                  </div>
                </div>
              </div>

              <div className="col-2">
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    <em>
                      <b>Invoice</b>
                    </em>
                  </h4>
                  <img src={logo} alt="logo tub" />
                </div>
              </div>
            </div>
          </>

          <div className="blue-bar"></div>

          <>
            <div className="row py-5 px-5">
              <div className="col">
                Material Description <br />
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
            <div className="row py-3 px-5">
              <div className="col-md-8">
                Tools or Suppliers
                <br />
                {workOrderData.tools}
              </div>
              <div className="col-md-4">
                Labor ####
                <br />
                {workOrderData.labor}
              </div>
            </div>
          </>

          <>
            <div className="row py-3 px-5">
              <div className="col-md-12">Materials Expenses Supplies</div>
              <br />
              <br />
              <div className="col-md-12">
                For the Sum of X
                <br />
                {workOrderData.sum_of}
              </div>
            </div>
          </>

          <>
            {/* Theory */}
            <div className="row py-3 px-5">
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
            <div className="row py-3 px-5">
              <div className="col-md-6">
                Contractor X
                <br />
                {workOrderData.contractor}
              </div>
              <div className="col-md-6">
                Independent Contractor X
                <br />
                {workOrderData.independent_contractor}
              </div>
            </div>

            <div className="row py-3 px-5">
              <div className="col-md-6">
                Authorized Signagure X
                <br />
                {workOrderData.contractor_auth_sign}
              </div>
              <div className="col-md-6">
                Authorized Signagure X
                <br />
                {workOrderData.independent_contractor_auth_sign}
              </div>
            </div>

            <div className="row py-3 px-5">
              <div className="col-md-6">
                Date
                <br />
                {workOrderData.contractor_date}
              </div>
              <div className="col-md-6">
                Date
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
