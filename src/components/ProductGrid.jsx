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
  const searchQuery = searchParams.get("search");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Filter by category first, then by search query
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts?.filter((p) => p.category === category);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts?.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

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

  // Dynamic heading based on filters
  const getHeading = () => {
    if (searchQuery && category) {
      return `Search results for "${searchQuery}" in ${category.replace("'", "")}`;
    } else if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    } else if (category) {
      return category.replace("'", "");
    }
    return "All Products";
  };

  return (
    <section className="container mx-auto px-4 py-12" id="products">
      <h2 className="font-display text-3xl font-bold text-foreground mb-8 capitalize">
        {getHeading()}
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
