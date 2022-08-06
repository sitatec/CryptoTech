import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Cryptocurrency } from "../models/Cryptocurrency";
import CryptocurrencyPriceHistory from "../models/CryptocurrencyPriceHistory";
import CryptoStats from "../models/CryptoStats";

const BASE_URL = "https://coinranking1.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": "1c6efef265mshefa7a7d1d4b8a40p1394a8jsn9e2fce397884",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const getRequestOptions = (url: string): FetchArgs => ({
  url: url,
  headers: headers,
});

const cryptoService = createApi({
  reducerPath: "cryptoService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCryptoStats: build.query<CryptoStats, void>({
      query: () => getRequestOptions("/stats"),
      transformResponse: (rawResult: { data: CryptoStats }) => {
        return rawResult.data;
      },
    }),
    getCryptocurrencies: build.query<Cryptocurrency[], number | undefined>({
      query: (itemsCount) =>
        getRequestOptions(itemsCount ? `/coins?limit=${itemsCount}` : "/coins"),
      transformResponse: (rawResult: { data: { coins: Cryptocurrency[] } }) => {
        rawResult.data.coins.forEach((coin) => {
          coin.volume24h = (coin as any)["24hVolume"];
          coin.change = Number(coin.change);
        });
        return rawResult.data.coins;
      },
    }),
    getCryptoDetails: build.query<Cryptocurrency, string>({
      query: (cryptoId) => getRequestOptions(`/coin/${cryptoId}`),
      transformResponse: (rawResult: { data: { coin: Cryptocurrency } }) => {
        return rawResult.data.coin;
      },
    }),
    getCryptoPriceHistory: build.query<
      CryptocurrencyPriceHistory,
      { cryptoId: string; timePeriod: string }
    >({
      query: ({ cryptoId, timePeriod }) =>
        getRequestOptions(`/coin/${cryptoId}/history?timePeriod=${timePeriod}`),
      transformResponse: (rawResult: { data: CryptocurrencyPriceHistory }) => {
        return rawResult.data;
      },
    }),
  }),
});

export const {
  useGetCryptoStatsQuery,
  useGetCryptocurrenciesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoPriceHistoryQuery,
} = cryptoService;

export default cryptoService;
