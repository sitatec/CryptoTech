import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  HeartFilled,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Pagination, Row, Statistic } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCryptocurrenciesQuery } from "../services/cryptoService";
import { SimplifiableComponentPropsType } from "./commonPropsTypes";
import Loader from "./Loader";
import {
  addToFavorites,
  FavoriteCryptosStore,
  removeFromFavorites,
} from "../core/store";

const Cryptocurrencies = ({ simplified }: SimplifiableComponentPropsType) => {
  const [paginationData, setPaginationData] = useState({
    itemsCount: simplified ? 9 : 15,
    currentPage: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetCryptocurrenciesQuery({
    limit: paginationData.itemsCount,
    offset: (paginationData.currentPage - 1) * paginationData.itemsCount,
    search: searchQuery,
  });
  const favoriteCryptos = useSelector(
    (state: { favoriteCryptos: FavoriteCryptosStore }) => state.favoriteCryptos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [paginationData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!simplified && (
        <div className="search-container">
          <Input
            className="search-bar"
            suffix={<SearchOutlined />}
            placeholder="Search Cryptocurrency"
            size="large"
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
        </div>
      )}
      <Row gutter={[24, 24]}>
        {data?.coins?.map((cryptocurrency) => (
          <Col xs={24} sm={12} lg={8} key={cryptocurrency.uuid}>
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
                    {favoriteCryptos.hasOwnProperty(cryptocurrency.uuid) ? (
                      <HeartFilled
                        className="favorite-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(removeFromFavorites(cryptocurrency.uuid));
                        }}
                      />
                    ) : (
                      <HeartOutlined
                        className="favorite-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(addToFavorites(cryptocurrency.toSummary()));
                        }}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </Link>
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

export default Cryptocurrencies;
