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
    navigate("/estimate_invoice");
  };

  return (
    <div id="invoice-generated">
      <div className="row">
        <div className="col-4" style={{ marginTop: "40px" }}>
          <div className="add-container">
            <span onClick={handleGenerateNew} className="new-invoice-btn">
              Generate new invoice
            </span>
          </div>
        </div>
        <div className="col-4">
          <h2>Invoice Details</h2>
        </div>
        <div className="col-4" style={{ marginTop: "50px" }}>
          <span
            onClick={() => generatePDF(targetRef, { filename: "invoice.pdf" })}
            className="new-invoice-btn"
          >
            Save the PDF
          </span>
        </div>
      </div>

      <div
        className="container px-5 py-5 my-5"
        style={{ width: "100%" }}
        ref={targetRef}
      >
        <div className="row">
          <div className="invoice-first-div col-10 px-5">
            <address className="mt-5 px-3">
              H FLOOR COVERING LLC <br />
              1148 BLAKES FIELD PL <br />
              HENDERSON NV 89011
            </address>
          </div>
          <div className="col-2 mt-5" style={{ display: "flex" }}>
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
        <div className="estimate_address_div px-5">
          <p>Name/Address</p>
          {estimateData.estimate_address.map((field, index) => (
            <React.Fragment key={`estimate_address_${index}`}>
              {field}
              <br />
            </React.Fragment>
          ))}
        </div>
        <div
          className="row estimate_details_div px-5 "
          style={{ marginTop: "10%" }}
        >
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Date</p>

            {estimateData.estimate_date}
          </div>
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Estimate No.</p>
            {estimateData.estimate_no}
          </div>
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Project</p>
            {estimateData.estimate_project}
          </div>
        </div>
        <div className="line mt-3"></div>
        <div className="row item_details_div px-5">
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Item</p>

            {estimateData.items.map((item, index) => (
              <span key={index}>
                {item.estimate_item}
                {index < estimateData.items.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Description</p>

            {estimateData.items.map((item, index) => (
              <span key={index}>
                {item.estimate_description}
                {index < estimateData.items.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Quantity</p>

            {estimateData.items.map((item, index) => (
              <span key={index}>
                {item.estimate_quantity}
                {index < estimateData.items.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Cost</p>
            {estimateData.items.map((item, index) => (
              <span key={index}>
                {item.estimate_cost}
                {index < estimateData.items.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="col" style={{ fontSize: "22px" }}>
            <p>Amount</p>
            {estimateData.items.map((item, index) => (
              <span key={index}>
                {`${"    "}$ ${
                  (item.estimate_quantity || 0) * (item.estimate_cost || 0)
                }`}
                <br />
              </span>
            ))}
          </div>
        </div>
        <div className="invoice-last-div px-5" style={{ marginTop: "60%" }}>
          <div className="row">
            <div className="col-md-9">
              <span style={{ fontSize: "30px" }}>
               All jobs are completely guaranteed
              </span>
            </div>
            <div className="col-md-3">
              <span style={{ marginLeft: "-26%", fontWeight: "500", fontSize: "30px" }}>
                Total{" "}
              </span>
              &nbsp; &nbsp;  ${" "}
              {estimateData.estimate_total || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratedInvoice;
