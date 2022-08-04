import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsService";
import { SimplifiableComponentPropsType } from "./commonPropsTypes";
import newsImage from "../images/news.png";
import { FC, useState } from "react";
import moment from "moment";
import { useGetCryptocurrenciesQuery } from "../services/cryptoService";

const { Title, Text } = Typography;
const Option = Select.Option;

const News: FC<SimplifiableComponentPropsType> = ({ simplified }) => {
  const itemsCount = simplified ? 6 : 70;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isLoading } = useGetCryptoNewsQuery({
    newsCategory,
    itemsCount,
  });
  const { data: cryptosList } = useGetCryptocurrenciesQuery(100);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
          className="news-category-selector"
            showSearch
            placeholder="Select a Cryptocurrency"
            optionFilterProp="children"
            onChange={setNewsCategory}
            filterOption={(input, option) => (option?.value as string).toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="Cryptocurrency" key="Cryptocurrency">All Cryptocurrencies</Option>
            {cryptosList?.map(crypto => (<Option value={crypto.name} key={crypto.name}>{crypto.name}</Option>))}
          </Select>
        </Col>
      )}
      {cryptoNews?.map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.url}>
          <a href={news.url} target="_blank" rel="noreferrer">
            <Card hoverable>
              <div className="news-card-header">
                <Title level={4}>{news.name}</Title>
                <img
                  src={news.image?.thumbnail?.contentUrl || newsImage}
                  alt={news.name}
                  height={100}
                  width={100}
                />
              </div>
              <Text>
                {news.description.length > 200
                  ? `${news.description.substring(0, 200)}...`
                  : news.description}
              </Text>

              <div className="news-card-footer">
                <div className="news-provider-info-container">
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    alt="News Provider"
                  />
                  <Text className="news-provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>{moment(news.datePublished).startOf("s").fromNow()}</Text>
              </div>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  );
};

export default News;
