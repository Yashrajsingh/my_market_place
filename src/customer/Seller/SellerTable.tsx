import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import {
  fetchAllSellers,
  updateSellerAccountStatus,
} from "../../State/AdminSlice";
import { AccountStatus } from "../../types/SellerTypes";

const accountStatuses: { status: AccountStatus; title: string }[] = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FAF8FF",
  },
  "&:hover": {
    backgroundColor: "#F5F3FF",
    transition: "0.3s",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SellerTable = () => {
  const dispatch = useAppDispatch();

  const { sellers, loading } = useAppSelector((state: any) => state.admin);

  const [accountStatus, setAccountStatus] = React.useState<AccountStatus | "">("");

  useEffect(() => {
    dispatch(fetchAllSellers(undefined));
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setAccountStatus(event.target.value as AccountStatus | "");
  };

  const handleStatusChange = (sellerId: number, status: AccountStatus) => {
    dispatch(updateSellerAccountStatus({ sellerId, status }));
  };

  const filteredRows =
    accountStatus === ""
      ? sellers
      : sellers.filter((s: any) => s.accountStatus === accountStatus);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold text-gradient-brand mb-5">
        Seller Accounts
      </h1>

      {/* Filter */}
      <div className="flex justify-start mb-6">
        <FormControl
          size="small"
          sx={{
            width: 260,
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <InputLabel id="account-status-label">
            Account Status
          </InputLabel>

          <Select
            labelId="account-status-label"
            id="account-status"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>

            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Table */}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Table>

          <TableHead>
            <TableRow>
              <StyledTableCell>Seller ID</StyledTableCell>
              <StyledTableCell>Business Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Change Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            ) : filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No sellers found</TableCell>
              </TableRow>
            ) : (
              filteredRows.map((row: any) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>

                  <StyledTableCell>
                    {row.businessDetails?.businessName || row.sellerName}
                  </StyledTableCell>

                  <StyledTableCell>
                    {row.email}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Chip
                      label={row.accountStatus.replace("_", " ")}
                      size="small"
                      color={
                        row.accountStatus === "ACTIVE"
                          ? "success"
                          : row.accountStatus === "PENDING_VERIFICATION"
                          ? "warning"
                          : "error"
                      }
                    />
                  </StyledTableCell>

                  <StyledTableCell>
                    <Select
                      size="small"
                      value={row.accountStatus}
                      onChange={(e: SelectChangeEvent) =>
                        handleStatusChange(row.id, e.target.value as AccountStatus)
                      }
                    >
                      {accountStatuses.map((item) => (
                        <MenuItem key={item.status} value={item.status}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default SellerTable;
