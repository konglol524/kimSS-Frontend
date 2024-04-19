export default function ReservationResult({valid, text, transition}:{valid:boolean, text:string, transition:boolean}) {
    const color = valid == true ? "bg-green-600":"bg-red-600"
    
    const istransition = transition?"-translate-x-[350px]":""

    return (
        <div className={`rounded-xl delay-2000 transition ${istransition} delay-0 ease-in-out duration-300 opacity-70 fixed z-40 h-[75px] w-[350px] mt-[200px] top-0 right-[-350px] bg-black`}>
            <div className={` ${color} h-[10%] w-full mt-[1vh]`}></div>
            <div className="grid w-full h-[50px] items-center text-center text-lg text-white text-nowrap">{text?text:"Unknown Error"}</div>
        </div>
    )
}