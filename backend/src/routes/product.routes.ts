import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getFilteredProducts,
    recommendProducts
} from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();
// Public
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/filter", getFilteredProducts);
router.get("/recommend/:id", getFilteredProducts);

// Admin Only
router.post("/", protect, authorize("admin"), createProduct);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);
router.post("/upload", protect, authorize("admin"),
    upload.single("image"),
    (req, res) => {
        res.json({
            imageUrl: `/uploads/${req.file?.filename}`,
            message: "Image uploaded successfully",

        })
    }
)


export default router;



