import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
                    <Link to="/" className="text-primary hover:underline">
                        Return to shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ChevronLeft className="h-5 w-5" />
                    Back
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-white border border-border rounded-3xl p-12 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-w-full max-h-[500px] object-contain"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center space-y-6">
                        <h1 className="text-4xl font-display font-bold text-foreground leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wide">
                                {product.category}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Description:
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Price:
                            </h3>
                            <p className="text-4xl font-bold text-foreground">
                                ₹{product.price}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Rating:
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < Math.floor(product.rating?.rate || 0)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-foreground font-semibold">
                                    {product.rating?.rate || 0}
                                </span>
                                <span className="text-muted-foreground">
                                    ({product.rating?.count || 0} reviews)
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black hover:bg-black/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-8"
                        >
                            {added ? (
                                <>
                                    <Check className="h-5 w-5" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
