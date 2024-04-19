import axios from "axios";

export default async function updateBooking(
  token: string,
  id: string,
  data: object
) {
  const response = await axios({
    method: "PUT",
    url: `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: data,
  });

  if (!(response.status >= 200 && response.status < 300)) {
    console.log(response.status);
    throw new Error("Failed to fetch user profile");
  }
  return response.data;
}
