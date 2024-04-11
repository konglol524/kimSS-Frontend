import { authOptions } from "@/libs/auth";
import getBookings from "@/libs/getBookings";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";


import BookingList from "@/components/BookingList";
import dayjs from "dayjs";
import Loading from "../../components/CustomLoading";
import { Suspense } from "react";
import Profile from "@/components/Profile";
import getProfilePicture from "@/libs/getProfilePicture";



export default async function user() {
  const session = await getServerSession(authOptions);
  var profile, createdAt, pfp, bookings: Bookings;

  if (!session) {
    // console.log(session);
    return;
  }
  bookings = await getBookings(session.user.token);
  profile = await getUserProfile(session.user.token);
  pfp = await getProfilePicture(session.user.token);

  createdAt = new Date(profile.data.createdAt);

  // console.log(profile.data)

  return (
    <>
        {session && (
          <main className="mt-[70px] flex justify-center ">

            <div className="card w-96 bg-base-100 shadow-xl border-2 border-solid border-base-800 ">
              <div className="card-body">
                <h2 className="card-title">{profile.data.name}</h2>
                <Profile session={session} pfp={pfp.data.profilePic}/>
                {!pfp && <h2 className=" font-bold">[Click icon to upload profile picture]</h2>}
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
                    <tr>
                      <td>Points :</td>
                      <td>{profile.data.point}</td>
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
