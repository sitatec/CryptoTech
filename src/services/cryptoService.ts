import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Cryptocurrency } from "../models/Cryptocurrency";
import CryptoStats from "../models/CryptoStats";

const BASE_URL = "https://coinlore-cryptocurrency.p.rapidapi.com/api";

const headers = {
  "X-RapidAPI-Key": "1c6efef265mshefa7a7d1d4b8a40p1394a8jsn9e2fce397884",
  "X-RapidAPI-Host": "coinlore-cryptocurrency.p.rapidapi.com",
};

const getRequestOptions = (url: string): FetchArgs => ({
  url: url,
  headers: headers,
});

const cryptoService = createApi({
  reducerPath: "cryptoService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCryptoStats: builder.query<CryptoStats, void>({
      query: () => getRequestOptions("/global/"),
      transformResponse: (rawResult: CryptoStats[]) => {
        return rawResult[0];
      },
    }),
    getCryptocurrencies: builder.query<Cryptocurrency[], number | undefined>({
      query: (itemsCount) =>
        getRequestOptions(
          itemsCount ? `/tickers/?limit=${itemsCount}` : "/tickers/"
        ),
      transformResponse: (rawResult:{ data: Cryptocurrency[]}) => {
        return rawResult.data;
      }
    }),
  }),
});

export const { useGetCryptoStatsQuery, useGetCryptocurrenciesQuery } =
  cryptoService;

export default cryptoService;
