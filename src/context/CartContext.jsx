import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();

    // Load cart from localStorage when user changes
    useEffect(() => {
        const syncCart = async () => {
            if (user) {
                const storageKey = `cart_${user.email}`;
                const savedCart = localStorage.getItem(storageKey);

                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                } else if (user.id) {
                    // If no local cart, try to fetch from Fakestore API
                    try {
                        const response = await fetch(`https://fakestoreapi.com/carts/user/${user.id}`);
                        const carts = await response.json();

                        // Fakestore returns an array of carts, we'll take the most recent one (usually the first)
                        if (carts.length > 0) {
                            const apiCart = carts[0];
                            const enrichedItems = await Promise.all(
                                apiCart.products.map(async (item) => {
                                    const prodRes = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
                                    const product = await prodRes.json();
                                    return { ...product, quantity: item.quantity };
                                })
                            );
                            setCartItems(enrichedItems);
                        } else {
                            setCartItems([]);
                        }
                    } catch (error) {
                        console.error("Error syncing API cart:", error);
                        setCartItems([]);
                    }
                } else {
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        };

        syncCart();
    }, [user]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (user && cartItems.length >= 0) {
            const storageKey = `cart_${user.email}`;
            localStorage.setItem(storageKey, JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
