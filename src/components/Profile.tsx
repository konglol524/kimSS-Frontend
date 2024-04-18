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
      
      return(
  
        <div className="w-full h-[200px] pt-5 relative justify-center flex flex-row items-center">
          <div className="w-auto h-full absolute flex items-center p-2 z-30 pointer-events-none">
            {
              (point>=500 && point < 1000) ? 
              <div className="w-[230px] h-[230px] bg-[url('/img/ariF1.png')] bg-cover"/>
              :
              point >= 1000 ? <div className="w-[230px] h-[230px] bg-[url('/img/ariF2.png')] bg-cover"/> : null
            }
          </div>
          <div className="absolute w-full h-full flex justify-center items-center">
            <Avatar alt="Profile picture" src={image} sx={{ width: 200, height: 200}} className="absolute"/>
            <label className="w-[200px] h-[200px] cursor-pointer grid grid-cols-1 justify-center mx-auto absolute">
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
                    }}
                />
            </label>
          </div>
        </div>
        
      )

}