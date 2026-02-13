import { Search, ShoppingCart, Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const categories = [
  { name: "Men", slug: "men's clothing" },
  { name: "Women", slug: "women's clothing" },
  { name: "Jewellery", slug: "jewelery" },
  { name: "Electronics", slug: "electronics" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();


  return (
    <nav className="sticky top-0 z-50 bg-navbar text-navbar-foreground shadow-lg border-b border-navbar-foreground/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-2xl font-bold tracking-wide italic hover:text-primary transition-colors">
          Mad Commerce
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg border-0 bg-navbar-foreground/10 px-4 py-2 text-sm text-navbar-foreground placeholder:text-navbar-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navbar-foreground/50" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <div className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              onMouseEnter={() => setCatOpen(true)}
              className="flex items-center gap-1 hover:text-primary transition-colors py-2"
            >
              Categories <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              onMouseLeave={() => setCatOpen(false)}
              className={`absolute top-full left-0 mt-1 w-48 rounded-xl bg-card text-card-foreground shadow-2xl border border-border transition-all duration-200 z-[60] ${catOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
            >
              <div className="py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/?category=${cat.slug}`}
                    className="block px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => setCatOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/contact" className="hover:text-primary transition-colors py-2">Contact Us</Link>
          <Link to="/about" className="hover:text-primary transition-colors py-2">About</Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{user.email}</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full border border-destructive/30 hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2 rounded-full border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all">Login</Link>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-primary transition-colors p-2"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground transform translate-x-1/4 -translate-y-1/4">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-navbar-foreground/10 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-4 py-6 space-y-4 bg-navbar">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg bg-navbar-foreground/10 px-4 py-2.5 text-sm placeholder:text-navbar-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navbar-foreground/50" />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <Link to="/" onClick={() => setMenuOpen(false)} className="py-2.5 px-2 hover:bg-white/5 rounded-lg transition-colors text-lg font-medium">Home</Link>
            <div className="py-1">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center justify-between w-full py-2.5 px-2 hover:bg-white/5 rounded-lg text-lg font-medium"
              >
                Categories <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="pl-4 mt-1 border-l-2 border-primary/20 space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/?category=${cat.slug}`}
                      className="block py-2 px-3 text-base text-navbar-foreground/80 hover:text-primary transition-colors"
                      onClick={() => {
                        setCatOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="py-2.5 px-2 hover:bg-white/5 rounded-lg transition-colors text-lg font-medium">Contact Us</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2.5 px-2 hover:bg-white/5 rounded-lg transition-colors text-lg font-medium">About</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2.5 px-2 text-primary font-bold text-lg">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
