
import Image from "next/image"
import Link from "next/link"

export default function Card ({carItem}:{carItem:Car}){


    return (
        <div className="w-[500px] sm:w-[300px] m-2 h-[350px] rounded-lg shadow-lg text-white bg-black bg-opacity-40">
            <div className="w-full h-[60%] relative rounded-t-lg">
                <Image src={carItem.img}
                    alt='Hospital Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className="w-full h-[10%] p-[5px] text-lg font-bold">{carItem.model}</div>  
            <div className="w-full h-[10%] p-[5px] text-lg font-bold">{carItem.description}</div>         
            <div className="h-[10%]">
                <Link href={`reservation?car=${carItem.model}`}>
                    <button className="rounded-md bg-red-500 hover:bg-red-800 px-2.5 py-2 mt-3 shadow-sm text-white">
                        Select Car
                    </button>
                </Link>
            </div> 
        </div>
    )
}