// import React from "react";

// import {
//   Add,
//   Delete,
//   Remove,
// } from "@mui/icons-material";

// import { IconButton } from "@mui/material";

// import { CartItem as CartItemType } from "../../../../types/CartTypes";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../../State/Store";

// import {
//   deleteCartItem,
//   updateCartItem,
// } from "../../../../State/customer/CartSlice";

// interface CartItemProps {
//   item: CartItemType;
// }

// const CartItemComponent: React.FC<
//   CartItemProps
// > = ({ item }) => {

//   const dispatch = useAppDispatch();

//   const jwt =
//     localStorage.getItem("jwt") || "";

//   const handleIncrease = () => {
//     dispatch(
//       updateCartItem({
//         jwt,
//         cartItemId: item.id,
//         quantity: item.quantity + 1,
//       })
//     );
//   };

//   const handleDecrease = () => {

//     if (item.quantity <= 1) {
//       return;
//     }

//     dispatch(
//       updateCartItem({
//         jwt,
//         cartItemId: item.id,
//         quantity: item.quantity - 1,
//       })
//     );
//   };

//   const handleDelete = () => {
//     dispatch(
//       deleteCartItem({
//         jwt,
//         cartItemId: item.id,
//       })
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border p-4">

//       <div className="flex gap-4">

//         {/* PRODUCT IMAGE */}

//         <div className="w-28 h-28 shrink-0">

//           <img
//             src={
//               item.product?.images?.[0] ||
//               "/placeholder.jpg"
//             }
//             alt={
//               item.product?.title ||
//               "Product"
//             }
//             className="w-full h-full object-cover rounded-lg"
//           />

//         </div>

//         {/* PRODUCT DETAILS */}

//         <div className="flex-1">

//           <h2 className="text-lg font-semibold text-gray-800">
//             {item.product?.title}
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             Size: {item.size}
//           </p>

//           <div className="flex items-center gap-3 mt-3">

//             <span className="text-lg font-bold text-gray-800">
//               ₹{item.product?.sellingPrice}
//             </span>

//             {item.product?.mrpPrice >
//               item.product?.sellingPrice && (
//               <span className="text-sm text-gray-400 line-through">
//                 ₹{item.product?.mrpPrice}
//               </span>
//             )}

//           </div>

//           {/* QUANTITY */}

//           <div className="flex items-center gap-2 mt-4">

//             <IconButton
//               size="small"
//               onClick={handleDecrease}
//               disabled={item.quantity <= 1}
//             >
//               <Remove fontSize="small" />
//             </IconButton>

//             <span className="px-4 py-1 border rounded">
//               {item.quantity}
//             </span>

//             <IconButton
//               size="small"
//               onClick={handleIncrease}
//             >
//               <Add fontSize="small" />
//             </IconButton>

//           </div>

//         </div>

//         {/* DELETE */}

//         <IconButton
//           color="error"
//           onClick={handleDelete}
//         >
//           <Delete />
//         </IconButton>

//       </div>

//     </div>
//   );
// };

// export default CartItemComponent;

import React from "react";

import { IconButton } from "@mui/material";

import {
  Add,
  Delete,
  Remove,
} from "@mui/icons-material";

import {
  CartItem as CartItemType,
} from "../../../../types/CartTypes";

import {
  updateCartItem,
  deleteCartItem,
} from "../../../../State/customer/CartSlice";

import {
  useAppDispatch,
} from "../../../../State/Store";

interface CartItemProps {
  item: CartItemType;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
}) => {
  const dispatch = useAppDispatch();

  const jwt = localStorage.getItem("jwt") || "";

  // ============================================
  // INCREASE QUANTITY
  // ============================================

  const handleIncrease = () => {
    if (!jwt) {
      console.error("JWT not found");
      return;
    }

    dispatch(
      updateCartItem({
        jwt,
        cartItemId: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  // ============================================
  // DECREASE QUANTITY
  // ============================================

  const handleDecrease = () => {
    if (!jwt) {
      console.error("JWT not found");
      return;
    }

    if (item.quantity <= 1) {
      handleDelete();
      return;
    }

    dispatch(
      updateCartItem({
        jwt,
        cartItemId: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = () => {
    if (!jwt) {
      console.error("JWT not found");
      return;
    }

    dispatch(
      deleteCartItem({
        jwt,
        cartItemId: item.id,
      })
    );
  };

  // ============================================
  // PRODUCT IMAGE
  // ============================================

  const productImage =
    item.product?.images &&
    item.product.images.length > 0
      ? item.product.images[0]
      : "/placeholder.jpg";

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-transparent hover:border-violet-100 p-4">
      <div className="flex gap-4">

        {/* =====================================
            PRODUCT IMAGE
        ====================================== */}

        <div className="w-28 h-28 shrink-0">
          <img
            src={productImage}
            alt={item.product?.title || "Product"}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
        </div>

        {/* =====================================
            PRODUCT DETAILS
        ====================================== */}

        <div className="flex-1">

          <h2 className="text-lg font-semibold text-gray-800">
            {item.product?.title || "Product"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Size: {item.size}
          </p>

          {/* PRICE */}

          <div className="flex items-center gap-3 mt-3">

            <span className="text-lg font-bold text-rose-600">
              ₹{item.sellingPrice}
            </span>

            {item.mrpPrice > item.sellingPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{item.mrpPrice}
              </span>
            )}

          </div>

          {/* =====================================
              QUANTITY
          ====================================== */}

          <div className="flex items-center gap-2 mt-4">

            <IconButton
              size="small"
              onClick={handleDecrease}
              sx={{
                bgcolor: "#F5F3FF",
                "&:hover": { bgcolor: "#EDE9FE" },
              }}
            >
              <Remove fontSize="small" />
            </IconButton>

            <span className="px-4 py-1 border border-violet-200 rounded-full font-semibold text-violet-700 min-w-[40px] text-center">
              {item.quantity}
            </span>

            <IconButton
              size="small"
              onClick={handleIncrease}
              sx={{
                bgcolor: "#F5F3FF",
                "&:hover": { bgcolor: "#EDE9FE" },
              }}
            >
              <Add fontSize="small" />
            </IconButton>

          </div>
        </div>

        {/* =====================================
            DELETE
        ====================================== */}

        <IconButton
          color="error"
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>

      </div>
    </div>
  );
};

export default CartItemComponent;