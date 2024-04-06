import BookingForm from "@/components/BookingForm";
import { authOptions } from "@/libs/auth";
import getBookings from "@/libs/getBookings";
import getShops from "@/libs/getShops";
import { getServerSession } from "next-auth";

export default async function Reservation() {
  const cars:Car[] = [{model:"Honda Civic", img:'/cars/civic.jpg', description:'Cool car'},
    { model:"Honda Accord", img:'/cars/accord.jpg', description:'Cool car'},
    { model:"Toyota Fortuner", img:'/cars/fortuner.jpg', description:'Cool car'},
    { model:"Tesla Model 3", img:'/cars/tesla.jpg', description:'Cool car'}]

  const shops:rentals = await getShops();

  const session = await getServerSession(authOptions)

  if (!session || !session?.user.data._id) return null;

  const bookings:Bookings = await getBookings(session?.user.token);
  
  //Created Reservation Successfully

  //console.log(bookDate)
  //onDateChange(dayjs(value).format('DD/MM/YYYY'))
  
  return (
    <main className="p-1 h-[125vh] bg-gradient-to-tl from-red-600 to-slate-950">
        <div className="mt-[85px] text-4xl text-white font-bold">Make Reservation</div>
        <div className="bg-white h-[5px] mt-[20px] mb-[30px] w-[80%] sm:w-[60%] md:w-[50%] m-auto rounded-xl"></div>
        <BookingForm user={session.user} shops={shops} cars={cars} bookingsAmount={bookings.count}></BookingForm>
    </main>
  )
}
  