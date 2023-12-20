import React from "react";
import checkLogo from "../../assets/img/checkLogo.png";
import checkMemo from "../../assets/img/check_memo.png";
import checkDesign from "../../assets/img/bg-card.png";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import "./check.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CheckHome() {
  let navigate = useNavigate();

  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const generatePDF = () => {
    // window.print();
    const pdf = new jsPDF();
    const pdfContent = document.getElementById("pdf");
    const contentHeight = pdfContent.clientHeight;
    const contentWidth = pdfContent.clientWidth;
    pdf.internal.pageSize.height = contentHeight;
    pdf.internal.pageSize.width = contentWidth;

    html2canvas(pdfContent, { scale: 1 }).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      pdf.addImage(contentDataURL, "PNG", 0, 0, contentWidth, contentHeight);
      pdf.save(`check.pdf`);
      pdf.internal.pageSize.height = 297;
      pdf.internal.pageSize.width = 210;
    });
  };

  return (
    <>
      <div id="invoice-generated">
        <div
          className="row justify-content-center text-align-center"
          style={{ marginTop: "5%" }}
        >
          <div className="col-md-4 text-center">
            <span
              onClick={() => {
                navigate("/");
              }}
              // style={{ cursor: "pointer", marginLeft: "-40%" }}
            >
              <i class="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
            </span>
          </div>
          <div className="col-md-4 text-center">
            <span style={{ cursor: "pointer" }}>
              <h4>Create a Check</h4>
            </span>
          </div>
          <div className="col-md-4 text-center">
            <button
              onClick={generatePDF}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                background: "#1f9fc6",
                padding: "10px 16px",
                color: "white",
                border: "none",
              }}
            >
              Generate PDF
            </button>
          </div>
        </div>

        <div className="px-5 py-5" style={{ width: "100%" }} id="pdf">
          <div class="body dark-background">
            <div class="outer-border">
              <div class="mid-border">
                <div class="inner-border px-5 py-5">
                  <img
                    class="corner-decoration corner-left-top"
                    src={checkDesign}
                  ></img>
                  <img
                    class="corner-decoration corner-right-top"
                    src={checkDesign}
                  ></img>
                  <img
                    class="corner-decoration corner-right-bottom"
                    src={checkDesign}
                  ></img>
                  <img
                    class="corner-decoration corner-left-bottom"
                    src={checkDesign}
                  ></img>

                  {/* Top */}
                  <div className="row check-row">
                    <div className="col-md-2">
                      <img src={checkLogo} alt="check logo" width={180} />
                    </div>
                    <div className="col-md-4">
                      <address className="mt-3">
                        <b>H FLOOR COVERING LLC</b> <br />
                        1148 BLAKES FIELD PL <br />
                        HENDERSON NV 89011
                      </address>
                    </div>
                    <div className="col-md-5">
                      <address
                        className="mt-3 px-3"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <b>AMERICA FIRST CREDIT UNION</b>
                        <br /> <b>370 STEPHANIE ST</b>
                        <br />
                        HENDERSON, NV 89014 <br /> 97-7751/3243
                      </address>
                    </div>
                    <div className="col-md-1">
                      <b style={{ fontSize: "30px" }}>
                        {generateRandomNumber()}
                      </b>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="row">
                    <TextField
                      style={{
                        cursor: "pointer",
                        width: "30%",
                        justifyContent: "end",
                        marginLeft: "auto",
                        textAlign: "right",
                      }}
                      id="check_date"
                      type="date"
                      variant="standard"
                      name="check_date"
                      //   value={checkData.check_date}
                      //   onChange={(e) => handleInputChange(undefined, e)}
                    />
                  </div>

                  {/* Table main */}
                  <div className="check-main-table my-5">
                    <div className="row py-3 px-3">
                      <div className="col-md-9" style={{ display: "flex" }}>
                        PAY TO THE <br /> ORDER OF
                        <TextField
                          style={{
                            cursor: "pointer",
                            marginLeft: "5%",
                            width: "80%",
                          }}
                          id="check_amount_words"
                          type="text"
                          variant="standard"
                          name="check_amount_words"
                          //   value={checkData.check_amount_words}
                          //   onChange={(e) => handleInputChange(undefined, e)}
                        />
                      </div>
                      <div className="col-md-3">
                        $
                        <TextField
                          style={{
                            cursor: "pointer",
                            marginLeft: "8%",
                            width: "85%",
                          }}
                          id="check_amount_dollar"
                          type="text"
                          variant="standard"
                          name="check_amount_dollar"
                          //   value={checkData.check_amount_dollar}
                          //   onChange={(e) => handleInputChange(undefined, e)}
                        />
                      </div>
                    </div>

                    <div
                      className="row py-3 px-5"
                      style={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <TextField
                        style={{
                          cursor: "pointer",
                          width: "50%",
                        }}
                        id="check_dollar"
                        type="text"
                        variant="standard"
                        name="check_dollar"
                        //   value={checkData.check_dollar}
                        //   onChange={(e) => handleInputChange(undefined, e)}
                      />
                      DOLLARS
                    </div>
                  </div>

                  {/* Memo images */}
                  <div className="row">
                    <div className="col-md-2">
                      <img src={checkMemo} alt="check memo" width={100} />
                    </div>
                    <div className="col-md-8"></div>
                    <div
                      className="col-md-2"
                      style={{
                        justifyContent: "end",
                        marginLeft: "auto",
                        textAlign: "right",
                      }}
                    >
                      <img src={checkMemo} alt="check memo" width={100} />
                    </div>
                  </div>

                  {/* Signature field */}
                  <div className="row py-3">
                    <div className="col-md-5 py-3 px-4">MEMO</div>
                    <div
                      className="col-md-7"
                      style={{
                        justifyContent: "end",
                        marginLeft: "auto",
                        textAlign: "right",
                      }}
                    >
                      <TextField
                        style={{
                          cursor: "pointer",
                          width: "80%",
                        }}
                        id="check_signature"
                        type="text"
                        variant="standard"
                        name="check_signature"
                        //   value={checkData.check_signature}
                        //   onChange={(e) => handleInputChange(undefined, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
