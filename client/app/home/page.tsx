"use client"
import { Priority, Project, Task, useGetProjectsQuery, useGetTasksQuery } from '@/state/api'
import React from 'react'
import { useAppSelector } from '../redux'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Header from '@/components/Header'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils'


const HomePage = () => {
    const {data:tasks,isLoading:TaskLoading,isError:TaskError} = useGetTasksQuery({projectId:parseInt("1")})
    const {data:project,isLoading:ProjectLoading} = useGetProjectsQuery();

    const isDarkMode = useAppSelector((state)=> state.global.isDarkMode)
    if(TaskLoading || ProjectLoading) return <div>Loading...</div>
    if(TaskError || !tasks || !project) return <div>Error fetching data</div>
     
    const priorityCount = tasks.reduce(
        (acc:Record<string,number>, task:Task)=>{
            const {priority} = task;
            acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
            return acc;
        },
        {}
    )

    const taskDistribution = Object.keys(priorityCount).map((key)=>({
        name:key,
        count:priorityCount[key]
    }));

    const StatusCount = project.reduce(
        (acc:Record<string,number>, project:Project)=>{
            const status = project.endDate ? "completed":"Active"
            acc[status] = (acc[status] || 0) +1
            return acc;
        },
        {}
    )

    const ProjectStatus = Object.keys(StatusCount).map((key)=>({
        name:key,
        count:StatusCount[key]
    }))

    const taskColumns:GridColDef[] = [
        {field:"title",headerName:"Title",width:200},
        {field:"status",headerName:"Status",width:150},
        {field:"priority",headerName:"Priority",width:150},
        {field:"dueDate",headerName:"Due Date",width:150}
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const chartColors = isDarkMode ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };
  return (
    <div className='container h-full w-full bg-gray-100 bg-transparent p-8'>
     <Header name='Project Management Dashbaord'/>
     <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='rounded-lg bg-white p-4 shadow dark:bg-dark-secondary'>
             <h3 className='mb-4 text-lg font-semibold dark:text-white'>
                Task Priority Distribution
             </h3>
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskDistribution}>
                  <CartesianGrid strokeDasharray="3 3"
                  stroke={chartColors.barGrid}/>
                  <XAxis dataKey="name" stroke={chartColors.text}/>
                  <YAxis stroke={chartColors.text}/>
                  <Tooltip contentStyle={{
                    width:"min-content",
                    height:"min-content"
                  }}/>
                  <Legend/>
                  <Bar dataKey="count" fill={chartColors.bar}/>
                </BarChart>
             </ResponsiveContainer>
          </div>

          <div className='rounded-lg bg-white p-4 shadow dark:bg-dark-secondary'>
             <h3 className='mb-4 text-lg font-semibold dark:text-white'>
                Project Status
             </h3>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie dataKey="count" data={ProjectStatus} fill='#82ca9d' label>
                        {
                            ProjectStatus.map((entry,index)=>(
                                <Cell key={`cell=${index}`} 
                                fill={COLORS[index % COLORS.length ]}/>
                            ))
                        }
                    </Pie>
                  <Tooltip contentStyle={{
                    width:"min-content",
                    height:"min-content"
                  }}/>
                  <Legend/>
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className='rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2'>
              <h3 className='mb-4 text-lg font-semibold dark:text-white'>
                 Your Tasks
              </h3>
              <div style={{height:500,width:"100%"}}>
                 <DataGrid 
                   rows={tasks}
                   columns={taskColumns}
                   checkboxSelection
                   loading={TaskLoading}
                   getRowClassName={()=> "data-grid-row"}
                   getCellClassName={()=> "data-grid-cell"}
                   className={dataGridClassNames}
                   sx={dataGridSxStyles(isDarkMode)}
                 />
              </div>
          </div>
       </div>
    </div>
  )
}

export default HomePage