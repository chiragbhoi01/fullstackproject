import {Request , Response} from "express";
import { Review } from "../models/reviews.model";
import { Product } from "../models/product.model";

export const addReview = async (req: any, res: Response) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const getProductReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id }).populate("user", "name");
  res.json(reviews);
};