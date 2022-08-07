import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import cryptoNewsService from "../services/cryptoNewsService";
import cryptoService from "../services/cryptoService";

export type FavoriteCryptosStore = Record<string, undefined>;

const initialState: FavoriteCryptosStore = {};

const favoriteCryptosSlice = createSlice({
  name: "favorite-cryptos",
  initialState: initialState,
  reducers: {
    addToFavorites(state: FavoriteCryptosStore, action: PayloadAction<string>) {
      // We need to store only the crypto's ID but using a simple list would
      // make O(n * m) Time Complexity (n being the number of favorites and m the number of cryptos being rendered)
      // So we are using a map to have constant time lookup.
      state[action.payload] = undefined;
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
