import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { FC } from "react";
import CryptocurrencyPriceHistory from "../models/CryptocurrencyPriceHistory";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

export interface CryptoChartProps {
  coinHistory: CryptocurrencyPriceHistory;
  currentPrice: string;
  coinName: string;
  periodFormat: "time" | "date";
  samplesCount: number;
}
const { Title } = Typography;

const CryptoChart: FC<CryptoChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
  periodFormat,
  samplesCount,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < Math.min(coinHistory.history.length, samplesCount); i += 1) {
    coinPrice.push(coinHistory.history[i].price);
    const date = new Date(coinHistory.history[i].timestamp * 1000);
    let formatedDate;

    if (periodFormat === "time") {
      formatedDate = date.toLocaleTimeString([],{timeStyle: 'short'});
    } else {
      formatedDate = date.toLocaleDateString();
    }
    coinTimestamp.push(formatedDate);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default CryptoChart;
