"use client";
import React, { useState } from "react";

export default function Calculator ({mult, sym}: any) {

    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    const handleChange = (event: any) => {
      setInputValue(event.target.value);
      const multiplied = Number(event.target.value) * mult;
      setResult(multiplied.toString());
    };


    return (
        <>
            <div>                            
                <div className="my-2 mx-4 grid grid-cols-4 text-white font-medium">
                    <div className=" bg-[#686873] h-[40px] rounded-l-[10px] flex items-center justify-center">{sym}</div>
                    <div className="bg-[#686873] text-[#000] ml-1 col-span-3 h-[40px] rounded-r-[10px] flex items-center justify-center">
                        <input type="text" onChange={handleChange}  value={inputValue}
                            className="bg-transparent text-white font-medium w-full text-center b-0 outline-none"
                        />
                    </div>
                </div>
                <div className="my-2 mx-4 grid grid-cols-4 text-white font-medium">
                    <div className=" bg-[#686873] h-[40px] rounded-l-[10px] flex items-center justify-center">USD</div>
                    <div className="bg-[#686873] ml-1 col-span-3 h-[40px] rounded-r-[10px] flex items-center justify-center">{result}</div>
                </div>                
            </div>
        </>
    )
}