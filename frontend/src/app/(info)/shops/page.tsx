import getShops from "@/libs/getShops";
import ShopCatalog from "@/components/ShopCatalog";
import Loading from "@/components/CustomLoading";
import { Suspense } from "react";

export default async function shops() {
  const shops = await getShops();

  return (
    <Suspense fallback={<Loading></Loading>}>
      <main className="p-5 text-center">
        <h1 className="text-5xl font-bold text-white mt-[75px]">Top Shops</h1>
        <div className="bg-white h-[5px] mt-[20px] mb-[20px] w-[80%] sm:w-[60%] md:w-[50%] m-auto rounded-xl"></div>
        <ShopCatalog shopData={shops}></ShopCatalog>
      </main>
    </Suspense>
  );
}
