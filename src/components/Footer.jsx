import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate a brief delay then show success without sending mail
    setTimeout(() => {
      setIsSuccess(true);
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-navbar text-navbar-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold italic mb-3">Mad Commerce</h3>
            <p className="text-sm text-navbar-foreground/60 leading-relaxed">
              Your one-stop shop for fashion, electronics, and jewellery. Quality products at unbeatable prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-navbar-foreground/60">
              {["Men", "Women", "Jewellery", "Electronics", "About", "Contact Us"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-navbar-foreground/60 mb-3">
              Subscribe for exclusive deals and updates.
            </p>
            {isSuccess ? (
              <div className="text-primary font-semibold text-sm animate-pulse">
                ✓ Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 rounded-lg bg-navbar-foreground/10 px-3 py-2 text-sm placeholder:text-navbar-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Joining..." : "Join"}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-8 border-t border-navbar-foreground/10 pt-6 text-center text-xs text-navbar-foreground/40">
          © 2026 Mad Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
