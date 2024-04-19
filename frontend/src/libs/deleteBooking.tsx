import axios from "axios";

export default async function deleteBooking(token: string, id: string) {
  const response = await axios({
    method: "DELETE",
    url: `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!(response.status >= 200 && response.status < 300)) {
    console.log(response.status);
    throw new Error("Failed to fetch user profile");
  }
  return response.data;
}
