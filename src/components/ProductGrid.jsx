import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const ProductGrid = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredProducts = category
    ? products?.filter((p) => p.category === category)
    : products;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12" id="products">
      <h2 className="font-display text-3xl font-bold text-foreground mb-8 capitalize">
        {category ? `${category.replace("'", "")}` : "All Products"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts?.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No products found in this category.
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
