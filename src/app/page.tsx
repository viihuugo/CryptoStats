"use client";
import Image from 'next/image';
import Navbar from "./components/navbar";
import { Coin } from "@/schemas/coins";
import { Market } from '@/schemas/market';
import { z } from "zod";
import Footer from './components/footer';
import Link from 'next/link';

function Row ({coinlink, rank, logo, coin, symbol, price, priceChange, marketCap, volume, supply}: any){  

  return (
    <div className="h-[60px] mx-12 border-b border-[#646464] grid grid-cols-5 max-lg:mx-4 max-md:grid-cols-2">
      <div className="flex items-center">        
        <div className="w-[25px] ml-4 mr-2 text-gray-400">{rank}</div>
        <Link href={`/crypto/${coinlink}`}><Image src={logo} alt="" height={25} width={25} className='pr-2'/></Link>
        <Link href={`/crypto/${coinlink}`}><div className="text-white font-medium">{coin} <span className="text-xs ml-2 text-gray-400">{symbol.toUpperCase()}</span></div></Link>       
        
      </div>
      <div className="col-span-4 max-md:col-span-1">
        <div className="w-full h-full text-gray-400 grid grid-cols-9 items-center max-xl:grid-cols-7 max-[920px]:grid-cols-5 max-md:grid-cols-3 max-[450px]:grid-cols-2">
          { price < 0.01 ? <div className="text-right col-span-2">${price}</div> : <div className="text-right col-span-2">{price.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>}
          {priceChange < 0 ? <div className="text-right text-red-400 max-md:pr-2 max-[450px]:hidden">{priceChange.toFixed(2)}%</div> : <div className="text-right text-green-400 max-md:pr-2 max-[450px]:hidden">{priceChange.toFixed(2)}%</div>}
          <div className="text-right col-span-2 max-md:hidden max-[920px]:pr-2">{marketCap.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
          <div className="text-right col-span-2 max-xl:pr-2 max-[920px]:hidden">{volume.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
          <div className="text-right col-span-2 pr-4 max-xl:hidden max-xl:col-span-0">{supply.toLocaleString()} {symbol.toUpperCase()}</div>
        </div>
        
      </div>
    </div>
  )
}

const getData = async ()=>{
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
  const data: z.infer<typeof Coin> = await res.json();
  return data
}

export default async function Home() {
  
  const coins = await getData(); 

  const res = await fetch('https://api.coingecko.com/api/v3/global', { next: { revalidate: 10 } });
  const data: z.infer<typeof Market> = await res.json();    
  const marketcap = data.data.total_market_cap.usd;

  return (
   <>      
      <div className="bg-background h-screen w-full overflow-x-hidden">
        {/* @ts-expect-error Async Server Component */}
        <Navbar/>
        <div className='pl-12 max-lg:pl-4'>
          <div className="text-3xl text-white font-medium mt-8 max-md:text-2xl">Cryptocurrency Prices by Market Cap</div>
          <div className="text-gray-400 mt-2">The global cryptocurrency market cap today is ${(marketcap / 1000000000000).toFixed(2)} Trillion</div>
        </div>
        <div>
          <div className="h-[40px] mt-8 mx-12 bg-[#303030] border-y border-[#646464] grid grid-cols-5 max-lg:mx-4 max-md:grid-cols-2">
            <div className="flex items-center text-gray-400">
              <div className="w-[25px] ml-4 mr-2">#</div>
              <div>Coin</div>
            </div>
            <div className="col-span-4 max-md:col-span-1">
              <div className="w-full h-full text-gray-400 grid grid-cols-9 items-center max-xl:grid-cols-7 max-[920px]:grid-cols-5 max-md:grid-cols-3 max-[450px]:grid-cols-2">
                <div className="text-right col-span-2">Price</div>
                <div className="text-right max-md:pr-2 max-[450px]:hidden">24h</div>
                <div className="text-right col-span-2 max-[920px]:pr-2 max-md:hidden">Market Cap</div>
                <div className="text-right col-span-2 max-xl:pr-2 max-[920px]:hidden">Volume 24h</div>
                <div className="text-right col-span-2 pr-4 max-xl:hidden max-xl:col-span-0">Circulating Supply</div>
              </div>
            </div>
          </div>
                   
          {coins.map((coin: any)=>{
            return (              
              <Row 
                key={coin.id}
                coinlink={coin.id}
                rank={coin.market_cap_rank}
                logo={coin.image}
                coin={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                marketCap={coin.market_cap}
                volume={coin.total_volume}
                supply={coin.circulating_supply}
              ></Row>
            )
          })}         
          
        </div>
        <div className='text-gray-400 mt-4 mb-8 mx-12 text-right max-lg:mx-4'>Powered by CoinGecko</div>
        <Footer/>
      </div>
   </>
  )
}
