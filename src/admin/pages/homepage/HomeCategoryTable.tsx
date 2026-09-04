import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchHomeCategories, updateHomeCategory } from "../../../State/HomeSlice";
import { HomeCategory, HomeCategorySection } from "../../../types/HomeTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
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

interface HomeCategoryTableProps {
  section: HomeCategorySection;
}

const HomeCategoryTable = ({ section }: HomeCategoryTableProps) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state: any) => state.home.categories);
  const loading = useAppSelector((state: any) => state.home.loading);

  const [editing, setEditing] = useState<HomeCategory | null>(null);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch]);

  const rows = categories.filter((c: HomeCategory) => c.Section === section);

  const openEdit = (row: HomeCategory) => {
    setEditing(row);
    setImage(row.image);
    setCategoryId(row.categoryId);
  };

  const handleSave = () => {
    if (!editing) return;

    dispatch(updateHomeCategory({ id: editing.id, image, categoryId }));
    setEditing(null);
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
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Category ID</StyledTableCell>
              <StyledTableCell>Update</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Loading...</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No categories yet</TableCell>
              </TableRow>
            ) : (
              rows.map((row: HomeCategory) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    <img src={row.image} alt={row.name} className="w-14 h-14 object-cover rounded" />
                  </StyledTableCell>

                  <StyledTableCell>{row.name}</StyledTableCell>

                  <StyledTableCell>{row.categoryId}</StyledTableCell>

                  <StyledTableCell>
                    <IconButton sx={{ color: "#7C3AED" }} onClick={() => openEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit {editing?.name}</DialogTitle>

        <DialogContent className="space-y-4 pt-2">
          <TextField
            fullWidth
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <TextField
            fullWidth
            label="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomeCategoryTable;
