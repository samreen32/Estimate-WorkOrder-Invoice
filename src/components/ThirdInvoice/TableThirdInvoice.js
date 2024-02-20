import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router";
import { UserLogin } from "../../context/AuthContext";
import {
  DELETE_SPECIFIC_WORKOUT_INVOICE,
  GET_All_WORKOUT_INVOICES,
} from "../../Auth_API";

export default function TableThirdInvoice() {
  let navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const { setWorkInvoiceDetails } = UserLogin();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchWords = searchQuery.split(" ");
  const [totalAmount, setTotalAmount] = useState(0);

  /* Endpoint integration for get all the invoices */
  useEffect(() => {
    const fetchAllInvoices = async () => {
      try {
        const response = await axios.get(`${GET_All_WORKOUT_INVOICES}`);

        if (response.data.success) {
          const estimateInvoices = response.data.invoices;
          setInvoices(estimateInvoices);
          console.log(estimateInvoices)
        } else {
          console.error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error.message);
      }
    };

    fetchAllInvoices();
  }, []);

  useEffect(() => {
    const totalSum = invoices.reduce((sum, invoice) => {
      const laborAmount = parseFloat(invoice.labor);

      // Check if laborAmount is a valid number
      if (!isNaN(laborAmount)) {
        return sum + laborAmount;
      } else {
        console.warn(`Skipping invalid labor amount in invoice: ${invoice._id}`);
        return sum;
      }
    }, 0);

    setTotalAmount(totalSum);
  }, [invoices]);


  /* Endpoint integration for delete invoice */
  const handleDeleteClick = async (invoiceId) => {
    try {
      const response = await axios.delete(
        `${DELETE_SPECIFIC_WORKOUT_INVOICE}/${invoiceId}`
      );

      if (response.data.success) {
        const updatedInvoices = invoices.filter(
          (invoice) => invoice._id !== invoiceId
        );
        setInvoices(updatedInvoices);
      } else {
        console.error(`Delete request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
    }
  };

  /* Function to move to next for edit */
  const handleEditNextClick = (invoiceId) => {
    navigate(`/modify_workorder_report`, { state: { invoiceId } });
  };

  const columns = [
    { id: "id", label: "#", minWidth: 100 },
    { id: "cust_id", label: "Customer No", minWidth: 100 },
    { id: "installer_name", label: "Installer Name", minWidth: 100 },
    { id: "job_name", label: "Job Name", minWidth: 100 },
    { id: "phone", label: "Phone", minWidth: 100 },
    { id: "work_date", label: "Date", minWidth: 100 },
    { id: "labor", label: "Labor", minWidth: 100 },
    { id: "edit", label: "Edit", minWidth: 100 },
    { id: "delete", label: "Delete", minWidth: 100 },
  ];

  /* Table pagination */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* Functions for Search Input Field */
  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchBlur = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();

    const filteredInvoices = invoices.filter((invoice) => {
      return columns.some((column) => {
        const value = String(invoice[column.id]).toLowerCase();

        return value.includes(query);
      });
    });

    setSearchQuery(query);
    setInvoices(filteredInvoices);
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <div id="invoice-generated">
        <div className="container px-5 py-5" style={{ width: "100%" }}>
          <>
            <h2
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <span
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer", marginLeft: "-30%" }}
              >
                <i class="fa fa-chevron-left fa-1x" aria-hidden="true"></i>
              </span>
              <span style={{ cursor: "pointer", marginLeft: "30%" }}>
                Work Order Report
              </span>
            </h2>

            <>
              <Toolbar className="toolbar-search">
                <form className="d-flex search-form" role="search">
                  <div
                    className={`search-container ${isExpanded ? "expanded" : ""
                      }`}
                  >
                    <button
                      onClick={handleSearchClick}
                      className="search-button"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Search here..."
                      onClick={handleSearchClick}
                      onBlur={handleSearchBlur}
                      onChange={handleSearchChange}
                    />
                  </div>
                </form>
              </Toolbar>
            </>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 1000 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="left"
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "lightgrey",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((invoice, index) => (
                        <TableRow
                          key={invoice._id}
                          onClick={() => setWorkInvoiceDetails(invoice._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell align="left">{index + 1}</TableCell>
                          {columns.slice(1, -2).map((column) => (
                            <TableCell key={column.id} align="left">
                              {column.id === "work_date"
                                ? new Date(
                                  invoice[column.id]
                                ).toLocaleDateString()
                                : column.id === "estimate_address"
                                  ? invoice[column.id].join(", ")
                                  : invoice[column.id]}
                              {column.id === "labor" && `$`}
                            </TableCell>
                          ))}
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEditNextClick(invoice._id)}
                              style={{ cursor: "pointer" }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDeleteClick(invoice._id)}
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <div
                className="total_amount_invoices py-4"
                style={{ fontSize: "18px" }}
              >
                <p>
                  <b style={{ fontSize: "1.2rem" }}>
                    Total: $
                    {typeof totalAmount === "number"
                      ? totalAmount.toFixed(2)
                      : "N/A"}
                  </b>
                </p>
              </div>

              <TablePagination
                className="table-last-row-audio"
                rowsPerPageOptions={[
                  5, 10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 350, 400, 450,
                  500, 550, 1000, 1050, 2000,
                ]}
                component="div"
                count={invoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        </div>
      </div>
    </div>
  );
}
