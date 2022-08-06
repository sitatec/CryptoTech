export interface Cryptocurrency {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Link[];
  supply: Supply;
  volume24h: number;
  marketCap: number;
  price: number;
  btcPrice: string;
  change: number;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  sparkline: any[];
  allTimeHigh: PriceByPeriod;
}

export interface Link {
  name: string;
  url: string;
  type: string;
}

export interface Supply {
  confirmed: boolean;
  circulating: number;
  total: number;
}

export interface PriceByPeriod {
  price: number;
  timestamp: number;
}
