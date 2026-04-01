import { Outlet, NavLink } from "react-router-dom";
import { PATHS } from "../router/paths";
import ThemeToggle from "../../shared/components/ThemeToggle";

const linkStyle = ({ isActive }) => ({
  padding: "0.75rem 1rem",
  borderRadius: "8px",
  textDecoration: "none",
  color: isActive ? "#111827" : "#4b5563",
  background: isActive ? "#f3f4f6" : "transparent",
  fontWeight: isActive ? 600 : 400,
});

export default function PrivateLayout() {
  return (
    <>
      <Navbar />

      <div className="grid p-3">
        <main className="p-2 w-full">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}