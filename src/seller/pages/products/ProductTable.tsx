// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { styled } from "@mui/material/styles";
// import EditIcon from "@mui/icons-material/Edit";


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#000",
//     color: "#fff",
//     fontWeight: 600,
//     fontSize: "14px",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     padding: "20px",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#fafafa",
//   },
//   "&:hover": {
//     backgroundColor: "#f5f5f5",
//   },
// }));

// const products = [
//   {
//     id: 1,
//     images: [
//       "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200",
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200",
//       "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200",
//       "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
//     ],
//     title: "Woven Design Floral Zari Silk Saree",
//     mrp: 1799,
//     sellingPrice: 799,
//     color: "White",
//     stock: "IN_STOCK",
//   },
//   {
//     id: 2,
//     images: [
//       "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200",
//       "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200",
//       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
//       "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200",
//     ],
//     title: "Embroidered Bollywood Georgette Saree",
//     mrp: 1299,
//     sellingPrice: 899,
//     color: "Red",
//     stock: "IN_STOCK",
//   },
// ];

// const ProductTable = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>

//       <TableContainer component={Paper} className="shadow-lg rounded-lg">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Images</StyledTableCell>
//               <StyledTableCell>Title</StyledTableCell>
//               <StyledTableCell>MRP</StyledTableCell>
//               <StyledTableCell>Selling Price</StyledTableCell>
//               <StyledTableCell>Color</StyledTableCell>
//               <StyledTableCell>Update Stock</StyledTableCell>
//               <StyledTableCell>Update</StyledTableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {products.map((product) => (
//               <StyledTableRow key={product.id}>
//                 <StyledTableCell>
//                   <div className="grid grid-cols-2 gap-2 w-[130px]">
//                     {product.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt=""
//                         className="w-[55px] h-[70px] object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 </StyledTableCell>

//                 <StyledTableCell>{product.title}</StyledTableCell>

//                 <StyledTableCell>₹{product.mrp}</StyledTableCell>

//                 <StyledTableCell>
//                   ₹{product.sellingPrice}
//                 </StyledTableCell>

//                 <StyledTableCell>{product.color}</StyledTableCell>

//                 <StyledTableCell>
//                   <span className="text-green-600 font-medium">
//                     {product.stock}
//                   </span>
//                 </StyledTableCell>

//                 <StyledTableCell>
//                   <EditIcon className="text-emerald-600 cursor-pointer" />
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default ProductTable;

import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProducts } from "../../../State/seller/SellerProductSlice";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #0071E3, #0058B0)",
    color: "#fff",
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FAF8FF",
  },
  "&:hover": {
    backgroundColor: "#F5F3FF",
  },
}));

const ProductTable = () => {
  const dispatch = useAppDispatch();

  const {sellerProduct} = useAppSelector(store => store)

  const { products, loading, error } = useAppSelector(
    (state) => state.sellerProduct
  );

  useEffect(() => {
    console.log("ProductTable Mounted");

    dispatch(fetchSellerProducts());
  }, [dispatch]);

  console.log(products);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gradient-brand mb-4">My Products</h1>

      <TableContainer component={Paper} className="rounded-2xl shadow-card">
      <Table>

        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Color</StyledTableCell>
            <StyledTableCell>MRP</StyledTableCell>
            <StyledTableCell>Selling Price</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Size</StyledTableCell>
            <StyledTableCell>Update</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {loading && (
            <TableRow>
              <TableCell colSpan={10}>Loading...</TableCell>
            </TableRow>
          )}

          {error && (
            <TableRow>
              <TableCell colSpan={10}>{error}</TableCell>
            </TableRow>
          )}

          {!loading &&
            !error &&
            sellerProduct.products.map((item:any) => (
              <StyledTableRow key={item.id}>

                <StyledTableCell>
                  {item.images?.length ? (
                    <img
                      src={item.images[0]}
                      alt={String(item.title)}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </StyledTableCell>

                <StyledTableCell>{item.title}</StyledTableCell>

                <StyledTableCell>{item.description}</StyledTableCell>

                <StyledTableCell>
                  {item.category?.name}
                </StyledTableCell>

                <StyledTableCell>{item.color}</StyledTableCell>

                <StyledTableCell>
                  ₹{item.mrpPrice}
                </StyledTableCell>

                <StyledTableCell>
                  ₹{item.sellingPrice}
                </StyledTableCell>

                <StyledTableCell>
                  {item.quantity}
                </StyledTableCell>

                <StyledTableCell>
                  {item.size}
                </StyledTableCell>

                <StyledTableCell>
                  <EditIcon sx={{ color: "#0071E3", cursor: "pointer" }} />
                </StyledTableCell>

              </StyledTableRow>
            ))}

        </TableBody>

      </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;