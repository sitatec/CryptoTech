import { configureStore } from "@reduxjs/toolkit";
import CryptoService from "../services/cryptoService";

export default configureStore({
  reducer: {
    [CryptoService.reducerPath]: CryptoService.reducer,
  },
});
