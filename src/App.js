import "./App.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "./middlewares/auth";
import Layouts from "./layouts/layouts";
import Footer from "./layouts/footer";
import { UserProvider } from "./context/UserContext";
import NotAuth from "./pages/Auth/notAuth";
import { AdminRoutes } from "./route/index";

function App() {
  const [auth, setAuth] = useState(false);
  const [layout, setLayout] = useState(false);
  const [footer, setFooter] = useState(false);
  const userIsAuthenticated = isAuthenticated();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/forgot-password" ||
      pathname === "/register"
    ) {
      setAuth(true);
      setFooter(false);
      setLayout(false);
    } else {
      setFooter(true);
      setLayout(true);
      if (userIsAuthenticated) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
  }, [pathname, userIsAuthenticated]);

  return (
      <UserProvider>
        {layout && <Layouts />}
        {auth ? <AdminRoutes /> : <NotAuth />}
        {footer && <Footer />}
      </UserProvider>
  );
}

export default App;
