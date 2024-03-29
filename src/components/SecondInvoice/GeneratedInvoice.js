import React, { useRef } from "react";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import { useNavigate } from "react-router";
import generatePDF from "react-to-pdf";

function GeneratedInvoice() {
  let navigate = useNavigate();
  const { estimateData, setEstimateData } = UserLogin();
  const targetRef = useRef();

  const handleGenerateNew = () => {
    setEstimateData({
      estimate_no: "",
      estimate_address: [""],
      estimate_custEmail: "",
      estimate_contractor: [""],
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
    navigate("/generate_estimate");
  };

  // Function to format date as mm/dd/yy
  const formatDate = (date) => {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div id="invoice-generated">
      <div className="row">
        <div className="col-4" style={{ marginTop: "20px" }}>
          <div className="add-container">
            <span onClick={handleGenerateNew} className="new-invoice-btn">
              Generate new estimate
            </span>
          </div>
        </div>
        <div className="col-4">
          <h2>Estimate Details</h2>
        </div>
        <div className="col-4" style={{ marginTop: "30px" }}>
          <span
            onClick={() => generatePDF(targetRef, { filename: "estimate.pdf" })}
            className="new-invoice-btn"
          >
            Save the PDF
          </span>
        </div>
      </div>

      <div
        className="container px-5 py-5 mt-4"
        style={{ width: "100%" }}
        ref={targetRef}
      >
        <div className="row mt-3">
          <div className="invoice-first-div col-10 px-5">
            <address className="mt-3 px-3">
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
                Hfloorcovering@gmail.com <br />
                702-463-2265
              </span>{" "}
            </address>
          </div>
          <div className="col-2" style={{ display: "flex" }}>
            <div>
              <h4 style={{ textAlign: "center", fontSize: "25px" }}>
                <em>
                  <b>Estimate</b>
                </em>
              </h4>
              <img src={logo} alt="logo tub" width={190} />
            </div>
          </div>
        </div>
        <div className="report-border">
          <div className="row estimate_address_div px-2" style={{ fontSize: "20px" }}>

            <div className="col-md-6" style={{ fontSize: "22px" }}>
              <p>Customer Email</p>&nbsp;&nbsp;&nbsp;
              {estimateData.estimate_custEmail}
            </div>
            <div className="col-md-6">
              <p>Contractor</p> &nbsp;&nbsp;&nbsp;
              {estimateData.estimate_contractor.map((field, index) => (
                <React.Fragment key={`estimate_cotractor_${index}`}>
                  {field}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="row estimate_address_div px-2" style={{ fontSize: "20px" }}>
            <div className="col-md-6">
              <p>Name</p>&nbsp;&nbsp;&nbsp;
              {estimateData.estimate_name}
            </div>
            <div className="col-md-6" style={{ fontSize: "22px" }}>
              <p>Address</p>&nbsp;&nbsp;&nbsp;
              {estimateData.estimate_address.map((field, index) => (
                <React.Fragment key={`estimate_address_${index}`}>
                  {field}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="row estimate_address_div px-2" style={{ fontSize: "20px" }}>
            <div className="col-md-4">
              <p>City</p><span>{estimateData.estimate_city}</span>
            </div>
            <div className="col-md-4">
              <p>Zip</p><span>{estimateData.estimate_zip}</span>
            </div>
            <div className="col-md-4">
              <p>Phone</p><span>{estimateData.estimate_phone}</span>
            </div>
          </div>

        </div>

        <div className="report-border mt-2">
          <div className="row estimate_details_div px-2 mt-5">
            <div className="col-md-4" style={{ fontSize: "22px" }}>
              <p>Date</p>
              {formatDate(estimateData.estimate_date)}
            </div>
            <div className="col-md-3" style={{ fontSize: "22px" }}>
              <p>Estimate No.</p>
              {estimateData.estimate_no}
            </div>
            <div className="col-md-2" style={{ fontSize: "22px" }}>
              <p>Project</p>
              {estimateData.estimate_project}
            </div>
            <div className="col-md-3" style={{ fontSize: "22px" }}>
              <p>Project Manager</p>
              {estimateData.estimate_project_manager}
            </div>
          </div>
          <div className="line mt-3"></div>
          <div style={{ width: "100%", height: "500px", overflowY: "auto", overflowX: "hidden" }}>
            <div className="row item_details_div px-2">
              <div className="col-md-2" style={{ fontSize: "22px" }}>
                <p>Item</p>

                {estimateData.items.map((item, index) => (
                  <span key={index}>
                    {item.estimate_item}
                    {index < estimateData.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col-md-4" style={{ fontSize: "22px" }}>
                <p>Description</p>

                {estimateData.items.map((item, index) => (
                  <span key={index}>
                    {item.estimate_description}
                    {index < estimateData.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col-md-2" style={{ fontSize: "22px" }}>
                <p>Quantity</p>

                {estimateData.items.map((item, index) => (
                  <span key={index}>
                    {item.estimate_quantity}
                    {index < estimateData.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col-md-2" style={{ fontSize: "22px" }}>
                <p>Cost</p>
                {estimateData.items.map((item, index) => (
                  <span key={index}>
                    {item.estimate_cost}
                    {index < estimateData.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col-md-2" style={{ fontSize: "22px" }}>
                <p>Amount</p>
                {estimateData.items.map((item, index) => (
                  <span key={index}>
                    {`${"    "}$ ${(item.estimate_quantity || 0) * (item.estimate_cost || 0)
                      }`}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="invoice-last-div" style={{ marginTop: "" }}>
            <div className="row">
              <div className="col-md-9">
              </div>
              <div className="col-md-3 px-5 pb-5">
                <span>Total </span> ${estimateData.estimate_total || ""}
              </div>
            </div>
          </div>
          <div className="row mt-3" style={{ fontSize: "23px" }}>
            <div className="col-md-7">
              <span>
                <b>
                  <i>EXCLUSIONS: </i>
                </b>
                Moving Furniture, Major floor prep, Wax shot blasting, Moisture
                barrier, Asbestos abatement, Wall board, track steps,
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
                Estimate valid for 30 days.
                <br />
                All jobs are completely guaranteed
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default GeneratedInvoice;
