import { Card, Col, Pagination, Row, Statistic } from "antd";
import millify from "millify";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCryptocurrenciesQuery } from "../services/cryptoService";
import { SimplifiableComponentPropsType } from "./common/propsTypes";
import { Loader } from "../components";
import SearchBar from "../components/SearchBar";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import {
  addToFavorites,
  FavoriteCryptosStore,
  removeFromFavorites,
} from "../core/store";
import { Cryptocurrency } from "../models/Cryptocurrency";

const stateSelector = (state: { favoriteCryptos: FavoriteCryptosStore }) => {
  return state.favoriteCryptos;
};

const Cryptocurrencies: FC<SimplifiableComponentPropsType> = ({
  simplified,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const favoriteCryptos = useSelector(stateSelector);
  const [paginationData, setPaginationData] = useState({
    itemsCount: simplified ? 9 : 15,
    currentPage: 1,
  });
  const { data, isLoading } = useGetCryptocurrenciesQuery({
    limit: paginationData.itemsCount,
    offset: (paginationData.currentPage - 1) * paginationData.itemsCount,
    search: searchQuery,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [paginationData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!simplified && (
        <SearchBar
          placeholder="Search Cryptocurrency"
          onChange={(e) => {
            if (paginationData.currentPage > 1) {
              setPaginationData({
                itemsCount: paginationData.itemsCount,
                currentPage: 1,
              });
            }
            setSearchQuery(e.target.value);
          }}
        />
      )}
      <Row gutter={[24, 24]}>
        {data?.coins?.map((cryptocurrency) => (
          <Col xs={24} sm={12} lg={8} key={cryptocurrency.uuid}>
            <CryptocurrencyCard
              cryptocurrency={cryptocurrency}
              isFavorite={favoriteCryptos.hasOwnProperty(cryptocurrency.uuid)}
              onAddToFavorite={(e) => {
                e.preventDefault();
                dispatch(addToFavorites(cryptocurrency.toSummary()));
              }}
              onRemoveFromFavorite={(e) => {
                e.preventDefault();
                dispatch(removeFromFavorites(cryptocurrency.uuid));
              }}
            />
          </Col>
        ))}
      </Row>
      {!simplified && (
        <Pagination
          style={{ float: "right", marginTop: "25px" }}
          current={paginationData.currentPage}
          total={data?.stats.totalCoins}
          pageSize={paginationData.itemsCount}
          onChange={(page: number, pageSize: number) => {
            setPaginationData({ itemsCount: pageSize, currentPage: page });
          }}
        />
      )}
    </>
  );
};

interface CryptocurrencyCardProps {
  cryptocurrency: Cryptocurrency;
  isFavorite: boolean;
  onAddToFavorite: React.MouseEventHandler<HTMLSpanElement> | undefined;
  onRemoveFromFavorite: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

const CryptocurrencyCard: FC<CryptocurrencyCardProps> = ({
  cryptocurrency,
  isFavorite,
  onAddToFavorite,
  onRemoveFromFavorite,
}) => {
  return (
    <Link to={`/cryptocurrencies/${cryptocurrency.uuid}`}>
      <Card
        title={`${cryptocurrency.rank}. ${cryptocurrency.name}`}
        extra={
          <img
            alt={cryptocurrency.name}
            src={cryptocurrency.iconUrl}
            width="40"
            height="40"
          />
        }
        hoverable
      >
        <div className="crypto-card-body">
          <div className="crypto-card-stats">
            <p>Price: {millify(Number(cryptocurrency.price))}</p>
            <p>Market Cap: {millify(Number(cryptocurrency.marketCap))}</p>
            <p>Daily Volume: {millify(Number(cryptocurrency.volume24h))}</p>
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
                color: cryptocurrency.change > 0 ? "#00b053" : "#eb0a25",
                fontSize: 17,
              }}
            />
            {isFavorite ? (
              <HeartFilled
                className="favorite-icon"
                onClick={onRemoveFromFavorite}
              />
            ) : (
              <HeartOutlined
                className="favorite-icon"
                onClick={onAddToFavorite}
              />
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Cryptocurrencies;
