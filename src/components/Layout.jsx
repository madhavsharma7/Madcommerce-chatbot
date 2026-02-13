import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import Cart from "./Cart";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <Cart />
            <ChatBot />
        </div>
    );
};

export default Layout;
