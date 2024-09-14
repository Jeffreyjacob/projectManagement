
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const GetUserhandler = async (req:Request,res:Response)=>{
  try{
    const user = await prisma.user.findMany();
    res.json(user)
  }catch(error:any){
    res.status(500).json({
        message: `Error retrieving search: ${error.message}`
    });
  }
}