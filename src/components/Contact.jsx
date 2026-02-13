import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    return (
        <div className="bg-background pt-12 pb-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="font-display text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Have questions about our products or your order? We're here to help you 24/7.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <Mail className="text-primary" />
                            </div>
                            <h3 className="font-bold text-xl mb-1 text-foreground">Email</h3>
                            <p className="text-muted-foreground">support@madcommerce.com</p>
                            <p className="text-xs text-muted-foreground/60 mt-2 italic">Standard response time: 2 hours</p>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <Phone className="text-primary" />
                            </div>
                            <h3 className="font-bold text-xl mb-1 text-foreground">Phone</h3>
                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                            <p className="text-xs text-muted-foreground/60 mt-2 italic">Mon-Fri: 9am - 6pm EST</p>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <MapPin className="text-primary" />
                            </div>
                            <h3 className="font-bold text-xl mb-1 text-foreground">Office</h3>
                            <p className="text-muted-foreground">123 Commerce St, New York, NY</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <form className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 text-foreground">Send a message</h2>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                                    <input className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <input className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2 mb-8">
                                <label className="text-sm font-medium text-muted-foreground">Message</label>
                                <textarea rows={5} className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="How can we help?" />
                            </div>
                            <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.01] transition-all">
                                Send Message <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
