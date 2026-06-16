import Footer from "../../shared/components/Footer";
import Navbar from "../../shared/components/Navbar";
import ChatbotFloating from "../../shared/components/chatbot/ChatbotFloating";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      <Footer />

      <ChatbotFloating />
    </div>
  );
}