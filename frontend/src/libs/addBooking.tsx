import axios from "axios";

export default async function addBooking(
    rentalID: string,
  token: string,
  data: object
) {
    console.log(token);
    console.log(JSON.stringify(data));
    
  const response = await axios({
    method: "POST",
    url: `${process.env.BACKEND_URL}/api/v1/rentals/${rentalID}/bookings/`,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data),
  });

  if (!(response.status >= 200 && response.status < 300)) {
    console.log(response.status);
    throw new Error("Failed to add new booking");
  }
  return response.data;
}
