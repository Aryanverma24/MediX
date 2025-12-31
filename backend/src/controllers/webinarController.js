import axios from "axios"
import dotenv from "dotenv"
dotenv.config();
import {getAccessToken} from "../util/zohoAccessToken.js";

const ZOHO_API = process.env.ZOHO_MEETING_API;

export const createWebinar = async (req,res) => {

    // create webinaar 
    try {
        const accessToken  = await getAccessToken();
        if(!accessToken) return res.status("Access token not found");

        const response = await axios.post(`${ZOHO_API}/webinars`,req.body,{
            headers: { Authorization : `Bearer ${accessToken}`}
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Unable to create webinar"})
    }
}


//get all webinars
export const getAllWebinars = async(req,res) => {
    try {
        const accessToken = await getAccessToken();
        console.log(accessToken);
        console.log(ZOHO_API);
        const response = await axios.get(`${ZOHO_API}/webinars`,{
             headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log(response)
        res.status(200).json({message : "Webinars get successfully",data : response.data})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error, Unable to get all webinars"})
    }
}

// get webinar by webinar id
export const getWebinarById = async(req,res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`${ZOHO_API}/webinars/${req.params.id}`,{
             headers: { Authorization: `Bearer ${accessToken}` },
        });
        res.status(200).json({message : "Webinar get successfully",data : response.data})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error, Unable to get webinar by id"})
    }
}

//update webinar by webinar id 
export const updateWebinar = async(req,res) => {
    try {
        const accessToken = await getAccessToken();
        const resposne = await axios.put(`${ZOHO_API}/webinar/${req.params.id}`,req.body,{
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        res.status(200).json({message : "Webinar updated successfully",data : resposne.data})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error, Unable to update webinar by webinar id"});
    }
}

//delete webinar by webinar id 

export const deleteWebinarbyId = async(req,res) => {
    try {
         const accessToken = await getAccessToken();
        const resposne = await axios.delete(`${ZOHO_API}/webinar/${req.params.id}`,req.body,{
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        res.status(200).json({message : "Webinar deleted successfully",data : resposne.data})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error, Unable to delete webinar by webinar id"});
    }
}