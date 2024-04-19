'use client'
import { useState } from "react";
import ShopCard from "./ShopCard";

export default async function ShopCatalog({shopData}:{shopData:rentals}){
    return (
        <div className=''>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[45px] pt-[20px]'>
                {
                    shopData.data.map((shopItem:rentalProvider)=>(
                        <div className="transition duration-100 m-auto shadow-lg hover:shadow-2xl hover:scale-105 hover:drop-shadow-2xl">
                            <ShopCard shopItem={shopItem}></ShopCard>
                        </div>
                    ))
                }              
            </div>
        </div>
    )
}