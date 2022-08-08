import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Cryptocurrency } from "../models/Cryptocurrency";
import CryptocurrencyPriceHistory from "../models/CryptocurrencyPriceHistory";
import { CryptoExchange } from "../models/CryptoExchange";
import CryptoStats from "../models/CryptoStats";

type EndpointBuilderType = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  never,
  "cryptoService"
>;

interface CryptoCurrenciesListResponse {
  coins: Cryptocurrency[];
  stats: CryptoStats;
}

const getRequestOptions = (url: string): FetchArgs => ({
  url: url,
  headers: headers,
});

const cryptoStatsEndpoint = (build: EndpointBuilderType) =>
  build.query<CryptoStats, void>({
    query: () => getRequestOptions("/stats"),
    transformResponse: (rawResult: { data: CryptoStats }) => {
      return rawResult.data;
    },
  });

const cryptocurrenciesEndpoint = (build: EndpointBuilderType) =>
  build.query<
    CryptoCurrenciesListResponse,
    { limit: number; offset?: number; search?: string }
  >({
    query: ({ limit, offset = 0, search = "" }) =>
      getRequestOptions(
        `/coins?limit=${limit}&offset=${offset}&search=${search}`
      ),
    transformResponse: (rawResult: { data: CryptoCurrenciesListResponse }) => {
      rawResult.data.coins.forEach(adaptCryptocurrencyData);
      return rawResult.data;
    },
  });

const cryptoDetailsEndpoint = (build: EndpointBuilderType) =>
  build.query<Cryptocurrency, string>({
    query: (cryptoId) => getRequestOptions(`/coin/${cryptoId}`),
    transformResponse: (rawResult: { data: { coin: Cryptocurrency } }) => {
      const coin = rawResult.data.coin;
      adaptCryptocurrencyData(coin);
      return coin;
    },
  });

const cryptoPriceHistory = (build: EndpointBuilderType) =>
  build.query<
    CryptocurrencyPriceHistory,
    { cryptoId: string; timePeriod: string }
  >({
    query: ({ cryptoId, timePeriod }) =>
      getRequestOptions(`/coin/${cryptoId}/history?timePeriod=${timePeriod}`),
    transformResponse: (rawResult: { data: CryptocurrencyPriceHistory }) => {
      return rawResult.data;
    },
  });

const bitcoinExchangeEndpoint = (build: EndpointBuilderType) =>
  build.query<CryptoExchange[], string>({
    query: (searchTerm) =>
      getRequestOptions(
        `/coin/Qwsogvtv82FCd/exchanges?search=${searchTerm}&limit=100`
      ),
    transformResponse: (rawResult: {
      data: { exchanges: CryptoExchange[] };
    }) => {
      rawResult.data.exchanges.forEach((exchange) => {
        exchange.volume24h = Number((exchange as any)["24hVolume"]);
        exchange.price = Number(exchange.price);
      });
      return rawResult.data.exchanges;
    },
  });

const adaptCryptocurrencyData = (crypto: Cryptocurrency) => {
  crypto.volume24h = (crypto as any)["24hVolume"];
  crypto.change = Number(crypto.change);
  crypto.toSummary = () => ({
    uuid: crypto.uuid,
    name: crypto.name,
    iconUrl: crypto.iconUrl,
  });
}

const BASE_URL = "https://coinranking1.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": "1c6efef265mshefa7a7d1d4b8a40p1394a8jsn9e2fce397884",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const cryptoService = createApi({
  reducerPath: "cryptoService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (endpointBuilder) => ({
    getCryptoStats: cryptoStatsEndpoint(endpointBuilder),
    getCryptocurrencies: cryptocurrenciesEndpoint(endpointBuilder),
    getCryptoDetails: cryptoDetailsEndpoint(endpointBuilder),
    getCryptoPriceHistory: cryptoPriceHistory(endpointBuilder),
    getBitcoinExchanges: bitcoinExchangeEndpoint(endpointBuilder),
  }),
});

export const {
  useGetCryptoStatsQuery,
  useGetCryptocurrenciesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoPriceHistoryQuery,
  useGetBitcoinExchangesQuery,
} = cryptoService;

export default cryptoService;
