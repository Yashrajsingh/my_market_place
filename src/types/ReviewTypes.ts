import { User } from "./UserTypes";

export interface Review {
  id: number;
  reviewText: string;
  rating: number;
  productImages: string[];
  user: User;
  createdAt: string;
}

export interface CreateReviewRequest {
  reviewText: string;
  reviewRating: number;
  productImages?: string[];
}
