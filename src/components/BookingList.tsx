"use client";
import { MdDeleteOutline } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import dayjs, { Dayjs } from 'dayjs';


export default function BookingList({
  bookings,
  token,
}: {
  bookings: Bookings;
  token: string;
}) {
  const [form, setForm] = useState<Booking>({
    _id: "",
    bookingDate: "",
    user: "",
    car: "",
    daySpend: 0,
    rentalProvider: {
      _id: "",
      picture: "",
      name: "",
      address: "",
      cost: 0,
      tel: "",
    },
    createdAt: "",
  });

  const [editID, setEditID] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleDel(id: string) {
    try {
      await deleteBooking(token, id);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setEditID("");
    setForm({
      _id: "",
      bookingDate: "",
      user: "",
      car: "",
      daySpend: 0,
      rentalProvider: {
        _id: "",
        picture: "",
        name: "",
        address: "",
        cost: 0,
        tel: "",
      },
      createdAt: "",
    });
  }

  async function handleSave(id: string) {
    try {
      // console.log(form);

      await updateBooking(token, id, form);
      router.refresh();
      setEditID("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (editID !== "") {
      const b = bookings.data.find(
        (booking: Booking) => booking._id === editID
      );
      setForm(b || form);
    }
  }, [editID]);

  return (
    <>
      {bookings && (
        <>
          <header>
            <h1 className="text-xl font-[700] mt-10">
              Booking Count : {bookings.count}
            </h1>
            <h1 className="text-xl font-[600]">
              Total Cost : {bookings.totalCost.toLocaleString()}
            </h1>
          </header>
          <div className="w-[80vw] mt-4 mx-auto overflow-auto rounded-lg shadow">
            <table className="table table-zebra">
              <thead >
                <tr className="">
                  <th className="text-sm">No.</th>
                  <th className="text-sm">User</th>
                  <th className="text-sm">Car</th>
                  <th className="text-sm">bookingDate</th>
                  <th className="text-sm">daySpend</th>
                  <th className="text-sm">Provider</th>
                  <th className="text-sm">Cost</th>
                </tr>
              </thead>
              <tbody className="">
                {bookings.data.map((item: Booking, idx) => (
                  <tr className="" key={idx}>
                    <th>{idx + 1}</th>
                    {editID === item._id ? (
                      <div className="flex flex-col">
                        <label>Car</label>
                        <input
                          value={form.car !== "" ? form.car : item.car}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          placeholder="car..."
                          name="car"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <label>bookingDate</label>
                        <input
                          value={
                            form.bookingDate !== ""
                              ? form.bookingDate
                              : item.bookingDate
                          }
                          onChange={(e) => handleChange(e)}
                          type="text"
                          placeholder="bookingDate..."
                          name="bookingDate"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <label>daySpend</label>
                        <input min={1}
                          value={
                            form.daySpend !== 0 ? form.daySpend : item.daySpend
                          }
                          onChange={(e) => handleChange(e)}
                          type="number"
                          placeholder="daySpend..."
                          name="daySpend"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <label>createdAt</label>
                        <input
                          value={
                            form.createdAt !== ""
                              ? form.createdAt
                              : item.createdAt
                          }
                          onChange={(e) => handleChange(e)}
                          type="text"
                          placeholder="createdAt..."
                          name="createdAt"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <label>Provider</label>
                        <input
                          value={
                            form.rentalProvider.name !== ""
                              ? form.rentalProvider.name
                              : item.rentalProvider.name
                          }
                          onChange={(e) => handleChange(e)}
                          type="text"
                          placeholder="Provider..."
                          name="Provider"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white"
                        />
                        <label>Cost</label>
                        <input min={0}
                          value={
                            form.rentalProvider.cost !== 0
                              ? form.rentalProvider.cost
                              : item.rentalProvider.cost
                          }
                          onChange={(e) => handleChange(e)}
                          type="number"
                          placeholder="cost..."
                          name="cost"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500  bg-black text-white"
                        />
                      </div>
                    ) : (
                      <>
                        <td className="whitespace-nowrap">{item.user}</td>
                        <td className="whitespace-nowrap">{item.car}</td>
                        <td className="whitespace-nowrap">{  dayjs(item.bookingDate).format('DD/MM/YYYY')  }</td>
                        <td className="whitespace-nowrap">{item.daySpend}</td>
                        <td className="whitespace-nowrap">{item.rentalProvider.name}</td>
                        <td className="whitespace-nowrap">{item.rentalProvider.cost}</td>
                      </>
                    )}

                    <td className="grid md:grid-cols-2 sm:w-[10vw] w-[20vw]">
                      {editID === item._id ? (
                        <>
                          <button
                            onClick={() => handleCancel()}
                            className="md:mr-2 btn btn-error hover:opacity-75"
                          >
                            <TiCancel />
                          </button>
                          <button
                            onClick={() => handleSave(item._id)}
                            className="btn btn-success"
                          >
                            <FaRegSave />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDel(item._id)}
                            className="md:mr-2 btn btn-error hover:opacity-75"
                          >
                            <MdDeleteOutline />
                          </button>
                          <button
                            onClick={() => setEditID(item._id)}
                            className="btn btn-info"
                          >
                            <FaRegEdit />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
