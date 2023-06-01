import { Currency } from "@/schemas/crypto";
import { z } from "zod";

function removeTags(txt : string) {
    var cleanText = txt.replace(/<[^>]*>/g, '');
    return cleanText;
}

export async function coinData(crypto: any): Promise<any> {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`, { next: { revalidate: 10 } });
    const data: z.infer<typeof Currency> = await res.json();

    const rank = data.market_cap_rank;
    const name = data.name;
    const symbol = data.symbol;
    const price = data.market_data.current_price.usd;
    const priceChange = data.market_data.price_change_24h;
    const marketCap = data.market_data.market_cap.usd;
    const tradingVolume = data.market_data.total_volume.usd;
    const valuation = data.market_data.fully_diluted_valuation.usd;
    const supply = data.market_data.circulating_supply;
    const logo = data.image.small;
    const ath = data.market_data.ath.usd;
    const athPercentage = data.market_data.ath_change_percentage.usd;
    const athDate = data.market_data.ath_date.usd;
    const athFormatedDate = new Date(athDate);
    const atl = data.market_data.atl.usd;
    const atlPercentage = data.market_data.atl_change_percentage.usd;
    const atlDate = data.market_data.atl_date.usd;
    const atlFormatedDate = new Date(atlDate);
    const description = data.description.en;
    const cleanDescription = removeTags(description);
    const categories = data.categories;
    const high24 = data.market_data.high_24h.usd;
    const low24 = data.market_data.low_24h.usd;
    const weekChangePerc = data.market_data.price_change_percentage_7d;
    const twoWeekChangePerc = data.market_data.price_change_percentage_14d;
    const monthChangePerc = data.market_data.price_change_percentage_30d;
    const twoMonthChangePerc = data.market_data.price_change_percentage_60d;
    const halfChangePerc = data.market_data.price_change_percentage_200d;
    const yearChangePerc = data.market_data.price_change_percentage_1y;
    const totalSupply = data.market_data.total_supply;
    const maxSupply = data.market_data.max_supply;
    const site = data.links.homepage[0];
    const domain = new URL(site).hostname;

    return {
        rank,
        name,
        symbol,
        price,
        priceChange,
        marketCap,
        tradingVolume,
        valuation,
        supply,
        logo,
        ath,
        athPercentage,
        athFormatedDate,
        atl,
        atlPercentage,
        atlFormatedDate,
        cleanDescription,
        categories,
        high24,
        low24,
        weekChangePerc,
        twoWeekChangePerc,
        monthChangePerc,
        twoMonthChangePerc,
        halfChangePerc,
        yearChangePerc,
        totalSupply,
        maxSupply,
        site,
        domain
    }

}