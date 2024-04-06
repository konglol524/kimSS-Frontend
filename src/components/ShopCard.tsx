

import Image from "next/image"
import Link from "next/link"

export default function ShopCard({shopItem}:{shopItem:rentalProvider}){
    return (
        <div className="relative w-[300px] h-[400px] rounded-lg shadow-xl bg-black bg-opacity-40 text-white">
            <div className="w-full h-[47%] relative rounded-t-lg">
                <Image src={shopItem.picture}
                    alt={`${shopItem.name} image`}
                    fill={true}
                    className='object-cover rounded-t-lg bg-white bg-opacity-0'
                />
            </div>
            <div className="w-full h-[10%] p-[10px] text-2xl font-bold">{shopItem.name}</div>
            <table className="mt-1 w-full">
                <tbody className="bg-500">
                    <tr className="">
                        <td className="pl-3 text-nowrap"><div className="w-full h-[15%] pl-[10px] text-lg text-left">Cost :</div></td>
                        <td className="pl-3 text-nowrap"><div className="w-full h-[15%] pl-[10px] text-lg text-left">{shopItem.cost + " Baht"}</div></td>
                    </tr>
                    <tr className="">
                        <td className="pl-3 text-nowrap"><div className="w-full h-[15%] pl-[10px] text-lg text-left">Address :</div></td>
                        <td className="pl-3"><div className="w-full h-[15%] pl-[10px] text-lg text-left leading-tight">{shopItem.address}</div></td>
                    </tr>
                    <tr className="">
                        <td className="pl-3 text-nowrap"><div className="w-full h-[15%] pl-[10px] text-lg text-left">Tel. :</div></td>
                        <td className="pl-3 text-nowrap"><div className="w-full h-[15%] pl-[10px] text-lg text-left">{shopItem.tel}</div></td>
                    </tr>
                </tbody>
            </table>
            <div className="absolute left-0 bottom-0 m-3">
                <Link href={`reservation?shop=${shopItem._id}`}>
                    <button className="rounded-md bg-red-500 hover:bg-red-800 px-2.5 py-2 mt-3 shadow-sm text-white">
                        Select this shop
                    </button>
                </Link>
            </div>
        </div>
    )
}