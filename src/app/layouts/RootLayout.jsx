import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../shared/context/ThemeContext";

export default function RootLayout() {
  return (
      <main>
        <Outlet />
      </main>
  );
}
