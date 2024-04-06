'use client'
import { signOut } from "next-auth/react";


export default function page() {

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/', redirect:true }); // This will sign the user out
      };

    return (

        <div className="h-[100vh] p-5 bg-gradient-to-tl from-red-600 from-10%  to-slate-950 to-90%">
          <button onClick={handleSignOut} id="submitButton" type="submit" className="mt-[70px] btn btn-wide btn-lg glass btn-error bg-red-600 ">
            Sign Out
          </button>
        </div>
    )
}