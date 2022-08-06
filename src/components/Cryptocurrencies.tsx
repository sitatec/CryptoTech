import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Input, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cryptocurrency } from "../models/Cryptocurrency";
import { useGetCryptocurrenciesQuery } from "../services/cryptoService";
import { SimplifiableComponentPropsType } from "./commonPropsTypes";

const Cryptocurrencies = ({ simplified }: SimplifiableComponentPropsType) => {
  const itemsCount = simplified ? 10 : 100;
  const { data, isLoading } = useGetCryptocurrenciesQuery(itemsCount);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] = useState<
    Cryptocurrency[]
  >([]);

  useEffect(() => {
    const filteredCurrencies = data?.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCurrencies(filteredCurrencies!);
  }, [searchQuery, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[24, 24]}>
        {filteredCurrencies?.map((cryptocurrency) => (
          <Col xs={24} sm={12} lg={6} key={cryptocurrency.uuid}>
            <Link to={`/cryptocurrencies/${cryptocurrency.uuid}`}>
              <Card
                title={`${cryptocurrency.rank}. ${cryptocurrency.name}`}
                extra={
                  <img
                    alt={cryptocurrency.name}
                    src={cryptocurrency.iconUrl}
                    width="40"
                  />
                }
                hoverable
              >
                <div className="crypto-card-body">
                  <div className="crypto-card-stats">
                    <p>Price: {millify(Number(cryptocurrency.price))}</p>
                    <p>
                      Market Cap: {millify(Number(cryptocurrency.marketCap))}
                    </p>
                    <p>
                      Daily Volume: {millify(Number(cryptocurrency.volume24h))}
                    </p>
                  </div>
                  <div className="crypto-card-daily-change">
                    <Statistic
                      value={cryptocurrency.change}
                      suffix="%"
                      precision={2}
                      prefix={
                        cryptocurrency.change > 0 ? (
                          <ArrowUpOutlined />
                        ) : (
                          <ArrowDownOutlined />
                        )
                      }
                      valueStyle={{
                        color:
                          cryptocurrency.change > 0 ? "#00b053" : "#eb0a25",
                        fontSize: 17,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
