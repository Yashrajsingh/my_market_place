import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerOrders,
  updateSellerOrderStatus,
} from "../../../State/seller/SellerSlice";
import { OrderStatus } from "../../../types/OrderTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #0071E3, #0058B0)",
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: "15px",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "18px",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  [`&:nth-of-type(odd)`]: {
    backgroundColor: "#FAF8FF",
  },

  "&:hover": {
    backgroundColor: "#F5F3FF",
  },

  [`&:last-child td, &:last-child th`]: {
    border: 0,
  },
}));

const statusOptions: OrderStatus[] = [
  "PENDING",
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const OrderTable = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state: any) => state.seller.orders);
  const loading = useAppSelector((state: any) => state.seller.loading);

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId: number, orderStatus: OrderStatus) => {
    dispatch(updateSellerOrderStatus({ orderId, orderStatus }));
  };

  return (
    <div className="p-4 w-full">
      <TableContainer
        component={Paper}
        className="rounded-xl shadow-lg"
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Order Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders yet
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: any) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell>#{order.id}</StyledTableCell>

                  <StyledTableCell>
                    {order.orderItems
                      .map((item: any) => item.product?.title)
                      .join(", ")}
                  </StyledTableCell>

                  <StyledTableCell>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state}
                  </StyledTableCell>

                  <StyledTableCell>₹{order.totalSellingPrice}</StyledTableCell>

                  <StyledTableCell>
                    <Select
                      size="small"
                      value={order.orderStatus}
                      onChange={(e: SelectChangeEvent) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
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

export default OrderTable;
