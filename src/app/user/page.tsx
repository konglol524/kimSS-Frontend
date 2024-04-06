import { authOptions } from "@/libs/auth";
import getBookings from "@/libs/getBookings";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

import BookingList from "@/components/BookingList";
import dayjs from "dayjs";
import Loading from "../../components/CustomLoading";
import { Suspense } from "react";

export default async function user() {
  const session = await getServerSession(authOptions);
  var profile, createdAt, bookings: Bookings;

  if (!session) {
    // console.log(session);
    return;
  }
  bookings = await getBookings(session?.user.token);
  profile = await getUserProfile(session.user.token);
  createdAt = new Date(profile.data.createdAt);

  return (
    <>
        {session && (
          <main className="mt-[70px] flex justify-center ">
            {/* <div className="text-2xl">{profile.data.name}</div>

            <table className="border-separate table-auto border-spacing-2">
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{profile.data.email}</td>
                </tr>
                <tr>
                  <td>Tel.</td>
                  <td>{profile.data.telephone}</td>
                </tr>
                <tr>
                  <td>Member Since</td>
                  <td>{createdAt?.toString()}</td>
                </tr>
              </tbody>
            </table> */}
            <div className="card w-96 bg-base-100 shadow-xl border-2 border-solid border-base-800 ">
              <div className="card-body">
                <h2 className="card-title">Your Profile!</h2>
                <table className="border-separate table-auto border-spacing-2  ">
                  <tbody>
                    <tr>
                      <td>Email :</td>
                      <td>{profile.data.email}</td>
                    </tr>
                    <tr>
                      <td>Tel. :</td>
                      <td>{profile.data.telephone}</td>
                    </tr>
                    <tr>
                      <td>Member Since :</td>
                      <td>{dayjs(createdAt?.toString()).format("DD/MM/YYYY")}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">{profile.data.role}</button>
                </div>
              </div>
            </div>
          </main>
        )}
      
      <Suspense fallback={<Loading></Loading>}>
        <BookingList bookings={bookings} token={session?.user.token} />
      </Suspense>    
    </>
  );
}
