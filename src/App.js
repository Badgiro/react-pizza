import { useState } from "react";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";


function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
