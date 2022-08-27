import { Button, Card, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteCryptosStore, removeFromFavorites } from "../core/store";

const FavoriteCryptocurrencies = () => {
  const favoriteCryptocurrencies = useSelector(
    (state: { favoriteCryptos: FavoriteCryptosStore }) => state.favoriteCryptos
  );
  const dispatch = useDispatch();

  return (
    <div style={{ height: "80vh" }} >
      {Object.values(favoriteCryptocurrencies).length === 0 ? (
        <Typography.Title level={4} className="empty-favorites-message">
          You don't have Favorite Cryptocurrencies yet
        </Typography.Title>
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: "30px" }}>
          {Object.values(favoriteCryptocurrencies).map((cryptocurrency) => (
            <Col xs={24} sm={12} lg={8} key={cryptocurrency.uuid}>
              <Card>
                <div className="favorite-crypto-card-content">
                  <div className="favorite-crypto-info">
                    <Typography.Title level={5}>
                      <img
                        style={{ marginRight: 10 }}
                        alt={cryptocurrency.name}
                        src={cryptocurrency.iconUrl}
                        width="32"
                        height="32"
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
      )}
    </div>
  );
};

export default FavoriteCryptocurrencies;
