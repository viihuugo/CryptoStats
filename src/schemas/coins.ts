import { z } from "zod";

// API: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en
// JSON to Zod: https://rsinohara.github.io/json-to-zod-react

export const Coin = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string(),
    current_price: z.number(),
    market_cap: z.number(),
    market_cap_rank: z.number(),
    fully_diluted_valuation: z.number(),
    total_volume: z.number(),
    high_24h: z.number(),
    low_24h: z.number(),
    price_change_24h: z.number(),
    price_change_percentage_24h: z.number(),
    market_cap_change_24h: z.number(),
    market_cap_change_percentage_24h: z.number(),
    circulating_supply: z.number(),
    total_supply: z.number(),
    max_supply: z.number(),
    ath: z.number(),
    ath_change_percentage: z.number(),
    ath_date: z.string(),
    atl: z.number(),
    atl_change_percentage: z.number(),
    atl_date: z.string(),
    roi: z.null(),
    last_updated: z.string(),
  });