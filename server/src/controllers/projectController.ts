import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export const getProjectHandler = async (req:Request,res:Response):Promise<void> =>{
   try{
     const project = await prisma.project.findMany();
     res.status(200).json(project);
   }catch(error:any){
     console.log(error)
     res.status(500).json({message:`Error retrieving project: ${error.message}`})
   }
}

export const createProjectHandler = async (req:Request,res:Response):Promise<void> =>{
    try{
       const {name,description,startDate,endDate} = req.body;
       const newProject = await prisma.project.create({
         data:{
            name,
            description,
            startDate,
            endDate
         }
       })
         
       res.status(201).json(newProject)
    }catch(error:any){
        console.log(error)
        res.status(500).json({message:`Error creating project: ${error.message} `})
    }
}