import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, CreditCard, Send, Package, Truck, Phone, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [addressMode, setAddressMode] = useState("existing"); // "existing" or "new"
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        existingAddress: "123 Kewal Park, Delhi - 110033",
        newAddress: "",
        newCity: "",
        newZipcode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        // Validate address selection
        if (addressMode === "new" && (!formData.newAddress || !formData.newCity || !formData.newZipcode)) {
            alert("Please fill in all address fields");
            return;
        }

        setIsSubmitting(true);

        const shippingAddress = addressMode === "existing"
            ? formData.existingAddress
            : `${formData.newAddress}, ${formData.newCity} - ${formData.newZipcode}`;

        // Prepare email parameters
        const templateParams = {
            to_name: `${formData.firstName} ${formData.lastName}`,
            to_email: formData.email,
            order_id: Math.floor(100000 + Math.random() * 900000),
            total_amount: cartTotal.toFixed(2),
            item_count: cartItems.length,
            shipping_address: shippingAddress,
        };

        try {
            await emailjs.send(
                "service_6295e7s",
                "template_ua27tuh",
                templateParams,
                "ze1-SY3Aypt5Y3dFO"
            );

            setIsSuccess(true);
            setTimeout(() => {
                clearCart();
            }, 500);
        } catch (error) {
            console.error("FAILED...", error);
            alert("Failed to send order confirmation email. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20"
                >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                </motion.div>
                <h1 className="text-4xl font-display font-bold text-foreground mb-4">Order Placed Successfully!</h1>
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                    Your order has been received. A confirmation email has been sent to <span className="text-foreground font-semibold">{formData.email}</span>.
                </p>
                <Link
                    to="/"
                    className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background pt-8 pb-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-2 mb-8">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-muted transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <h1 className="text-4xl font-display font-bold text-foreground italic">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left side: Product List */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-border bg-muted/30 flex items-center gap-3">
                                <Package className="h-5 w-5 text-primary" />
                                <h2 className="font-bold text-lg">Product Summary</h2>
                            </div>
                            <div className="divide-y divide-border px-6">
                                {cartItems.length === 0 ? (
                                    <div className="py-12 text-center text-muted-foreground leading-relaxed">
                                        Your cart is empty. <br />
                                        <Link to="/" className="text-primary font-bold hover:underline">Go back to shop</Link>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="py-6 flex gap-6 items-center">
                                            <div className="h-20 w-20 bg-white border border-border rounded-xl p-3 flex-shrink-0 flex items-center justify-center">
                                                <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-foreground mb-1 truncate">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground font-medium uppercase">{item.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-muted-foreground mb-1">Quantity: {item.quantity}</p>
                                                <p className="font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Shipping Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#0a0e23] text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                            {/* Decorative gradient */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />

                            <h2 className="text-2xl font-bold mb-8 text-center tracking-tight">Shipping Address</h2>

                            <form onSubmit={handlePlaceOrder} className="space-y-5 relative z-10">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                        <input
                                            required
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="First Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 focus:border-primary outline-none transition-all placeholder:text-white/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                        <input
                                            required
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Last Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 focus:border-primary outline-none transition-all placeholder:text-white/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 focus:border-primary outline-none transition-all placeholder:text-white/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your Email"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 focus:border-primary outline-none transition-all placeholder:text-white/30"
                                        />
                                    </div>
                                </div>

                                {/* Address Selection */}
                                <div className="space-y-4">
                                    <div
                                        onClick={() => setAddressMode("existing")}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${addressMode === "existing"
                                            ? "bg-primary/20 border-primary"
                                            : "bg-white/5 border-white/10 hover:border-white/20"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            checked={addressMode === "existing"}
                                            onChange={() => setAddressMode("existing")}
                                            className="h-4 w-4 accent-primary"
                                        />
                                        <span className="text-white/80 text-sm">Existing Address: {formData.existingAddress}</span>
                                    </div>

                                    <div
                                        onClick={() => setAddressMode("new")}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${addressMode === "new"
                                            ? "bg-primary/20 border-primary"
                                            : "bg-white/5 border-white/10 hover:border-white/20"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            checked={addressMode === "new"}
                                            onChange={() => setAddressMode("new")}
                                            className="h-4 w-4 accent-primary"
                                        />
                                        <span className="text-white/80 text-sm font-semibold">Add New Address</span>
                                    </div>

                                    {/* New Address Form */}
                                    {addressMode === "new" && (
                                        <div className="space-y-3 mt-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <input
                                                required={addressMode === "new"}
                                                name="newAddress"
                                                value={formData.newAddress}
                                                onChange={handleInputChange}
                                                placeholder="Street Address"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-white/30 text-sm"
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    required={addressMode === "new"}
                                                    name="newCity"
                                                    value={formData.newCity}
                                                    onChange={handleInputChange}
                                                    placeholder="City"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-white/30 text-sm"
                                                />
                                                <input
                                                    required={addressMode === "new"}
                                                    name="newZipcode"
                                                    value={formData.newZipcode}
                                                    onChange={handleInputChange}
                                                    placeholder="Zipcode"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-white/30 text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-white/10 mt-8">
                                    <div className="flex justify-between items-center text-2xl font-black mb-6">
                                        <span className="tracking-tight">Total Price:</span>
                                        <span className="text-primary italic">Rs {cartTotal.toFixed(2)}</span>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || cartItems.length === 0}
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>
                                                Place Order <Send className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
