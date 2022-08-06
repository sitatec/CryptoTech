import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import millify from "millify";
import { FC, useState } from "react";
import { useGetBitcoinExchangesQuery } from "../services/cryptoService";

interface ExchangesTableDataType {
  key: string;
  exchanges: { name: string; rank: number; iconUrl: string };
  price: number;
  trade: number;
  recommended: boolean;
}

const Title = Typography.Title;

const Exchanges: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: exchanges, isLoading } =
    useGetBitcoinExchangesQuery(searchTerm);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const tableColumns: ColumnType<ExchangesTableDataType>[] = [
    {
      title: "Exchanges",
      key: "exchanges",
      dataIndex: "exchanges",
      render: (exchange) => (
        <div className="flex" >
          <Title level={5}>{exchange.rank}</Title>
          <img className="exchange-img" src={exchange.iconUrl} alt={exchange.name} width={26} height={26} />
          <Title level={5}>{exchange.name}</Title>
        </div>
      ),
    },
    {
      title: "BTC price",
      key: "price",
      dataIndex: "price",
      responsive: ["lg"],
      render: price => <Title level={5}>{`$ ${millify(price)}`}</Title>,
    },
    {
      title: "24h trade volume",
      key: "trade",
      dataIndex: "trade",
      responsive: ["lg"],
      render: trade => <Title level={5}>{`$ ${millify(trade)}`}</Title>,
    },
    {
      title: "Recommended",
      key: "recommended",
      dataIndex: "recommended",
      render: (recommended) =>
        recommended ? (
          <CheckCircleOutlined style={{color: "#07ef74", fontSize: "20px"}}  />
        ) : (
          <MinusCircleOutlined style={{color: "#42639f", fontSize: "20px"}} />
        ),
    },
  ];

  const tableData = exchanges!.map<ExchangesTableDataType>((exchange) => ({
    key: exchange.uuid,
    exchanges: {
      name: exchange.name,
      iconUrl: exchange.iconUrl,
      rank: exchange.rank,
    },
    price: exchange.price,
    trade: exchange.volume24h,
    recommended: exchange.recommended,
  }));

  return (
    <><div className="search-container">
      <Input
        className="search-bar"
        suffix={<SearchOutlined />}
        placeholder="Find an Exchange"
        size="large"
        onChange={e => setSearchTerm(e.target.value)} />
    </div><Table columns={tableColumns} dataSource={tableData} /></>
  );
};

export default Exchanges;
