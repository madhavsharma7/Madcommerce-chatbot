import { ShoppingBag, Sparkles, Truck, ShieldCheck } from "lucide-react";

const About = () => {
    return (
        <div className="bg-background pt-12 pb-24 overflow-hidden">
            {/* Hero Section */}
            <div className="container mx-auto px-4 max-w-6xl mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                            <Sparkles className="h-4 w-4" />
                            Our Story
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
                            Crafting Premium <span className="text-primary italic">Shopping</span> Experiences
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            Founded with a passion for quality and design, Mad Commerce has grown into a destination for those who value style and substance.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl relative p-8">
                            <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center">
                                <ShoppingBag className="h-32 w-32 text-primary opacity-20" />
                            </div>
                            <div className="bg-card p-6 rounded-2xl shadow-2xl absolute -bottom-6 -left-6 max-w-[240px]">
                                <p className="text-sm font-medium text-foreground italic whitespace-pre-wrap">"The best shopping experience I've ever had."</p>
                                <p className="text-xs text-muted-foreground mt-2">— Sarah Jenkins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-muted/30 py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-4">
                            <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                                <Truck className="text-primary h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Fast Delivery</h3>
                            <p className="text-muted-foreground">Expertly packed and shipped same-day for orders before 2PM.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="text-primary h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Secure Payments</h3>
                            <p className="text-muted-foreground">Your data is always encrypted. We use industry-standard security.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="text-primary h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Quality First</h3>
                            <p className="text-muted-foreground">Every product is handpicked and quality-checked by our team.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
