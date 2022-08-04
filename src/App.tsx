import { FC } from "react";
import {
  Cryptocurrencies,
  CryptocurrencyDetails,
  Exchanges,
  HomePage,
  Navbar,
  News,
} from "./components";
import "./App.css";
import { Layout, Space, Typography } from "antd";
import { Link, Route, Routes } from "react-router-dom";

const App: FC = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/news" element={<News />} />
              <Route
                path="/cryptocurrencies/:cryptocurrencyId"
                element={<CryptocurrencyDetails />}
              />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5}>
            Crypto <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
