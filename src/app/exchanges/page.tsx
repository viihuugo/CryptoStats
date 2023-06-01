import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Exchanges } from "@/schemas/exchanges";
import { Market } from '@/schemas/market';
import { z } from "zod";

function Row ({rank, logo, exchange, score, volume, normalized}: any){  

  return (
    <div className="h-[60px] mx-12 border-b border-[#646464] grid grid-cols-3 max-lg:mx-4">
      <div className="flex items-center">
        <div className="w-[25px] ml-4 mr-2 text-gray-400">{rank}</div>
        <Image src={logo} alt="" height={25} width={25} className='pr-2'/>
        <div className="text-white font-medium">{exchange}</div>
      </div>
      <div className="col-span-2">
        <div className="w-full h-full text-gray-400 grid grid-cols-3 items-center max-[920px]:grid-cols-2">
          { score > 7 ? <div className="text-right text-green-400">{score}</div> : <div className="text-right  text-yellow-400">{score}</div> }
          <div className="text-right">{volume.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
          <div className="text-right pr-2 max-[920px]:hidden">{normalized.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
        </div>
        
      </div>
    </div>
  )
}

const getData = async ()=>{
  const res = await fetch('https://api.coingecko.com/api/v3/exchanges');
  const data: z.infer<typeof Exchanges> = await res.json();
  return data
}

export default async function Exchange() {
  
  const exchanges = await getData(); 

  const res = await fetch('https://api.coingecko.com/api/v3/global', { next: { revalidate: 10 } });
  const data: z.infer<typeof Market> = await res.json();    
  const totalexchanges = data.data.markets;

  return (
   <>      
      <div className="bg-background h-screen w-full overflow-x-hidden">
        {/* @ts-expect-error Async Server Component */}
        <Navbar/>
        <div className='pl-12 max-lg:pl-4'>
          <div className="text-3xl text-white font-medium mt-8 max-md:text-2xl">Top Crypto Exchanges Ranked by Trust Score</div>
          <div className="text-gray-400 mt-2">As of today, we track {totalexchanges} crypto exchanges</div>
        </div>
        <div>
          <div className="h-[40px] mt-8 mx-12 bg-[#303030] border-y border-[#646464] grid grid-cols-3 max-lg:mx-4">
            <div className="flex items-center text-gray-400">
              <div className="w-[25px] ml-4 mr-2">#</div>
              <div>Exchange</div>
            </div>
            <div className="col-span-2">
              <div className="w-full h-full text-gray-400 grid grid-cols-3 items-center max-[920px]:grid-cols-2">
                <div className="text-right">Trust Score</div>
                <div className="text-right">24h Volume</div>
                <div className="text-right pr-2 max-[920px]:hidden">24h Volume Normalized</div>
              </div>
            </div>
          </div>
                   
          {exchanges.map((exchange: any)=>{
            return (              
              <Row 
                key={exchange.id}
                rank={exchange.trust_score_rank}
                logo={exchange.image}
                exchange={exchange.name}
                score={exchange.trust_score}
                volume={exchange.trade_volume_24h_btc}
                normalized={exchange.trade_volume_24h_btc_normalized}
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
