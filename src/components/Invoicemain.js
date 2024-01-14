import React from "react";
import "./main_assets/css/animated.css";
import "./main_assets/css/templatemo-chain-app-dev.css";
import { Link } from "react-router-dom";
import rightImg from "./main_assets/images/slider-dec.jpg";

export default function Invoicemain() {
  return (
    <>
      <header className="header-area">
        <nav className="navbar navbar-expand-lg bg-body-tertiary main-nav">
          <div className="container-fluid">
            <Link
              className="navbar-brand logo active px-5"
              to="/"
              style={{ marginLeft: "-10%", color: "#FFF" }}
            >
              <b>H FLOOR COVERING</b>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <Link
                    class="nav-link dropdown-toggle"
                    to=""
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#FFF" }}
                  >
                    <b style={{ color: "#FFF", fontSize: "20px" }}>
                      Actions 
                    </b>
                  </Link>
                  <ul
                    className="dropdown-menu"
                    style={{
                      height: "420px",
                      width: "300px",
                      marginLeft: "-200px",
                      fontSize: "20px",
                    }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/estimate_invoice">
                        Generate Estimate
                      </Link>
                      <hr />
                    </li>
                    <li>
                      <Link className="dropdown-item my-3" to="/estimate_report">
                        Estimate Report
                      </Link>
                      <hr style={{ margin: 0 }} />
                    </li>
                    <li>
                      <Link className="dropdown-item my-3" to="/invoice_report">
                        Invoice Report
                      </Link>
                      <hr style={{ margin: 0 }} />
                    </li>
                    <li>
                      <Link className="dropdown-item my-3" to="/work_order_invoice">
                        Work Order Requisition
                      </Link>
                      <hr style={{ margin: 0 }} />
                    </li>
                    <li>
                      <Link className="dropdown-item my-3" to="/workout_report">
                        Work Order Report
                      </Link>
                      <hr style={{ margin: 0 }} />
                    </li>
                    <li>
                      <Link className="dropdown-item my-3" to="/check">
                        Generate Check
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="main-banner" id="top" style={{ background: "" }}>
        <>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div
                    className="left-content show-up header-text"
                    data-wow-duration="1s"
                    data-wow-delay="1s"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <h2>
                          <b>
                            H Floor <span style={{ color: "#FFF" }}>Cover</span>
                            ing
                          </b>
                        </h2>
                        <p style={{ color: "black", marginLeft: "40px" }}>
                          It's easy to generate invoice and work order
                          requisition with <br />H Floor Covering database to
                          maintain record in our database <br />
                          without worrying about security.
                        </p>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="white-button first-button scroll-to-section"
                          style={{ marginLeft: "40px" }}
                        >
                          <Link to="/estimate_invoice">
                            <b>Get Started</b>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="right-image wow fadeInRight"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img src={rightImg} alt="right image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
