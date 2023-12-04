import { Route, Routes } from "react-router";
import "./App.scss";
import Footer from "./common/components/footer/Footer";
import Header from "./common/components/header/Header";
import Wrapper from "./common/components/wrapper/Wrapper";
import LoginPage from "./modules/auth/pages/LoginPage";
import ProfilePage from "./modules/profile/pages/ProfilePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="*" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
