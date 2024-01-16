import React from "react";
import checkLogo from "../../assets/img/checkLogo.png";
import checkMemo from "../../assets/img/check_memo.png";
import checkDesign from "../../assets/img/bg-card.png";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import "./check.css";
import { UserLogin } from "../../context/AuthContext";

export default function CheckHome() {
  let navigate = useNavigate();
  const { checkData, handleCheckChange } = UserLogin();

  const handleGenerateNew = () => {
    navigate("/generate_check");
  };

  while (checkData.note.length < 3) {
    checkData.note.push("");
  }

  return (
    <>
      <div id="invoice-generated" style={{ overflowX: "hidden" }}>
        <div
          className="row justify-content-center text-align-center"
          style={{ marginTop: "5%" }}
        >
          <div className="col-md-4 text-center">
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              <i class="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
            </span>
          </div>
          <div className="col-md-4 text-center">
            <span style={{ cursor: "pointer" }}>
              <h1>
                <b>Generate Check</b>
              </h1>
            </span>
          </div>
          <div className="col-md-4 text-center">
            <button
              onClick={handleGenerateNew}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                background: "#1f9fc6",
                padding: "10px 16px",
                color: "white",
                border: "none",
              }}
            >
              Generate Print
            </button>
          </div>
        </div>

        <div className="px-5 py-5" style={{ width: "100%" }} id="pdf">
          <div class="body dark-background">
            <div class="outer-border">
              <div class="mid-border">
                <div class="inner-border">
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
                  <div className="row check-row mt-5 px-5">
                    <div className="col-md-2">
                      <img src={checkLogo} alt="check logo" width={180} />
                    </div>
                    <div className="col-md-3">
                      <address className="mt-3">
                        <b>H FLOOR COVERING LLC</b> <br />
                        1148 BLAKES FIELD PL <br />
                        HENDERSON NV 89011
                      </address>
                    </div>
                    <div className="col-md-4">
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
                    <div className="col-md-3">
                      <b style={{ fontSize: "30px" }}>
                        {/* {generateRandomNumber()} */}
                      </b>
                    </div>
                  </div>

                  <>
                    <div className="py-5 px-5">
                      {/* Date */}
                      <div className="row mt-3">
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
                          value={checkData.check_date}
                          onChange={(e) => handleCheckChange(undefined, e)}
                        />
                      </div>

                      {/* Table main */}
                      <div className="check-main-table my-5">
                        <div className="row mt-5 px-3">
                          <div
                            className="col-md-9"
                            style={{ display: "flex", fontSize: "23px" }}
                          >
                            <b>
                              PAY TO THE <br /> ORDER OF
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
                              name="check_payTo"
                              value={checkData.check_payTo}
                              onChange={(e) => handleCheckChange(undefined, e)}
                            />
                          </div>
                          <div className="col-md-3">
                            <span
                              style={{ fontWeight: "bold", fontSize: "30px" }}
                            >
                              $
                            </span>
                            <TextField
                              style={{
                                cursor: "pointer",
                                marginLeft: "5%",
                                width: "85%",
                                fontSize: "25px",
                              }}
                              id="check_dollar_symbol"
                              type="text"
                              variant="standard"
                              name="check_dollar_symbol"
                              value={checkData.check_dollar_symbol}
                              onChange={(e) => handleCheckChange(undefined, e)}
                            />
                            {/* <TextField
                              style={{
                                cursor: "pointer",
                                marginLeft: "8%",
                                width: "85%",
                              }}
                              id="check_dollar_symbol"
                              type="text"
                              variant="standard"
                              name=" check_dollar_symbol"
                              value={checkData.check_dollar_symbol}
                              onChange={(e) => handleCheckChange(undefined, e)}
                            /> */}
                          </div>
                        </div>

                        <div
                          className="row py-5 px-5"
                          style={{
                            display: "flex",
                            // justifyContent: "end",
                          }}
                        >
                          <TextField
                            style={{
                              cursor: "pointer",
                              width: "80%",
                              marginLeft: "185px",
                            }}
                            id="check_dollar"
                            type="text"
                            variant="standard"
                            name="check_dollar"
                            value={checkData.check_dollar}
                            onChange={(e) => handleCheckChange(undefined, e)}
                          />
                          <b
                            style={{
                              marginTop: "-3%",
                              marginLeft: "92%",
                              fontSize: "23px",
                            }}
                          >
                            DOLLARS
                          </b>
                        </div>
                      </div>
                    </div>
                  </>

                  {/* Memo images */}
                  <div className="row px-5" style={{ marginTop: "-5%" }}>
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
                  <div className="row px-5" style={{ marginBottom: "5%" }}>
                    <div className="col-md-5 py-3 px-4">
                      <b>&nbsp;&nbsp;MEMO</b>
                    </div>
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
                        //   onChange={(e) => handleCheckChange(undefined, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "500px" }}>
            {checkData.note.slice(0, 3).map((noteValue, index) => (
              <div key={index}>
                <TextField
                  type="text"
                  name={`note${index + 1}`}
                  style={{ width: "100%" }}
                  value={noteValue}
                  onChange={(e) => handleCheckChange(index, e)}
                  label={index === 0 ? "Note" : undefined}
                  variant="standard"
                  InputLabelProps={{
                    style: { fontSize: "40px" },
                  }}
                  className="mt-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
