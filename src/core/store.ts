import { configureStore } from "@reduxjs/toolkit";
import cryptoNewsService from "../services/cryptoNewsService";
import cryptoService from "../services/cryptoService";

export default configureStore({
  reducer: {
    [cryptoService.reducerPath]: cryptoService.reducer,
    [cryptoNewsService.reducerPath]: cryptoNewsService.reducer,
  },
});
