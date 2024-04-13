"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react"
import { useEffect } from "react";


const cars: Car[] = [
    { model: "Honda Civic", img: "/cars/civic.jpg", description: "Cool car" },
    { model: "Honda Accord", img: "/cars/accord.jpg", description: "Cool car" },
    {
      model: "Toyota Fortuner",
      img: "/cars/fortuner.jpg",
      description: "Cool car",
    },
    { model: "Tesla Model 3", img: "/cars/tesla.jpg", description: "Cool car" },
  ]



export default function BookingEditor({item, form, handleChange, setForm}:{item: Booking, form:Booking, handleChange:Function, setForm:Function}){

    const [totalCost, setTotalCost] = useState(
        (item.daySpend * item.rentalProvider.cost) - 10 * item.discountPoint
    );

    useEffect(() => {
        // Function to recalculate total value whenever dependent attributes change
        const calculateTotalValue = () => {
          const newValue = (form.daySpend * form.rentalProvider.cost) - (10 * form.discountPoint);
          setTotalCost(newValue);
          setForm({
            ...form,
            cost: newValue,
            });
        };
    
        // Call the function initially and whenever dependent attributes change
        calculateTotalValue();
    
        // Clean-up function for useEffect
        return () => {
          // Any clean-up code if needed
        };
      }, [form.daySpend]);

    return (
            <div className="">
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure>
                    <img
                        src={
                        cars.filter((c) => c.model === form.car).at(0)
                            ?.img
                        }
                        alt={form.car}
                    />
                    </figure>
                    <div className="card-body">
                    <label>Car</label>
                    <select
                        name="car"
                        className="select select-info w-full max-w-xs"
                        onChange={(e: any) => {
                        handleChange(e);
                        }}
                    >
                        <option disabled selected>
                        {form.car}
                        </option>
                        {cars.map((car: any) => (
                        <option key={car.model} value={car.model}>
                            {car.model}
                        </option>
                        ))}
                    </select>
                    <label>bookingDate</label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        name="bookingDate"
                        value={dayjs(form.bookingDate)}
                        className="rounded-lg bg-white"
                        format="DD/MM/YYYY"
                        onChange={(e) => {
                            if (!e) return;
                            setForm({
                            ...form,
                            bookingDate: e?.toString(),
                            });
                        }}
                        />
                    </LocalizationProvider>

                    <label>daySpend</label>
                    <input
                        min={1}
                        value={
                        form.daySpend !== 1
                            ? form.daySpend
                            : item.daySpend
                        }
                        type="number"
                        placeholder="daySpend..."
                        name="daySpend"
                        className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                
                        onChange={(e) => {
                            if(!e.target.value){
                                return;
                            }
                            if (+e.target.value < 1 && e.target.value)
                                return;
                            e.target.value = Math.floor(
                                +e.target.value
                            ).toString();
                            handleChange(e);
                        }}                        
                    />
                    <label>Provider</label>
                    <input
                        readOnly
                        value={
                        form.rentalProvider.name !== ""
                            ? form.rentalProvider.name
                            : item.rentalProvider.name
                        }
                        type="text"
                        placeholder="Provider..."
                        name="Provider"
                        className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white"
                    />
                    <label>Cost Per Day</label>
                    <input
                        readOnly
                        min={0}
                        value={
                        form.rentalProvider.cost !== 0
                            ? form.rentalProvider.cost
                            : item.rentalProvider.cost
                        }
                        type="number"
                        placeholder="cost..."
                        name="cost"
                        className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500  bg-black text-white"
                    />
                    <label>Total Cost (after discount)</label>
                    <input
                        readOnly
                        value={totalCost}
                        className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500  bg-black text-white"
                    />
                    </div>
                </div>
                </div>
    )
}