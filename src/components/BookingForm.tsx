'use client'

import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useEffect, useState } from "react";
import ShopSelect from "./ShopSelect";
import CarSelect from "./CarSelect";
import DateReserve from "./DateReserve";
import { TextField } from "@mui/material";
import addBooking from "@/libs/addBooking";
import getUserProfile from "@/libs/getUserProfile"; 
import ReservationResult from "./ReservationResult";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./CustomLoading";
import { Suspense } from "react";


export default function BookingForm({
  user,
  shops,
  cars,
  bookingsAmount,
}: {
  user: any;
  shops: rentals;
  cars: Array<Car>;
  bookingsAmount: number;
}) {
  const urlParams = useSearchParams();
  const shopParam = urlParams.get("shop");
  const carParam = urlParams.get("car");

  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [selectedCar, setSelectedCar] = useState<string>(
    carParam ? carParam : "None"
  );
  const [selectedShop, setSelectedShop] = useState<string>(
    shopParam ? shopParam : "None"
  );
  const [daySpend, setDaySpend] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(0);
  const [newUser, setNewUser] = useState<any>(user);  
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  const currentCostPerDay =
    shops.data.find((rental: rentalProvider) => rental._id === selectedShop)
      ?.cost || 0;

  const router = useRouter();

  useEffect(() => {
    setDiscount(0);
  }, [selectedShop]);
  
  useEffect(() => {
    setDiscount(0);
  }, [daySpend]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const updatedUser = await getUserProfile(user.token); 
        setNewUser(updatedUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.token]);

  const submitReservation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.data.role !== "admin" && bookingsAmount >= 3) {
      handleSubmitResponse({
        success: false,
        text: "Maximum 3 bookings per user",
      });
    } else if (
      bookDate != null &&
      selectedCar != "" &&
      selectedShop != "" &&
      selectedCar != "None" &&
      selectedShop != "None" &&
      daySpend > 0
    ) {
      const estimatedCost = currentCostPerDay * daySpend - discount * 10;

      console.log(`${bookDate} ${selectedCar} ${selectedShop} ${daySpend}`);

      console.log("ADDING BOOKING");

      const responseData = await addBooking(selectedShop, user.token, {
        bookingDate: bookDate,
        user: user.data._id,
        car: selectedCar,
        daySpend: daySpend,
        rentalProvider: selectedShop,
        discountPoint: discount,
        addedPoint: discount > 0 ? 0 : Math.floor((currentCostPerDay * daySpend) / 100),
        cost: estimatedCost,
      });

      handleSubmitResponse({
        ...responseData,
        text: "Created reservation successfully",
      });

      
      try {
        const updatedUser = await getUserProfile(user.token);
        setNewUser(updatedUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }

      
      setTimeout(() => {
        handleSubmitResponse({
          success: true,
          text: `You received ${discount > 0 ? "0 point" : Math.floor(
            (currentCostPerDay * daySpend) / 100
          ) + " points"}`,
        });
      }, 3000);
    } else {
      handleSubmitResponse({
        success: false,
        text: "Failed to create reservation",
      });
    }
  };

  const [responseChildren, setResponseChildren] = useState<
    Array<{
      key: number;
      isVisible: boolean;
      props: { valid: boolean; text: string };
    }>
  >([]);

  const handleSubmitResponse = (responseData: any) => {
    let result,
      key = responseChildren.length;

    if (responseData.success == true) {
      result = {
        key: key,
        isVisible: false,
        props: { valid: true, text: responseData.text },
      };
    } else {
      result = {
        key: key,
        isVisible: false,
        props: { valid: false, text: responseData.text },
      };
    }

    setResponseChildren([...responseChildren, result]);

    setTimeout(() => {
      setResponseChildren((prevChildren) => {
        return prevChildren.map((obj) => {
          if (obj.key == key) {
            return { ...obj, isVisible: true };
          } else return obj;
        });
      });
    }, 500); 

    setTimeout(() => {
      setResponseChildren((prevChildren) => {
        return prevChildren.map((obj) => {
          if (obj.key == key) {
            return { ...obj, isVisible: false };
          } else return obj;
        });
      });
    }, 2000); 

    setTimeout(() => {
      setResponseChildren((prevChildren) => {
        return prevChildren.filter((obj) => obj.key !== key);
      });

      router.refresh();
    }, 3000); 
  };

  const maxDiscount = Math.ceil(Math.min(
    newUser.data.point, 
    (currentCostPerDay * daySpend) / 10
  )) ;

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className="relative items-center bg-base-100 h-fit w-[300px] sm:w-[500px] md:w-[600px] m-auto rounded-xl flex">
          <form
            onSubmit={(e) => submitReservation(e)}
            className="pt-[35px] h-full"
          >
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-left pl-5">
                    <div className="text-md sm:text-xl font-bold ml-5">Select Shop</div>
                  </td>
                  <td className="p-[15px]">
                    <ShopSelect
                      value={selectedShop}
                      shops={shops}
                      onShopChange={(value: string) => setSelectedShop(value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left pl-5">
                    <div className="text-md sm:text-xl font-bold ml-5">Select Car</div>
                  </td>
                  <td className="p-[15px]">
                    <CarSelect
                      value={selectedCar}
                      cars={cars}
                      onCarChange={(value: string) => setSelectedCar(value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left pl-5">
                    <div className="text-md sm:text-xl font-bold ml-5">
                      Select Pickup Date
                    </div>
                  </td>
                  <td className="p-[15px]">
                    <DateReserve
                      onDateChange={(value: Dayjs) => setBookDate(value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left pl-5">
                    <div className="text-md sm:text-xl font-bold ml-5">Days Duration</div>
                  </td>
                  <td className="p-[15px]">
                    <input
                      min={1}
                      value={daySpend}
                      type="number"
                      className="md:w-[100px] w-[50px] text-lg text-center bg-white border rounded-md h-[3em]  text-black border-black border-solid"
                      onChange={(e) => setDaySpend(parseInt(e.target.value))}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left pl-5">
                    <div className="text-md sm:text-xl font-bold ml-5">Discount</div>
                  </td>
                  <td className="p-[15px]">
                    <label htmlFor="discount" className="pr-5">Your point balance is : 
                    {` ${newUser.data.point}`} {/* Use updated user profile points */}
                    </label>
                    <input
                      value={discount}
                      min={0}
                      max={maxDiscount}
                      type="number"
                      id="discount"
                      className="md:w-[100px] w-[50px] text-lg text-center bg-white border rounded-md h-[3em] text-black border-black border-solid"
                      onChange={(e) => {
                        if (+e.target.value < 0 || +e.target.value > maxDiscount)
                          return;
                        setDiscount(parseInt(e.target.value));
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pt-[15px] text-left pl-5">
                    <div className="text-md sm:text-xl font-bold ml-5">Estimated Cost</div>
                  </td>
                  <td className="pt-[15px]">
                    <div className="text-xl text-center w-full items-center flex justify-center rounded-md h-[1.75em]">
                      <span
                        className={`${
                          discount > 0 ? "line-through" : ""
                        } text-gray-500 mr-2`}
                      >
                        {(currentCostPerDay * daySpend).toLocaleString()} Baht
                      </span>
                      {discount > 0 && (
                        <span className="text-red-500 font-bold">
                          {Math.max(0,(
                            currentCostPerDay * daySpend -
                            discount * 10
                          )).toLocaleString() + " "}
                          Baht
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className=" text-center text-gray-500 mt-1">
                    You will get
                    <span className="text-red-500 font-bold">
                      {` ${discount > 0 ? 0 : Math.floor((currentCostPerDay * daySpend) / 100)} `}
                    </span>
                    {discount > 0 ? "point":"points"}
                    <div>
                      {discount > 0 ? "(can't earn points if discount is used)" : null}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="transition my-2 hover:scale-110 hover:shadow-2xl  ml-auto text-2xl rounded-md bg-red-500 hover:bg-red-800 px-8 py-[2%] shadow-sm text-white">
              Submit
            </button>
            <div className=" text-gray-500  text-center pb-2">
              Points are calculated based on the original cost divided by 100.
            </div>
          </form>
        </div>
      )}
      <div className="w-full h-full fixed top-0 pointer-events-none">
        {responseChildren.map((obj) => (
          <ReservationResult
            transition={obj.isVisible}
            valid={obj.props.valid}
            text={obj.props.text}
          />
        ))}
      </div>
    </>
  );
}

