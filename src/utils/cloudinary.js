import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

//Configure 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCLoudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            }
        )
        console.log("File uploaded on Cloudinary . File link :",response.url)
        //Once the file is uploded we would like to remove it from server
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}

export {uploadOnCLoudinary}