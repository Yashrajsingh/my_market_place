import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { deleteDeal, fetchHome } from "../../../State/HomeSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: "15px",
    textAlign: "center",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "18px",
    textAlign: "center",
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

const DealTable = () => {
  const dispatch = useAppDispatch();

  const home = useAppSelector((state: any) => state.home.home);
  const loading = useAppSelector((state: any) => state.home.loading);

  const deals = home?.deals || [];

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteDeal(id));
  };

  return (
    <div className="p-6 w-full">
      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-lg"
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Deal ID</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Loading...</TableCell>
              </TableRow>
            ) : deals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No deals yet</TableCell>
              </TableRow>
            ) : (
              deals.map((deal: any) => (
                <StyledTableRow key={deal.id}>
                  <StyledTableCell>#{deal.id}</StyledTableCell>

                  <StyledTableCell>{deal.category?.name}</StyledTableCell>

                  <StyledTableCell>{deal.discount}%</StyledTableCell>

                  <StyledTableCell>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(deal.id)}
                        sx={{
                          backgroundColor: "#FDECEC",
                          transition: "0.3s",
                          "&:hover": {
                            backgroundColor: "#FFCDD2",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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

export default DealTable;
