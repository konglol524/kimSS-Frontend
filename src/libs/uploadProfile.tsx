import axios from "axios";

export default async function uploadProfile(
  token: string,
  data: string,
) {
  const response = await axios({
    method: "PUT",
    url: `${process.env.BACKEND_URL}/api/v1/upload/profile`,
    headers: {
      authorization : `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(
     { pic: data }
    ),
    
  });

  if (!(response.status >= 200 && response.status < 300)) {
    console.log(response.status);
    throw new Error("Failed to upload user profile");
  }
  return response.data;
}
