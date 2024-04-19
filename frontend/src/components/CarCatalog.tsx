import Card from '@/components/Card'

export default function CarCatalog() {
    const cars:Car[] = [{model:"Honda Civic", img:'/cars/civic.jpg', description:'Cool car'},
    { model:"Honda Accord", img:'/cars/accord.jpg', description:'Cool car'},
    { model:"Toyota Fortuner", img:'/cars/fortuner.jpg', description:'Cool car'},
    { model:"Tesla Model 3", img:'/cars/tesla.jpg', description:'Cool car'}]

    return(
         <div className='p-10'>
            <h1 className="text-5xl font-bold text-white my-[30px]">Our Top Cars</h1>
            <div className='flex flex-row content-around justify-around flex-wrap bg-gradient-to-tl shadow-lg rounded-lg  from-red-700 from-50% to-slate-800 '>
                {
                    cars.map((carItem:Car)=>(
                            <Card carItem={carItem}/>
                    ))
                }                
            </div>
        </div>
        
    )
}