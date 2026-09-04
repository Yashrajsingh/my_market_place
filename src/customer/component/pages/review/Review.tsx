import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";
import { Button, Divider, Rating, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { fetchProductById } from "../../../../State/customer/ProductSlice";
import {
  createReview,
  fetchReviews,
  selectReviewLoading,
  selectReviews,
} from "../../../../State/customer/ReviewSlice";

const Review = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((store) => store);
  const reviews = useAppSelector(selectReviews);
  const loading = useAppSelector(selectReviewLoading);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | null>(5);

  useEffect(() => {
    if (!productId) return;

    dispatch(fetchProductById(Number(productId)));
    dispatch(fetchReviews(Number(productId)));
  }, [productId, dispatch]);

  const handleSubmitReview = () => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }

    if (!reviewText.trim() || !rating) return;

    dispatch(
      createReview({
        productId: Number(productId),
        request: {
          reviewText,
          reviewRating: rating,
        },
      })
    ).then(() => setReviewText(""));
  };

  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-4">
        <img
          src={product.product?.images?.[0]}
          alt={product.product?.title}
          className="w-full rounded-2xl shadow-card object-cover"
        />

        <div>
          <div>
            <p className="font-bold text-xl text-gray-800">
              {product.product?.seller?.businessDetails?.businessName || "Product"}
            </p>
            <p className="text-lg text-gray-600">{product.product?.title}</p>
          </div>

          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-bold text-gray-900">
                ₹{product.product?.sellingPrice}
              </span>
              <span className="line-through text-gray-400 text-lg">
                ₹{product.product?.mrpPrice}
              </span>
              <span className="text-rose-500 font-bold text-lg">
                {product.product?.discountPercent}% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Write a review */}
        <div className="border rounded-2xl p-5 bg-white shadow-sm space-y-3">
          <p className="font-semibold text-gray-800">Write a Review</p>

          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            sx={{ color: "#F59E0B" }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your experience with this product"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmitReview}
            disabled={!reviewText.trim() || !rating}
          >
            Submit Review
          </Button>
        </div>
      </section>

      <section className="space-y-5 w-full">
        <ReviewSummary reviews={reviews} />

        <Divider />

        {loading ? (
          <div className="text-center py-10 text-violet-600 font-semibold">
            Loading Reviews...
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div className="space-y-3" key={review.id}>
              <ReviewCard review={review} />
              <Divider />
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No reviews yet — be the first to review this product.
          </div>
        )}
      </section>
    </div>
  );
};

export default Review;
