import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate("/checkout");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-[101] bg-card shadow-2xl flex flex-col border-l border-border"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border background-card">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary h-6 w-6" />
                                <h2 className="text-xl font-bold text-foreground">Your Basket</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-2">
                                        <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-30" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">Cart is empty</h3>
                                        <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="h-24 w-24 rounded-2xl bg-white border border-border p-3 flex-shrink-0 flex items-center justify-center">
                                            <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className="text-sm font-bold text-foreground line-clamp-1">{item.title}</h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold text-primary mt-1">₹{item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-muted rounded-lg border border-border">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 px-2 hover:text-primary transition-colors disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 px-2 hover:text-primary transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-border bg-muted/30 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold text-foreground">
                                    <span>Grand Total</span>
                                    <span className="text-primary italic">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};


export default Cart;
