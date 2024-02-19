import React, { useRef } from "react";
import { useNavigate } from "react-router";
import "./check.css";
import generatePDF from "react-to-pdf";
import { UserLogin } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";

export default function GenerateCheck() {
  let navigate = useNavigate();
  const { checkData } = UserLogin();
  const targetRef = useRef();

  const handleGenerateNew = () => {
    navigate("/check");
  };

  // Function to format date as mm/dd/yy
  const formatDate = (date) => {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div id="invoice-generated">
        <div
          className="row justify-content-center text-align-center"
          style={{ marginTop: "5%" }}
        >
          <div className="col-md-4 text-center">
            <span onClick={handleGenerateNew} style={{ cursor: "pointer" }}>
              <i class="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
            </span>
          </div>
          <div className="col-md-4 text-center">
            <span style={{ cursor: "pointer" }}>
              <h1>
                <b>Generated Check</b>
              </h1>
            </span>
          </div>
          <div className="col-md-4 text-center">
            <button
              onClick={() =>
                generatePDF(targetRef, { filename: "invoice.pdf" })
              }
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
                <div class="inner-border">
                  <div ref={targetRef}>
                    <div className="mt-5 py-5 px-5">
                      {/* Date */}
                      <div className="row mt-3 check-field">
                        <span
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            justifyContent: "end",
                            marginLeft: "auto",
                            textAlign: "right",
                            fontSize: "28px",
                            marginLeft: "-160px",
                          }}
                        >
                          {formatDate(checkData.check_date)}
                        </span>
                      </div>

                      {/* Table main */}
                      <div className="check-field my-5">
                        <div className="row mt-5 px-3">
                          <div className="col-md-9" style={{ display: "flex" }}>
                            <b>{/* PAY TO THE <br /> ORDER OF */}</b>
                            <span
                              style={{
                                cursor: "pointer",
                                marginLeft: "5%",
                                width: "80%",
                                fontSize: "28px",
                              }}
                            >
                              {checkData.check_payTo}
                            </span>
                          </div>
                          <div className="col-md-3">
                            <span>{/* $ */}</span>
                            <span
                              style={{
                                cursor: "pointer",
                                marginLeft: "8%",
                                width: "85%",
                                fontSize: "28px",
                              }}
                            >
                              {checkData.check_dollar_symbol}
                            </span>
                          </div>
                        </div>

                        <div
                          className="row py-5 px-5"
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              width: "99%",
                              fontSize: "28px",
                            }}
                          >
                            {checkData.check_dollar}
                          </span>

                          <b
                            style={{
                              marginTop: "-3%",
                              marginRight: "2%",
                              fontSize: "23px",
                            }}
                          >
                            {/* DOLLARS */}
                          </b>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-3" style={{ marginTop: "150px" }}>
                      {checkData.note.slice(0, 21).map((noteValue, index) => (
                        <div key={index}>
                          <TextField
                            type="text"
                            name={`note${index + 1}`}
                            style={{ width: "100%" }}
                            value={noteValue}
                            // onChange={(e) => handleCheckChange(index, e)}
                            label={index === 0 ? "Note" : undefined}
                            variant="standard"
                            InputLabelProps={{
                              style: { fontSize: "23px" },
                            }}
                            className="mt-4"
                          />
                        </div>
                      ))}
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
