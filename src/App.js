import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateShop from "./Pages/CreateShop/CreateShop";
import ShopList from "./Pages/ShopList/ShopList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateShop />} />
        <Route path="/shopList" element={<ShopList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
