"use client";

import InputBox from "@/components/InputBox";
import { signIn } from "next-auth/react";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import Loading from "../../components/CustomLoading";

export default function page() {
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!email.current || !pass.current){
      setIsLogin(false);
    } 
    const res = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: false,
    });
    if (!res?.error) {
      router.push("/");
      router.refresh();
    } else {
      setIsLogin(false);
      console.log("Error /signIn/page.tsx" + res.error);
      // alert("You entered wrong email or password!");
    }
  };

  return (
    <Suspense fallback={<Loading></Loading>}>
      <div className="h-[100vh] p-5 bg-gradient-to-tl from-red-600 to-slate-950">
        <div className="mt-[70px] w-[60vw] sm:w-[30vw] mx-auto flex flex-col gap-7">
          <form
            onSubmit={onSubmit}
            className="p-2 flex flex-col gap-5 rounded-xl glass bg-gradient-to-tl from-red-600 from-10%  to-slate-950 to-90%"
          >
            <div className=" text-2xl text-white">Login Form</div>

            <label className="input input-bordered flex items-center gap-2 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(e) => (email.current = e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                className="grow"
                id="password"
                name="password"
                onChange={(e) => (pass.current = e.target.value)}
              />
            </label>

            <div className="flex items-center justify-center gap-2 m-2">
              <button
                id="signin"
                type="submit"
                className="w-40 glass btn btn-error bg-red-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-xl text-center">
            <Link href={"/signUp"}>
              <span className="hover:bg-white/[0.5] underline text-white">
                Or Register here
              </span>
            </Link>
          </div>
        </div>
        {!isLogin && (
              <div
                role="alert"
                className="text-red-600 mt-2 bg-black rounded-md px-4 py-2 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block h-5 w-5 mr-1 align-middle text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 4a1 1 0 012 0v5a1 1 0 11-2 0V4zm2 10a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="align-middle text-white">
                  Warning: Please fill in valid email and password.
                </span>
              </div>
            )}
      </div>
    </Suspense>
  );
}
