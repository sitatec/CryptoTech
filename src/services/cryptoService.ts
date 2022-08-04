import {createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://coinlore-cryptocurrency.p.rapidapi.com/api';

const headers = {
  'X-RapidAPI-Key': '1c6efef265mshefa7a7d1d4b8a40p1394a8jsn9e2fce397884',
  'X-RapidAPI-Host': 'coinlore-cryptocurrency.p.rapidapi.com'
}

const getRequestOptions = (url: string): FetchArgs => ({url: url, headers: headers});

export const CryptoService = createApi({
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    getCryptoStats: builder.query({
      query: () => getRequestOptions('/global/')
    })
  })
})

export const {
  useGetCryptoStatsQuery,
} = CryptoService;

export default CryptoService;