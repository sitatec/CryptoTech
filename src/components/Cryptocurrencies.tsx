import { Card, Col, Image, Input, Row } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cryptocurrency } from "../models/Cryptocurrency";
import { useGetCryptocurrenciesQuery } from "../services/cryptoService";

type CryptocurrenciesPropsType = {
  simplified?: boolean;
};

const Cryptocurrencies = ({ simplified }: CryptocurrenciesPropsType) => {
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
          <Col xs={24} sm={12} lg={6} key={cryptocurrency.id}>
            <Link to={`/cryptocurrencies/${cryptocurrency.id}`}>
              <Card
                title={`${cryptocurrency.rank}. ${cryptocurrency.name}`}
                extra={
                  <Image
                    src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/icon/${cryptocurrency.symbol.toLowerCase()}.png`}
                  />
                }
                hoverable
              >
                <p>Price: {millify(Number(cryptocurrency.price_usd))}</p>
                <p>
                  Market Cap: {millify(Number(cryptocurrency.market_cap_usd))}
                </p>
                <p>
                  Daily Change:{" "}
                  {millify(Number(cryptocurrency.percent_change_24h))}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
