import Link from "next/link";

export default function Footer () {
    return (
        <>
            <div className="h-[150px] w-screen border-t border-[#646464] grid grid-cols-2 px-16 items-center text-gray-400 max-lg:px-4">
                <div>
                    <div className="text-2xl font-medium max-lg:text-xl">CryptoStats</div>
                    <div className="w-3/6 text-sm max-lg:text-xs max-sm:hidden">CryptoStats provides a fundamental analysis of the crypto market. In addition to tracking price, volume and market capitalization.</div>
                </div>
                <div className="text-right max-lg:px-4"><a href='https://victorhugoalves.com/'>© 2022 Victor Alves. All Rights Reserved.</a></div>
            </div>
        </>
    )
}