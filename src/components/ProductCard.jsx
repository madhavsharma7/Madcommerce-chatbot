import { Star, ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group rounded-xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-card p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-card-foreground line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium text-muted-foreground">
              {product.rating.rate}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price}
            </span>
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${added
                ? "bg-green-500 text-white scale-105"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
