export interface CryptoExchange {
  rank: number;
  uuid: string;
  verified: boolean;
  recommended: boolean;
  numberOfMarkets: number;
  name: string;
  iconUrl: string;
  volume24h: number;
  price: number;
  btcPrice: number;
}