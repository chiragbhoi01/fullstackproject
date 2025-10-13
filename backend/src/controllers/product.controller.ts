import { Request, Response } from "express";
import { Product } from "../models/product.model";


// 🟢 Create Product (Admin only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// 🟡 Get All Products (Public)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Get Single Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Update Product (Admin)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// 🔴 Delete Product (Admin)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      color,
      size,
      minPrice,
      maxPrice,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query: any = {};
    if (category) query.category = category;
    if (color) query.color = { $regex: color as string, $options: "i" };
    if (size) query.size = size;
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice ? { $gte: Number(minPrice) } : {}),
        ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
      };
    if (search)
      query.name = { $regex: search as string, $options: "i" };

    const sortQuery: any = { [sortBy as string]: order === "asc" ? 1 : -1 };
    const products = await Product.find(query).sort(sortQuery);

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const recommendProducts = async (req: Request, res: Response) => {
  const base = await Product.findById(req.params.id);
  if (!base) return res.status(404).json({ message: "Product not found" });
  const similar = await Product.find({
    category: base.category,
    color: base.color,
    _id: { $ne: base._id },
  }).limit(3);
  res.json(similar);
};
