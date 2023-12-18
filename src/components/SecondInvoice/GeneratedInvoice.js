import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import { useNavigate } from "react-router";

function GeneratedInvoice() {
  let navigate = useNavigate();
  const { estimateData } = UserLogin();

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
                navigate("/estimate_invoice");
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
                <h4 style={{ textAlign: "center" }}>
                  <em>
                    <b>Invoice</b>
                  </em>
                </h4>
                <img src={logo} alt="logo tub" />
              </div>
            </div>
          </div>
          <div className="estimate_address_div px-5 ">
            <p>
              Name/Address <br />
              {estimateData.estimate_address.map((field, index) => (
                <React.Fragment key={`estimate_address_${index}`}>
                  {field}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="row estimate_details_div px-5 ">
            <div className="col">
              Date
              <br />
              {estimateData.estimate_date}
            </div>
            <div className="col">
              Estimate No.
              <br />
              {estimateData.estimate_no}
            </div>
            <div className="col">
              Project
              <br />
              {estimateData.estimate_project}
            </div>
          </div>
          <div className="line"></div> <br />
          <div className="row item_details_div px-5 ">
            <div className="col">
              Item
              <br />
              {estimateData.items.map((item, index) => (
                <span key={index}>
                  {item.estimate_item}
                  {index < estimateData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Description
              <br />
              {estimateData.items.map((item, index) => (
                <span key={index}>
                  {item.estimate_description}
                  {index < estimateData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Quantity
              <br />
              {estimateData.items.map((item, index) => (
                <span key={index}>
                  {item.estimate_quantity}
                  {index < estimateData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Cost
              <br />
              {estimateData.items.map((item, index) => (
                <span key={index}>
                  {item.estimate_cost}
                  {index < estimateData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Amount
              <br />
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
          <div
            className="invoice-last-div px-5"
            style={{ marginBottom: "10%" }}
          >
            <div className="row">
              <div className="col-md-9">
                <span>All jobs are completely guaranteed</span>
              </div>
              <div className="col-md-3">
                <span style={{ marginLeft: "20%" }}>Total </span>&nbsp; &nbsp;
                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; ${" "}
                {estimateData.estimate_total || ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratedInvoice;
