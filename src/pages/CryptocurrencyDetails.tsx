import { Col, InputNumber, Row, Select, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoChart, Loader } from "../components";
import { Cryptocurrency } from "../models/Cryptocurrency";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoPriceHistoryQuery,
} from "../services/cryptoService";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const Option = Select.Option;
const timePeriods = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

const CryptocurrencyDetails = () => {
  const { cryptocurrencyId } = useParams();
  const { data, isLoading } = useGetCryptoDetailsQuery(cryptocurrencyId!);
  const [timePeriod, setTimePeriod] = useState("7d");
  const [samplesCount, setSamplesCount] = useState(20);
  const { data: coinHistory, isLoading: isLoadingPriceHistory } =
    useGetCryptoPriceHistoryQuery({
      cryptoId: cryptocurrencyId!,
      timePeriod,
    });
  const cryptocurrency = data!;
  const [{ stats, additionalStats }, setStats] = useState({
    stats: [] as StatType[],
    additionalStats: [] as StatType[],
  });

  useEffect(() => {
    setStats({
      stats: getStats(cryptocurrency),
      additionalStats: getAdditionalStats(cryptocurrency),
    });
  }, [cryptocurrency]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptocurrency.name} ({cryptocurrency.symbol}) Price
        </Title>
        <p>
          {cryptocurrency.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {timePeriods.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <InputNumber
        style={{ marginLeft: "20px" }}
        min={5}
        max={100}
        defaultValue={samplesCount}
        onChange={setSamplesCount}
      />
      {isLoadingPriceHistory ? (
        "Loading Price history ..."
      ) : (
        <CryptoChart
          coinHistory={coinHistory!}
          currentPrice={millify(cryptocurrency.price)}
          coinName={cryptocurrency.name}
          samplesCount={samplesCount}
          periodFormat={
            timePeriod === "24h" || timePeriod === "3h" ? "time" : "date"
          }
        />
      )}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptocurrency.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptocurrency.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(Stat)}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptocurrency.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {additionalStats.map(Stat)}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptocurrency.name}?
          </Title>
          {HTMLReactParser(cryptocurrency.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptocurrency.name} Links
          </Title>
          {cryptocurrency.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

const Stat: FC<StatType> = ({ icon, title, value }) => (
  <Col className="coin-stats" key={title}>
    <Col className="coin-stats-name">
      <Text>{icon}</Text>
      <Text>{title}</Text>
    </Col>
    <Text className="stats">{value}</Text>
  </Col>
);

interface StatType {
  title: string;
  value: string | number | React.ReactNode;
  icon: JSX.Element;
}

const getStats = (cryptocurrency: Cryptocurrency | undefined): StatType[] => {
  if (cryptocurrency) {
    return [
      {
        title: "Price to USD",
        value: `$ ${cryptocurrency.price && millify(cryptocurrency.price)}`,
        icon: <DollarCircleOutlined />,
      },
      { title: "Rank", value: cryptocurrency.rank, icon: <NumberOutlined /> },
      {
        title: "24h Volume",
        value: `$ ${
          cryptocurrency.volume24h && millify(cryptocurrency.volume24h)
        }`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: "Market Cap",
        value: `$ ${
          cryptocurrency.marketCap && millify(cryptocurrency.marketCap)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "All-time-high",
        value: `$ ${millify(cryptocurrency.allTimeHigh.price)}`,
        icon: <TrophyOutlined />,
      },
    ];
  }
  return [];
};

const getAdditionalStats = (
  cryptocurrency: Cryptocurrency | undefined
): StatType[] => {
  if (cryptocurrency) {
    return [
      {
        title: "Number Of Markets",
        value: cryptocurrency.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: "Number Of Exchanges",
        value: cryptocurrency.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Aprroved Supply",
        value: cryptocurrency.supply.confirmed ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Total Supply",
        value: `$ ${millify(cryptocurrency.supply.total)}`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${millify(cryptocurrency.supply.circulating)}`,
        icon: <ExclamationCircleOutlined />,
      },
    ];
  }
  return [];
};

export default CryptocurrencyDetails;
