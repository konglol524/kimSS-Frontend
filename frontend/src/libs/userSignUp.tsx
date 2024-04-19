import axios from "axios";

export default async function userSignUp(formData: Object) {
  const response = await axios({
    method: "POST",
    url: `${process.env.BACKEND_URL}/api/v1/auth/register`,
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!(response.status >= 200 && response.status < 300)) {
    console.log(response.status);
    throw new Error("Failed to login");
  }
  console.log(response.data);
  return response.data;
}

//test account
//u: testuser1@gmail.com
//p: TE5st@r+
