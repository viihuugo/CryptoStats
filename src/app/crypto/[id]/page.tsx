"use client";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import Footer from "@/app/components/footer";
import Calculator from "@/app/calculator/calculator";
import { coinData } from "./getdata";

export default async function Crypto ({params}: any) {   

    const page = params.id;
    const coin = await coinData(page); 


    return (
        <>
            <div className="overflow-x-hidden">
                {/* @ts-expect-error Async Server Component */}
                <Navbar/>
                <div className="my-8 mx-12 grid grid-cols-5 max-lg:mx-4 max-lg:block">
                    <div className="col-span-3">                    

                        <div>
                            <div className="text-white">Rank #{coin.rank}</div>
                            <div className="flex mt-1 items-center">
                                <Image src={coin.logo} alt="" height={40} width={40}/>
                                <div ><span className="text-white text-2xl font-semibold ml-4">{coin.name}</span><span className="text-gray-400 ml-4">{coin.symbol.toUpperCase()}</span></div>                                
                            </div>
                            <div className="flex mt-1 items-center">
                                { coin.price < 0.01 ? <div className="text-white text-3xl font-semibold">${coin.price}</div> : <div className="text-white text-3xl font-semibold">{coin.price.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>}                   
                                { coin.priceChange < 0 ? <span className="text-red-300 font-semibold pl-2">{coin.priceChange.toFixed(2)}%</span> : <span className="text-green-300 font-semibold pl-2">{coin.priceChange.toFixed(2)}%</span> }
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 max-md:block">
                            <div>
                                <div className="grid grid-cols-2">
                                    <div className="text-gray-400">Market Cap</div>
                                    <div className="text-white font-medium text-right">{coin.marketCap.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                                </div>
                                <div className="grid grid-cols-2 mt-2">
                                    <div className="text-gray-400">24h Trading Vol</div>
                                    <div className="text-white font-medium text-right">{coin.tradingVolume.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                                </div>
                                <div className="grid grid-cols-2 mt-2">
                                    <div className="text-gray-400">Fully Diluted Valuation</div>
                                    { coin.valuation == null ? <div className="text-white font-medium text-right">--</div> : <div className="text-white font-medium text-right">{coin.valuation.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>}
                                </div>
                                <div className="grid grid-cols-2 mt-2">
                                    <div className="text-gray-400">Circulating Supply</div>
                                    <div className="text-white font-medium text-right">{coin.supply.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="ml-6 grid grid-rows-2 max-md:ml-0 max-md:mt-2">
                                <div className="grid grid-cols-2">
                                    <div className="text-gray-400">ATH</div>
                                    <div className="text-right">
                                        <div className="text-white font-medium">
                                            <span>{coin.ath < 0.01 ? <span>${coin.ath}</span> : <span>{coin.ath.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</span> }</span> 
                                            {coin.ath > 0 ? <span className="text-red-300 ml-1">{coin.athPercentage.toFixed(2)}%</span> : <span className="text-green-300 ml-1">{coin.athPercentage.toFixed(2)}%</span>}
                                        </div>
                                        <div className="text-gray-400">{coin.athFormatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-gray-400">ATL</div>
                                    <div className="text-right"><div className="text-white font-medium">
                                        <span>{coin.atl < 0.01 ? <span>${coin.atl.toFixed(6)}</span> : <span>{coin.atl.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</span> }</span> 
                                        {coin.atl < 0 ? <span className="text-red-300 ml-1">{coin.atlPercentage.toFixed(2)}%</span> : <span className="text-green-300 ml-1">{coin.atlPercentage.toFixed(2)}%</span>}
                                    </div>
                                    <div className="text-gray-400">{coin.atlFormatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div></div>
                                </div>
                            </div>



                        </div>

                        <div className="mt-8 max-lg:mb-8">
                            <div className="text-white text-2xl font-medium">What Is <span>{coin.name}</span> <span>({coin.symbol.toUpperCase()})</span>?</div>
                            <div className="text-gray-400 mt-2">{coin.cleanDescription}</div>
                        </div>

                    </div>


                    <div className="h-full w-full col-span-2 overflow-hidden">
                        <div className="h-[180px] rounded-[10px] ml-12 bg-[#3D3D3D] max-lg:ml-0">
                            <div className="text-white text-xl font-semibold mx-4 pt-4">{coin.name} Converter</div>                            
                            <Calculator mult={coin.price} sym={coin.symbol.toUpperCase()}/>
                            <div className="text-gray-400 font-medium mx-4 mt-2 text-sm">1 USD = {(1 / coin.price)} {coin.symbol.toUpperCase()}</div>
                        </div>
                       
                       

                        <div className=" rounded-[10px] ml-12 mt-4 bg-[#3D3D3D] max-lg:ml-0">
                            <div className="flex justify-between mx-4 pt-4">
                                <div className="text-gray-400 font-medium">Website</div>
                                <div className="bg-[#686873] px-2 py-1 rounded-[10px] hover:bg-[#47474f]"><a href={coin.site} className="text-white cursor-pointer hover:text-green-400">{coin.domain}</a></div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">Categories</div>
                                <div className="text-right text-white">
                                    {coin.categories.slice(0, 5).map((category: string, index: number) => (
                                        <div key={index}>{category}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">24h Low / 24h High</div>
                                <div className="text-white text-right">{coin.low24.toLocaleString('en-US', {style: 'currency', currency: 'USD',})} / {coin.high24.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">Total Supply</div>
                                <div className="text-white">{coin.totalSupply.toLocaleString()}</div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">Max Supply</div>
                                { coin.maxSupply !== null ? <div className="text-white">{coin.maxSupply.toLocaleString()}</div> : <div className="text-white">--</div> } 
                            </div>

                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">7d Change</div>
                                <div className="text-white">
                                { coin.weekChangePerc < 0 ? <span className="text-red-300"> {coin.weekChangePerc.toFixed(2)}%</span> : <span className="text-green-300"> {coin.weekChangePerc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">14d Change</div>
                                <div className="text-white">
                                    { coin.twoWeekChangePerc < 0 ? <span className="text-red-300"> {coin.twoWeekChangePerc.toFixed(2)}%</span> : <span className="text-green-300"> {coin.twoWeekChangePerc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">30d Change</div>
                                <div className="text-white">
                                    { coin.monthChangePerc < 0 ? <span className="text-red-300"> {coin.monthChangePerc.toFixed(2)}%</span> : <span className="text-green-300"> {coin.monthChangePerc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">60d Change</div>
                                <div className="text-white">
                                    { coin.twoMonthChangePerc < 0 ? <span className="text-red-300"> {coin.twoMonthChangePerc.toFixed(2)}%</span> : <span className="text-green-300"> {coin.twoMonthChangePerc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 pt-2">
                                <div className="text-gray-400 font-medium">200d Change</div>
                                <div className="text-white">
                                    { coin.halfChangePerc < 0 ? <span className="text-red-300"> {coin.halfChangePerc.toFixed(2)}%</span> : <span className="text-green-300"> {coin.halfChangePerc.toFixed(2)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between mx-4 py-2">
                                <div className="text-gray-400 font-medium">1 Year Change</div>
                                <div className="text-white">
                                    { coin.yearChangePerc < 0 ? <span className="text-red-300"> {coin.yearChangePerc.toFixed(2)}%</span> : <span className="text-green-300"> {coin.yearChangePerc.toFixed(2)}%</span>}
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

