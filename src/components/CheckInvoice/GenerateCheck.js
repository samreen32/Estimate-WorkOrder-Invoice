import React, { useRef } from "react";
import checkLogo from "../../assets/img/checkLogo.png";
import checkMemo from "../../assets/img/check_memo.png";
import checkDesign from "../../assets/img/bg-card.png";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import "./check.css";
import generatePDF from "react-to-pdf";
import { UserLogin } from "../../context/AuthContext";

export default function GenerateCheck() {
  let navigate = useNavigate();
  const { checkData, setCheckData, handleCheckChange } = UserLogin();
  const targetRef = useRef();

  const handleGenerateNew = () => {
    navigate("/check");
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
              onClick={handleGenerateNew}
              // style={{ cursor: "pointer", marginLeft: "-40%" }}
            >
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
                        <TextField
                          style={{
                            cursor: "pointer",
                            width: "23%",
                            justifyContent: "end",
                            marginLeft: "auto",
                            textAlign: "right",
                          }}
                          id="check_date"
                          type="text"
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                          name="check_date"
                          value={checkData.check_date}
                        />
                      </div>

                      {/* Table main */}
                      <div className="check-field my-5">
                        <div className="row mt-5 px-3">
                          <div
                            className="col-md-9"
                            style={{ display: "flex", fontSize: "23px" }}
                          >
                            <b>
                              {/* PAY TO THE <br /> ORDER OF */}
                            </b>
                            <TextField
                              style={{
                                cursor: "pointer",
                                marginLeft: "5%",
                                width: "80%",
                                fontSize: "25px",
                              }}
                              id="check_payTo"
                              type="text"
                              
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                              name="check_payTo"
                              value={checkData.check_payTo}
                            />
                          </div>
                          <div className="col-md-3">
                            <span
                              style={{ fontWeight: "bold", fontSize: "30px" }}
                            >
                              {/* $ */}
                            </span>
                            <TextField
                              style={{
                                cursor: "pointer",
                                marginLeft: "8%",
                                width: "85%",
                              }}
                              id="check_dollar_symbol"
                              type="text"
                              
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                              name=" check_dollar_symbol"
                              value={checkData.check_dollar_symbol}
                              onChange={handleCheckChange}
                            />
                          </div>
                        </div>

                        <div
                          className="row py-5 px-5"
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <TextField
                            style={{
                              cursor: "pointer",
                              width: "97%",
                            }}
                            id="check_dollar"
                            type="text"
                          
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            name="check_dollar"
                            value={checkData.check_dollar}
                            onChange={handleCheckChange}
                          />
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
