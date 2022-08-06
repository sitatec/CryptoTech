import { Card, Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptoStatsQuery } from "../services/cryptoService";
import { Cryptocurrencies, News } from "./";
import Loader from "./Loader";

const Title = Typography.Title;

const HomePage = () => {
  const { data: stats, isLoading } = useGetCryptoStatsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Title level={2} style={{ marginTop: "15px" }}>
        Global Crypto Stats
      </Title>
      <Row gutter={[20, 20]}>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title="Total Cryptocurrencies"
              value={millify(stats!.totalCoins)}
            />
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title="Total Market CAP"
              value={millify(stats!.totalMarketCap)}
            />
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title="Total Markets"
              value={millify(stats!.totalMarkets)}
            />
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title="Total Exchanges"
              value={millify(stats!.totalExchanges)}
            />
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Statistic
              title="Total 24h Volume"
              value={millify(stats!.total24hVolume)}
            />
          </Card>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top Cryptocurrencies
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
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
