import { Card, Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../components";
import { CRYPTOCURRENCIES_ROUTE, NEWS_ROUTE } from "../core/routes";
import { useGetCryptoStatsQuery } from "../services/cryptoService";
import { Cryptocurrencies, News } from "./";

const Title = Typography.Title;

const HomePage = () => {
  const { data: stats, isLoading } = useGetCryptoStatsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Row gutter={[20, 20]} style={{ marginTop: "35px" }}>
        <StatWrapper
          title="Total Cryptocurrencies"
          value={millify(stats!.totalCoins)}
        />
        <StatWrapper
          title="Total Market CAP"
          value={millify(stats!.totalMarketCap)}
        />
        <StatWrapper
          title="Total Markets"
          value={millify(stats!.totalMarkets)}
        />
        <StatWrapper
          title="Total Exchanges"
          value={millify(stats!.totalExchanges)}
        />
        <StatWrapper
          title="Total 24h Volume"
          value={millify(stats!.total24hVolume)}
        />
      </Row>
      <Section
        title="Top Cryptocurrencies"
        route={CRYPTOCURRENCIES_ROUTE}
        content={<Cryptocurrencies simplified />}
      />
      <Section
        title="Latest Crypto News"
        route={NEWS_ROUTE}
        content={<News simplified />}
      />
    </>
  );
};

const StatWrapper: FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Col xs={12} lg={8}>
      <Card>
        <Statistic title={title} value={value} />
      </Card>
    </Col>
  );
};

const Section: FC<{
  title: string;
  route: string;
  content: React.ReactNode;
}> = ({ title, route, content }) => {
  return (
    <>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          {title}
        </Title>
        <Title level={4} className="show-more">
          <Link to={route}>Show More</Link>
        </Title>
      </div>
      {content}
    </>
  );
};

export default HomePage;
