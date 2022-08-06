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
import { Content, Footer, Header } from "antd/lib/layout/layout";

const App: FC = () => {
  return (
    <div className="app">
      <Layout>
        <Header style={{ padding: 0 }}>
          <Navbar />
        </Header>
        <Content className="main-container">
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
        </Content>
        <Footer className="footer">
          <Typography.Title level={5}>
            CryptoTech <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
