import React from "react";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Review } from "../../../../types/ReviewTypes";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { selectAuth } from "../../../../State/AuthSlice";
import { deleteReview } from "../../../../State/customer/ReviewSlice";

const ReviewCard = ({ review }: { review: Review }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const isOwner = user?.id === review.user?.id;

  const handleDelete = () => {
    dispatch(deleteReview(review.id));
  };

  return (
    <div className="flex justify-between items-start p-5 border-b">
      <Grid container spacing={2} gap={3}>

        {/* Avatar */}
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#0071E3" }}
            >
              {review.user?.fullName?.charAt(0) || "U"}
            </Avatar>
          </Box>
        </Grid>

        {/* Review Details */}
        <Grid item xs={10}>
          <div className="space-y-2">

            {/* Name + Date */}
            <div>
              <p className="font-semibold text-lg">
                {review.user?.fullName || "Anonymous"}
              </p>
              <p className="opacity-70 text-sm">
                {review.createdAt}
              </p>
            </div>

            {/* Rating */}
            <Rating
              readOnly
              value={review.rating}
              precision={0.5}
              sx={{ color: "#F59E0B" }}
            />

            {/* Review Text */}
            <p>{review.reviewText}</p>

            {/* Product Images */}
            {review.productImages?.length > 0 && (
              <div className="flex gap-2">
                {review.productImages.map((img, index) => (
                  <img
                    key={index}
                    className="w-24 h-24 object-cover rounded-md"
                    src={img}
                    alt="product"
                  />
                ))}
              </div>
            )}

          </div>
        </Grid>
      </Grid>

      {/* Delete Button */}
      {isOwner && (
        <IconButton color="error" onClick={handleDelete}>
          <Delete />
        </IconButton>
      )}
    </div>
  );
};

export default ReviewCard;
