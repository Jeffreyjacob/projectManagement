import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export const getTask = async (req:Request,res:Response):Promise<void> =>{
    try{
       const {projectId} = req.query

       const tasks = await prisma.task.findMany({
          where:{
            projectId:Number(projectId)
          },
          include:{
            author:true,
            assignee:true,
            comments:true,
            attachments:true
          }
       })
       res.status(200).json(tasks)
    }catch(error:any){
        console.log(error)
        res.status(500).json({message:`Error retrieving tasks: ${error.message}`})
    }
}

export const createTask = async (req:Request,res:Response):Promise<void>=>{
   try{
     const {title,description,status,priority,tags,
        startDate,dueDate,points,projectId,authorUserId,assignedUserId} = req.body;
        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId
            }
        })
        
        res.status(200).json(newTask)

   }catch(error:any){
    console.log(error)
    res.status(500).json({message:`Error creating task: ${error.message}`})
   }
}

export const UpdateTaskStatus = async(req:Request,res:Response):Promise<void>=>{
  try{
     const {taskId} = req.params
     const {status} = req.body;

     const updateTask = await prisma.task.update({
        where:{
            id:Number(taskId)
        },
        data:{
            status:status
        }
     })
     res.json(updateTask);
  }catch(error:any){
    console.log(error)
    res.status(500).json({message:`Error upating task: ${error.message}`})
  }
}


export const getUserTask = async (req:Request,res:Response)=>{
  const {id} = req.params;
  try{  
      const task = await prisma.task.findMany({
        where:{
          OR:[
            {authorUserId : Number(id)},
            {assignedUserId: Number(id)}
          ]
        },
        include:{
          author:true,
          assignee:true
        }
      })
      res.json(task)
  }catch(error:any){
    console.log(error)
    res.status(500).json({message:`Error retrieving task: ${error.message}`})
  }
}