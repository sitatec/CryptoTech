import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptoStatsQuery } from "../services/cryptoService";
import { Cryptocurrencies, News } from "./";

const Title = Typography.Title;

const HomePage = () => {
  const { data, isLoading } = useGetCryptoStatsQuery({});
  console.log(JSON.stringify(data));
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const stats = data[0];

  return (
    <>
      <Title>Global Crypto Stats</Title>
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(stats.coins_count)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="MCAP Change" value={millify(stats.mcap_change)} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Active Markets"
            value={millify(stats.active_markets)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total MCAP" value={millify(stats.total_mcap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Volume" value={millify(stats.total_volume)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News />
    </>
  );
};

export default HomePage;
