import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptoStatsQuery } from "../services/cryptoService";
import { Cryptocurrencies, News } from "./";

const Title = Typography.Title;

const HomePage = () => {
  const { data: stats, isLoading } = useGetCryptoStatsQuery();
  
  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <Title>Global Crypto Stats</Title>
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(stats!.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market CAP" value={millify(stats!.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(stats!.totalMarkets)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(stats!.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(stats!.total24hVolume)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
