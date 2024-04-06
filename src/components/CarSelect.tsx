import getShops from "@/libs/getShops";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function CarSelect({value, cars, onCarChange}:{value:any, cars:any, onCarChange:Function}) {
    return (
        <div>
            <Select value={value} name="car" className="h-[3em] w-[15vw]" data-theme="light"
            onChange={(e:SelectChangeEvent)=>{onCarChange(e.target.value);}}>
                <MenuItem value='None' disabled>None</MenuItem>
                {
                    cars.map((carItem:Car)=>(
                        <MenuItem value={carItem.model} key={carItem.model}>{carItem.model}</MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}