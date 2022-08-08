
import "../App.css";
import { Layout, Space, Typography } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { Navbar } from ".";
import { FC } from "react";
import {
  CRYPTOCURRENCIES_ROUTE,
  CRYPTOCURRENCY_DETAILS_ROUTE,
  EXCHANGES_ROUTE,
  FAVORITE_CRYPTOCURRENCIES_ROUTE,
  HOME_ROUTE,
  NEWS_ROUTE,
} from "../core/routes";
import {
  Cryptocurrencies,
  CryptocurrencyDetails,
  Exchanges,
  FavoriteCryptocurrencies,
  HomePage,
  News,
} from "../pages";

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header style={{ padding: 0, backgroundColor: "white" }}>
        <Navbar />
      </Header>
      <Content className="main-container">
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={CRYPTOCURRENCIES_ROUTE} element={<Cryptocurrencies />} />
          <Route path={EXCHANGES_ROUTE} element={<Exchanges />} />
          <Route path={NEWS_ROUTE} element={<News />} />
          <Route
            path={FAVORITE_CRYPTOCURRENCIES_ROUTE}
            element={<FavoriteCryptocurrencies />}
          />
          <Route
            path={CRYPTOCURRENCY_DETAILS_ROUTE}
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
          <Link to={HOME_ROUTE}>Home</Link>
          <Link to={EXCHANGES_ROUTE}>Exchanges</Link>
          <Link to={NEWS_ROUTE}>News</Link>
        </Space>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
