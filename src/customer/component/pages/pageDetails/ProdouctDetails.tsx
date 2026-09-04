import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button, Divider } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";

import SimilarProducts from "./SimilarProducts";
import ReviewSummary from "../review/ReviewSummary";
import ReviewCard from "../review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../../../State/customer/ProductSlice";
import { addItemToCart } from "../../../../State/customer/CartSlice";
import {
  selectIsInWishlist,
  toggleWishlistProduct,
} from "../../../../State/customer/WishlistSlice";
import {
  fetchReviews,
  selectReviews,
} from "../../../../State/customer/ReviewSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {productId} = useParams()
  const {product} = useAppSelector(store => store)
  const isWishlisted = useAppSelector(selectIsInWishlist(Number(productId)))
  const reviews = useAppSelector(selectReviews)
  const [activeImage, setActiveImage] = useState(0)

  const handleActiveImage = (value:number) => () => {
    setActiveImage(value)
  }

  const handleAddToBag = () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login");
      return;
    }

    dispatch(
      addItemToCart({
        jwt,
        request: {
          productId: Number(productId),
          size: product.product?.size || "",
          quantity,
        },
      })
    );
  };

  const handleToggleWishlist = () => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }

    dispatch(toggleWishlistProduct(Number(productId)));
  };

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
    dispatch(fetchReviews(Number(productId)))
  },[productId])
  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-12 py-8">
      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-md p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE */}
          <section className="flex gap-4 sticky top-5">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.product?.images.map((item,index) => (
                <img
                  key={index}
                  src={item}
                  onClick = {handleActiveImage(index)}
                  alt=""
                  className={`w-[75px] h-[90px] object-cover border-2 rounded-lg cursor-pointer transition ${
                    activeImage === index
                      ? "border-violet-500 shadow-brand"
                      : "border-transparent hover:border-violet-300"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center">
              <img
                src={product.product?.images[activeImage]}
                alt=""
                className="w-full max-h-[520px] object-contain rounded-xl"
              />
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.product?.seller?.businessDetails?.businessName || "Product"}
              </h1>
              <p className="text-gray-500 text-lg mt-2">{product.product?.title}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 border rounded-lg px-4 py-2 w-fit shadow-sm bg-amber-50/60 border-amber-200">
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </span>
                <StarIcon sx={{ color: "#F59E0B", fontSize: 18 }} />
              </div>

              <Divider orientation="vertical" flexItem />

              <span className="text-sm text-gray-600">{reviews.length} Ratings</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900">₹{product.product?.sellingPrice}</span>
                <span className="line-through text-gray-400 text-lg">
                  ₹{product.product?.mrpPrice}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  {product.product?.discountPercent}% OFF
                </span>
              </div>

              <p className="text-sm text-gray-500">
                Inclusive of all taxes. Free Shipping above ₹499.
              </p>
            </div>

            <Divider />

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Shield sx={{ color: "#7C3AED" }} />
                <p className="text-gray-700">Authentic & Quality Assured</p>
              </div>

              <div className="flex items-center gap-4">
                <WorkspacePremium sx={{ color: "#7C3AED" }} />
                <p className="text-gray-700">100% money back guarantee</p>
              </div>

              <div className="flex items-center gap-4">
                <LocalShipping sx={{ color: "#7C3AED" }} />
                <p className="text-gray-700">Free Shipping & Returns</p>
              </div>

              <div className="flex items-center gap-4">
                <Wallet sx={{ color: "#7C3AED" }} />
                <p className="text-gray-700">
                  Pay on delivery might be available
                </p>
              </div>
            </div>

            <Divider />

            {/* Quantity */}
            <div>
              <p className="font-semibold mb-3 uppercase tracking-wide text-sm">
                Quantity
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outlined"
                  size="small"
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <Remove />
                </Button>

                <span className="font-bold text-lg w-8 text-center">
                  {quantity}
                </span>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Add />
                </Button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToBag}
                sx={{
                  py: "0.9rem",
                  px: "2rem",
                  minWidth: "220px",
                }}
              >
                Add To Bag
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Favorite />}
                onClick={handleToggleWishlist}
                sx={{
                  py: "0.9rem",
                  px: "2rem",
                  minWidth: "220px",
                }}
              >
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>
            </div>

            {/* Description */}
            <div className="text-gray-500 text-sm leading-7 border-t pt-5">
              {product.product?.description}
            </div>
          </section>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-[1400px] mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient-brand">Reviews</h1>

          <button
            onClick={() => navigate(`/reviews/${productId}`)}
            className="text-sm font-semibold text-violet-600 hover:text-violet-800"
          >
            View all &amp; write a review →
          </button>
        </div>

        <ReviewSummary reviews={reviews} />

        {reviews.slice(0, 3).map((review: any) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {reviews.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No reviews yet — be the first to review this product.
          </p>
        )}
      </div>

      {/* Similar Products */}
      <div className="max-w-[1400px] mx-auto mt-10 bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gradient-brand">Similar Products</h1>
        <div className="pt-5">
          <SimilarProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;