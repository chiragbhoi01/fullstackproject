import { Request, Response } from "express";
import { Wishlist } from "../models/wishlist.model";

export const addToWishlist = async (req: any, res: Response) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
  await wishlist.save();
  res.json(wishlist);
};

export const getWishlist = async (req: any, res: Response) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
  res.json(wishlist);
};
