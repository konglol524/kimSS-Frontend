import getShops from "@/libs/getShops";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function ShopSelect({value, shops, onShopChange}:{value:any, shops:rentals, onShopChange:Function}) {
    return (
        <div>
            <Select value={value} name="shop" className="h-[3em] w-[15vw] text-black" data-theme="light"
            onChange={(e:SelectChangeEvent)=>{onShopChange(e.target.value);}}>
                <MenuItem value='None' disabled>None</MenuItem>
                {
                    shops.data.map((shopItem:rentalProvider)=>(
                        <MenuItem value={shopItem._id} key={shopItem._id}>{shopItem.name}</MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}