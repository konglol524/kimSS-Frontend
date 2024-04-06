interface Car {
  model: string;
  img: string;
  description:string;
}

interface Bookings {
  count: number;
  totalCost: number;
  data: Booking[];
}
interface Booking {
  _id: string;
  bookingDate: string;
  user: string;
  car: string;
  daySpend: number;
  rentalProvider: rentalProvider;
  createdAt: string;
}
interface rentals {
  count: number,
  page: number,
  data: rentalProvider[]
}
interface rentalProvider {
  _id: string;
  picture: string;
  name: string;
  address: string;
  cost: number;
  tel: string;
}

