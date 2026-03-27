import { Outlet, NavLink } from "react-router";
import { PATHS } from "../router/paths";

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
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <aside style={{ borderRight: "1px solid #e5e7eb", padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Panel privado</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <NavLink to={PATHS.PROFILE} style={linkStyle}>
            Perfil
          </NavLink>
          <NavLink to={PATHS.CART} style={linkStyle}>
            Carrito
          </NavLink>
          <NavLink to={PATHS.CHECKOUT} style={linkStyle}>
            Checkout
          </NavLink>
        </nav>
      </aside>

      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}