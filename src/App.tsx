import { Route, Routes, useRoutes } from "react-router";
import Footer from "./common/components/footer/Footer";
import Header from "./common/components/header/Header";
import PrivateRoute from "./modules/auth/components/PrivateRoute";
import { routesConfig } from "./core/routes";

function App() {
  let routes = useRoutes(routesConfig);
  return (
    <>
      <Header />
      {routes}
      <Footer />
    </>
  );
}

export default App;
