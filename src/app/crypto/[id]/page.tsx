import Navbar from "@/app/components/navbar";
import Image from "next/image";
import { z } from "zod";
import { Currency } from "@/schemas/crypto";
import Footer from "@/app/components/footer";
import Calculator from "@/app/calculator/calculator";

function removeTags(txt : string) {
    var cleanText = txt.replace(/<[^>]*>/g, '');
    return cleanText;
}

export default async function Crypto ({params}: any) {   

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`, { next: { revalidate: 10 } });
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
    const athpercentage = data.market_data.ath_change_percentage.usd;
    const athDate = data.market_data.ath_date.usd;
    const athformateddate = new Date(athDate);
    const atl = data.market_data.atl.usd;
    const atlpercentage = data.market_data.atl_change_percentage.usd;
    const atlDate = data.market_data.atl_date.usd;
    const atlformateddate = new Date(atlDate);
    const description = data.description.en;
    const cleanDescription = removeTags(description);
    const categories = data.categories;
    const high24 = data.market_data.high_24h.usd;
    const low24 = data.market_data.low_24h.usd;
    const weekchangeperc = data.market_data.price_change_percentage_7d;
    const twoweekchangeperc = data.market_data.price_change_percentage_14d;
    const monthchangeperc = data.market_data.price_change_percentage_30d;
    const twomonthchangeperc = data.market_data.price_change_percentage_60d;
    const halfchangeperc = data.market_data.price_change_percentage_200d;
    const yearchangeperc = data.market_data.price_change_percentage_1y;
    const totalsupply = data.market_data.total_supply;
    const maxsupply = data.market_data.max_supply;
    const site = data.links.homepage[0];
    const domain = new URL(site).hostname;     

    return (
        <>
            <div className="overflow-x-hidden">
                {/* @ts-expect-error Async Server Component */}
                <Navbar/>
                <div className="my-8 mx-12 grid grid-cols-5 max-lg:mx-4 max-lg:block">
                    <div className="col-span-3">
                        <div>
                            <div className="text-white">Rank #{rank}</div>
                            <div className="flex mt-1 items-center">
                                <Image src={logo} alt="" height={40} width={40}/>
                                <div ><span className="text-white text-2xl font-semibold ml-4">{name}</span><span className="text-gray-400 ml-4">{symbol.toUpperCase()}</span></div>                                
                            </div>
                            <div className="flex mt-1 items-center">
                                { price < 0.01 ? <div className="text-white text-3xl font-semibold">${price}</div> : <div className="text-white text-3xl font-semibold">{price.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>}                   
                                { priceChange < 0 ? <span className="text-red-300 font-semibold pl-2">{priceChange.toFixed(2)}%</span> : <span className="text-green-300 font-semibold pl-2">{priceChange.toFixed(2)}%</span> }
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 max-md:block">
                            <div>
                                <div className="grid grid-cols-2">
                                    <div className="text-gray-400">Market Cap</div>
                                    <div className="text-white font-medium text-right">{marketCap.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                                </div>
                                <div className="grid grid-cols-2 mt-2">
                                    <div className="text-gray-400">24h Trading Vol</div>
                                    <div className="text-white font-medium text-right">{tradingVolume.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                                </div>
                                <div className="grid grid-cols-2 mt-2">
                                    <div className="text-gray-400">Fully Diluted Valuation</div>
                                    { valuation == null ? <div className="text-white font-medium text-right">--</div> : <div className="text-white font-medium text-right">{valuation.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>}
                                </div>
                                <div className="grid grid-cols-2 mt-2">
                                    <div className="text-gray-400">Circulating Supply</div>
                                    <div className="text-white font-medium text-right">{supply.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="ml-6 grid grid-rows-2 max-md:ml-0 max-md:mt-2">
                                <div className="grid grid-cols-2">
                                    <div className="text-gray-400">ATH</div>
                                    <div className="text-right">
                                        <div className="text-white font-medium">
                                            <span>{ath < 0.01 ? <span>${ath}</span> : <span>{ath.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</span> }</span> 
                                            {ath > 0 ? <span className="text-red-300 ml-1">{athpercentage.toFixed(2)}%</span> : <span className="text-green-300 ml-1">{athpercentage.toFixed(2)}%</span>}
                                        </div>
                                        <div className="text-gray-400">{athformateddate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-gray-400">ATL</div>
                                    <div className="text-right"><div className="text-white font-medium">
                                        <span>{atl < 0.01 ? <span>${atl.toFixed(6)}</span> : <span>{atl.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</span> }</span> 
                                        {atl < 0 ? <span className="text-red-300 ml-1">{atlpercentage.toFixed(2)}%</span> : <span className="text-green-300 ml-1">{atlpercentage.toFixed(2)}%</span>}
                                    </div>
                                    <div className="text-gray-400">{atlformateddate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div></div>
                                </div>
                            </div>



                        </div>

                        <div className="mt-8 max-lg:mb-8">
                            <div className="text-white text-2xl font-medium">What Is <span>{name}</span> <span>({symbol.toUpperCase()})</span>?</div>
                            <div className="text-gray-400 mt-2">{cleanDescription}</div>
                        </div>




                    </div>
                    <div className="h-full w-full col-span-2 overflow-hidden">
                       <div className="h-[180px] rounded-[10px] ml-12 bg-[#3D3D3D] max-lg:ml-0">
                            <div className="text-white text-xl font-semibold mx-4 pt-4">{name} Converter</div>                            
                            <Calculator mult={price} sym={symbol.toUpperCase()}/>
                            <div className="text-gray-400 font-medium mx-4 mt-2 text-sm">1 USD = {(1 / price)} {symbol.toUpperCase()}</div>
                       </div>
                       
                       

                       <div className=" rounded-[10px] ml-12 mt-4 bg-[#3D3D3D] max-lg:ml-0">
                            <div className="flex justify-between mx-4 pt-4">
                                <div className="text-gray-400 font-medium">Website</div>
                                <div className="bg-[#686873] px-2 py-1 rounded-[10px] hover:bg-[#47474f]"><a href={site} className="text-white hover:text-green-400">{domain}</a></div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">Categories</div>
                                <div className="text-right text-white">
                                    {categories.slice(0, 5).map((category, index) => (
                                        <div key={index}>{category}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">24h Low / 24h High</div>
                                <div className="text-white text-right">{high24.toLocaleString('en-US', {style: 'currency', currency: 'USD',})} / {low24.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">Total Supply</div>
                                <div className="text-white">{totalsupply.toLocaleString()}</div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">Max Supply</div>
                                { maxsupply !== null ? <div className="text-white">{maxsupply.toLocaleString()}</div> : <div className="text-white">--</div> } 
                            </div>

                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">7d Change</div>
                                <div className="text-white">
                                { weekchangeperc < 0 ? <span className="text-red-300"> {weekchangeperc.toFixed(2)}%</span> : <span className="text-green-300"> {weekchangeperc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">14d Change</div>
                                <div className="text-white">
                                    { twoweekchangeperc < 0 ? <span className="text-red-300"> {twoweekchangeperc.toFixed(2)}%</span> : <span className="text-green-300"> {twoweekchangeperc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">30d Change</div>
                                <div className="text-white">
                                    { monthchangeperc < 0 ? <span className="text-red-300"> {monthchangeperc.toFixed(2)}%</span> : <span className="text-green-300"> {monthchangeperc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">60d Change</div>
                                <div className="text-white">
                                    { twomonthchangeperc < 0 ? <span className="text-red-300"> {twomonthchangeperc.toFixed(2)}%</span> : <span className="text-green-300"> {twomonthchangeperc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">200d Change</div>
                                <div className="text-white">
                                    { halfchangeperc < 0 ? <span className="text-red-300"> {halfchangeperc.toFixed(2)}%</span> : <span className="text-green-300"> {halfchangeperc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 py-2">
                                <div className="text-gray-400 font-medium">1 Year Change</div>
                                <div className="text-white">
                                    { yearchangeperc < 0 ? <span className="text-red-300"> {yearchangeperc.toFixed(2)}%</span> : <span className="text-green-300"> {yearchangeperc.toFixed(2)}%</span>}
                                </div>
                            </div> 
                           
                        </div>
                    </div>
                </div>
            <Footer/>
            </div>
        </>
    )
}

