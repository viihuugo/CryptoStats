'use client';
import { Market } from "@/schemas/market";
import Link from "next/link";
import { z } from "zod";

export default async function Navbar(){

    const res = await fetch('https://api.coingecko.com/api/v3/global', { next: { revalidate: 10 } });
    const data: z.infer<typeof Market> = await res.json();    
    const coin = data.data.active_cryptocurrencies;
    const totalexchanges = data.data.markets;
    const marketcap = data.data.total_market_cap.usd;
    const formattedMarketCap = marketcap.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    const marketCapChange = data.data.market_cap_change_percentage_24h_usd;
    const btc = data.data.market_cap_percentage.btc;
    const eth = data.data.market_cap_percentage.eth;

    return (
     <>
        <div className="h-[120px] w-screen border-b border-[#646464]">
            <div className="h-[50px] w-full border-b border-[#646464] text-xs flex items-center pl-12 max-lg:pl-4">
                <div className="text-gray-300 mr-3">Coins: <span className="text-green-400">{coin}</span></div>
                <div className="text-gray-300 mr-3">Exchanges: <span className="text-green-400">{totalexchanges}</span></div>
                <div className="text-gray-200 mr-3">Market Cap: <span className="text-blue-400">{formattedMarketCap}</span>{ marketCapChange > 0 ? <span className="text-green-400 ml-2">{marketCapChange.toFixed(2)}%</span> : <span className="text-red-400 ml-2">{marketCapChange.toFixed(2)}%</span>}</div>
                <div className="text-gray-300 mr-3 max-md:hidden">Dominance: <span className="text-green-400">BTC {btc.toFixed(2)}%</span><span className="text-green-400 ml-3">ETH {eth.toFixed(2)}%</span></div>
                
            </div>
            <div className="h-[70px] w-full flex items-center pl-12 max-lg:pl-4">
                <div className="flex items-center">
                    <div className="flex items-center max-[450px]:hidden">
                        <svg height="40" width="40">
                            <circle cx="15" cy="20" r="15" fill="#4ade80" />
                        </svg>
                    </div>                
                    <div className="text-white text-2xl font-medium max-[450px]:text-xl"><Link href='/'>CryptoStats</Link></div>
                    <div className="text-white text-base font-medium ml-6">
                        <span className="mr-3"><Link href='/'>Cryptocuriencies</Link></span>
                        <span className="max-[450px]:block max-[450px]:pt-2"><Link href='/exchanges'>Exchanges</Link></span>
                    </div>
                </div>
                
            </div>
          
        </div>
     </>
    )
  }
  