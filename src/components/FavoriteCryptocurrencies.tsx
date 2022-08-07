import { HeartFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteCryptosStore, removeFromFavorites } from "../core/store";

const FavoriteCryptocurrencies = () => {
  const favoriteCryptocurrencies = useSelector(
    (state: { favoriteCryptos: FavoriteCryptosStore }) => state.favoriteCryptos
  );
  const dispatch = useDispatch();

  return (
    <div style={{ height: "80vh" }}>
      <Row gutter={[24, 24]} style={{ marginTop: "30px" }}>
        {Object.values(favoriteCryptocurrencies).map((cryptocurrency) => (
          <Col xs={24} sm={8} lg={6} key={cryptocurrency.uuid}>
            <Card>
              <div className="favorite-crypto-card-content">
                <div className="favorite-crypto-info">
                  <Typography.Title level={4}>
                    <img
                    style={{marginRight: 8}}
                      alt={cryptocurrency.name}
                      src={cryptocurrency.iconUrl}
                      width="40"
                      height="40"
                    />
                    {cryptocurrency.name}
                  </Typography.Title>
                </div>
                <Button
                  ghost
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeFromFavorites(cryptocurrency.uuid));
                  }}
                >
                  Remove
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoriteCryptocurrencies;
