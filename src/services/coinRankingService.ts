import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const BASE_URL = "https://coinranking1.p.rapidapi.com";

const headers = {
  'X-RapidAPI-Key': '1c6efef265mshefa7a7d1d4b8a40p1394a8jsn9e2fce397884',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequestOptions = (url: string): FetchArgs => ({url: url, headers: headers})

const coinRankingService = createApi({
  reducerPath: "coinRankingService",
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: (build) => ({
    getCryptoDetails: build.query({
      query: (cryptoId) => createRequestOptions(`/coin/${cryptoId}`)
    })
  })
});

export const {useGetCryptoDetailsQuery} = coinRankingService;
export default coinRankingService;