"use client"

import { Avatar } from "@mui/material"
import uploadProfile from "@/libs/uploadProfile";

export default function Profile(  {profile, session}: {profile:any, session:any}){

    const convertToBase64 = (file:File)=>{
        return new Promise ((resolve, reject)=> {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = ()=> {
            if (typeof fileReader.result === 'string') {
              resolve(fileReader.result)
            }
          };
          fileReader.onerror = (error)=>{
            reject(error);
          }      
        })
      }
    
      return(
        <label htmlFor="file-upload">
        <Avatar alt="Profile picture" src={profile.data.profilePic || "/img/defaultUser2.png" } sx={{ width: 200, height: 200, marginLeft: "auto", marginRight: "auto" }}/> 
        <input
            id="file-upload"
            type="file"
            name="myFile"
            accept=".jpeg, .png, .jpg, .webp"
            className="hidden"
            onChange={async (e)=>{
                e.preventDefault();
                if(!e.target.files){
                    return
                }
                const file = e.target.files[0];
                // console.log(file);
                const base64 = await convertToBase64(file);
                // console.log(base64);
                if(typeof base64 === 'string'){
                    const result = await uploadProfile(session.user.token, base64);  
                    console.log(result);              
                }
            }}
        />
        </label>        
      )

}