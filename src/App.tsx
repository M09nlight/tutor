import { Route, Routes } from "react-router";
import Footer from "./common/components/footer/Footer";
import Header from "./common/components/header/Header";
import PrivateRoute from "./modules/auth/components/PrivateRoute";
import { routes } from "./core/routes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {Object.values(routes).map((route, idx) => {
          if (route.private) {
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <PrivateRoute>
                    <route.Element />
                  </PrivateRoute>
                }
              />
            );
          }
          return (
            <Route key={idx} path={route.path} element={<route.Element />} />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
