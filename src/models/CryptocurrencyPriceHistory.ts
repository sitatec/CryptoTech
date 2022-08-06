import { PriceByPeriod } from "./Cryptocurrency";

export default interface CryptocurrencyPriceHistory {
  change: number,
  history: PriceByPeriod[]
}