import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptocurrencySummary } from "../models/Cryptocurrency";
import cryptoNewsService from "../services/cryptoNewsService";
import cryptoService from "../services/cryptoService";

export type FavoriteCryptosStore = Record<string, CryptocurrencySummary>;

const initialState: FavoriteCryptosStore = {};

const favoriteCryptosSlice = createSlice({
  name: "favorite-cryptos",
  initialState: initialState,
  reducers: {
    addToFavorites(state: FavoriteCryptosStore, action: PayloadAction<CryptocurrencySummary>) {
      state[action.payload.uuid] = action.payload;
    },
    removeFromFavorites(
      state: FavoriteCryptosStore,
      action: PayloadAction<string>
    ) {
      delete state[action.payload];
    },
  },
});

export const { addToFavorites, removeFromFavorites } =
  favoriteCryptosSlice.actions;

const store = configureStore({
  reducer: {
    [cryptoService.reducerPath]: cryptoService.reducer,
    [cryptoNewsService.reducerPath]: cryptoNewsService.reducer,
    favoriteCryptos: favoriteCryptosSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
