import React, { useEffect } from "react";
import {
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  deleteCoupon,
  fetchAllCoupons,
} from "../../../State/customer/CouponSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
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
  },
}));

const Coupon = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { coupons, loading } = useAppSelector((state: any) => state.coupon);

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteCoupon(id));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, boxShadow: "0 6px 20px rgba(30,27,46,0.08)" }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <Typography variant="h5" fontWeight={700} className="text-gradient-brand">
          Coupons
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/admin/add-coupon")}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
          }}
        >
          Add Coupon
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Coupon Code</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>Expiry Date</StyledTableCell>
              <StyledTableCell>Minimum Order</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No coupons yet</TableCell>
              </TableRow>
            ) : (
              coupons.map((row: any) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.code}</StyledTableCell>

                  <StyledTableCell>{row.validityStartDate}</StyledTableCell>

                  <StyledTableCell>{row.validityEndDate}</StyledTableCell>

                  <StyledTableCell>
                    ₹{row.minimumOrderValue}
                  </StyledTableCell>

                  <StyledTableCell>{row.discountPercentage}%</StyledTableCell>

                  <StyledTableCell>
                    <Chip
                      label={row.isActive ? "ACTIVE" : "INACTIVE"}
                      color={row.isActive ? "success" : "error"}
                      size="small"
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Coupon;
