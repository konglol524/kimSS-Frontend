"use client"

import { Avatar } from "@mui/material"
import uploadProfile from "@/libs/uploadProfile";
import { useState } from "react";

export default function Profile(  {pfp, session, updateImage , point}: {pfp:string, session:any, updateImage: Function, point: number}){
    
  const [image, setImage] = useState(pfp);

    const WIDTH = 200;
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
      
      // console.log(pfp);
      return(
        <div className="w-[220px] h-[220px] mx-auto flex justify-center items-center ">
        
        <label htmlFor="file-upload">
        
        {(point>=500 && point < 1000) && <div className="w-[280px] h-[280px] bg-[url('/img/LeagueBorder1.png')] bg-cover absolute right-[50px] top-[40px] z-30"></div> }
        {point>=1000 && <div className="w-[280px] h-[280px] bg-[url('/img/LeagueBorder2.png')] bg-cover absolute right-[50px] top-[40px] z-30"></div>}

            <Avatar alt="Profile picture" src={image || "/img/defaultUser2.png" } sx={{ width: 200, height: 200}}>
                
             </Avatar>

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
                const base64 = await convertToBase64(file);
                
                
                if(typeof base64 === 'string'){
                    let image = document.createElement("img");
                    image.src = base64;
                    image.onload = async ({target}) => {
                      let canvas = document.createElement("canvas");
                      if(!target){
                        return;
                      }
                      let ratio = WIDTH / (target as HTMLCanvasElement).width;
                      canvas.width = WIDTH;
                      canvas.height = (target as HTMLCanvasElement).height * ratio;
                      const context = canvas.getContext("2d");
                      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
                      let new_image_url = context?.canvas.toDataURL("image/jpeg", 60);
                      if(!new_image_url){
                        return;
                      }
                      setImage(new_image_url);
                      const result = await uploadProfile(session.user.token, new_image_url);    
                      console.log(result);     

                    }
                    
                }
                // const newImage = await updateImage();
                // setImage(newImage.data.profilePic);

            }}
        />
        </label>     
        
        </div>   
      )

}