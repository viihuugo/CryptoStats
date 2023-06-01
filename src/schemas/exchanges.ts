import { z } from "zod";

// API: https://api.coingecko.com/api/v3/exchanges
// JSON to Zod: https://rsinohara.github.io/json-to-zod-react

export const Exchanges = z.object({
    id: z.string(),
    name: z.string(),
    year_established: z.number(),
    country: z.string(),
    description: z.string(),
    url: z.string(),
    image: z.string(),
    has_trading_incentive: z.boolean(),
    trust_score: z.number(),
    trust_score_rank: z.number(),
    trade_volume_24h_btc: z.number(),
    trade_volume_24h_btc_normalized: z.number(),
  });