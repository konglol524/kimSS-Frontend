"use client"

import { Avatar } from "@mui/material"
import uploadProfile from "@/libs/uploadProfile";

export default function Profile(  {pfp, session}: {pfp:string, session:any}){

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
        <label htmlFor="file-upload">
        <Avatar alt="Profile picture" src={pfp || "/img/defaultUser2.png" } sx={{ width: 200, height: 200, marginLeft: "auto", marginRight: "auto" }}/> 
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
                      const result = await uploadProfile(session.user.token, new_image_url);    
                      console.log(result);                         
                    }
          
                }
            }}
        />
        </label>        
      )

}