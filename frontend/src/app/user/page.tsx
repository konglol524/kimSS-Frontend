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

  const updateImage = async ()=>{
    "use server"
    return await getProfilePicture(session.user.token);
  }

  createdAt = new Date(profile.data.createdAt);

  // console.log(profile.data)

  return (
    <>
    <Suspense fallback={<Loading></Loading>}>
        {session && (
          <main className="mt-[70px] flex justify-center ">

            <div className="card w-96 bg-base-100 shadow-xl border-2 border-solid border-base-800 ">
              <div className="card-body p-0">
                <h2 className="card-title ml-8 mt-6">{profile.data.name}</h2>
                <Profile session={session} pfp={pfp.data.profilePic} updateImage={updateImage} point={profile.data.point}/>
                <h2 className=" font-extrabold text-[1.05rem] text-nowrap p-2 text-center w-full flex justify-center mt-7 text-green-600">[Click icon to upload profile picture]</h2>
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
                  <button className="btn btn-primary mr-8 mb-8">{profile.data.role}</button>
                </div>
              </div>
            </div>
          </main>
        )}
        
        
        <BookingList bookings={bookings} token={session?.user.token} />
      </Suspense>    
    </>
  );
}
