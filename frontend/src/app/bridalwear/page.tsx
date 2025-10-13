"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import ProductCard from "@/components/ProductCard";

export default function BridalPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const bridal = res.data.filter((item: any) => item.category === "bridal");
        setProducts(bridal);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-rose-50 min-h-screen">
      <h1 className="text-3xl font-bold text-rose-700 mb-6">👰 Bridal Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
