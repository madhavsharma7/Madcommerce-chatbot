import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = isSignUp
            ? await signup(email, password)
            : await login(email, password);

        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || "Authentication failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-display text-4xl font-bold text-foreground mb-2 italic">
                        Mad Commerce
                    </h1>
                    <p className="text-muted-foreground">
                        {isSignUp ? "Create your account" : "Welcome back!"}
                    </p>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                    <div className="flex gap-2 mb-8">
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(false);
                                setError("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${!isSignUp
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            <LogIn className="h-4 w-4" />
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(true);
                                setError("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isSignUp
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            <UserPlus className="h-4 w-4" />
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-primary px-4 py-4 font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {isSignUp ? "Create Account" : "Sign In"}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="block w-full text-center mt-8 text-primary hover:text-primary/80 transition-colors font-semibold"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
};

export default Login;
