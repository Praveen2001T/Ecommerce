import "./App.css";
import Navbar from "./Components/Navbar/NavbarContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import MenBanner from "./Components/Assets/banner_mens.png";
import WomenBanner from "./Components/Assets/banner_women.png";
import KidsBanner from "./Components/Assets/banner_kids.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/men"
            element={<ShopCategory banner={MenBanner} category={"men"} />}
          />
          <Route
            path="/women"
            element={<ShopCategory banner={WomenBanner} category={"women"} />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={KidsBanner} category={"kid"} />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
