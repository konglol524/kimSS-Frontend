"use client";
import { MdDeleteOutline } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";
import { useRouter } from "next/navigation";
import BookingEditor from "./BookingEditor";
import dayjs, { Dayjs } from "dayjs";



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
    discountPoint: 0,
    cost: 0,
    addedPoint: 0,
  });

  const [editID, setEditID] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return;
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
      discountPoint: 0,
      cost: 0,
      addedPoint: 0,
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
              <thead>
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
              <tbody>
                {bookings.data.map((item: Booking, idx) => (
                  <tr key={idx}>
                    <th className="">{idx + 1}</th>
                    {editID === item._id ? 
                    <BookingEditor item={item} form={form} handleChange={handleChange} setForm={setForm}/> 
                    : (
                      <>
                        <td className="whitespace-nowrap">{item.user}</td>
                        <td className="whitespace-nowrap">{item.car}</td>
                        <td className="whitespace-nowrap">
                          {dayjs(item.bookingDate).format("DD/MM/YYYY")}
                        </td>
                        <td className="whitespace-nowrap">{item.daySpend}</td>
                        <td className="whitespace-nowrap">
                          {item.rentalProvider.name}
                        </td>
                        <td className="whitespace-nowrap">
                          {item.cost}
                        </td>
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
