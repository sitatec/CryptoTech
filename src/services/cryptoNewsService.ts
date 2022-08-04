import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import CryptoNews from "../models/CryptoNews";

const BASE_URL = "https://bing-news-search1.p.rapidapi.com/news";

const headers = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "1c6efef265mshefa7a7d1d4b8a40p1394a8jsn9e2fce397884",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const createRequestOptions = (url: string): FetchArgs => ({
  url: url,
  headers: headers,
});

const cryptoNewsService = createApi({
  reducerPath: "cryptoNewsService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCryptoNews: build.query<CryptoNews[], GetCryptoNewsEndpointArgs>({
      query: ({ newsCategory, itemsCount }) =>
        createRequestOptions(
          `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${itemsCount}`
        ),
      transformResponse: (rawResult: { value: CryptoNews[] }) => {
        return rawResult.value;
      },
    }),
  }),
});

export interface GetCryptoNewsEndpointArgs {
  newsCategory: string;
  itemsCount: number;
}

export const { useGetCryptoNewsQuery } = cryptoNewsService;

export default cryptoNewsService;
