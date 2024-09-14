import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Project {
    id: number,
    name: string,
    description?: string,
    startDate?: string,
    endDate?: string
}

export enum Status {
    ToDo = "To Do",
    workingProgress = "work in Progress",
    underReview = "under Review",
    completed = "Completed"
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Completed"
}
export interface User {
    userId?: number
    username: string,
    email: string,
    profilePictureUrl?: string,
    cognitoId?: string,
    teamId: number
}

export interface Attachment {
    id: number,
    fileUrl: string,
    fileName: string,
    taskId: number,
    uploadedById: number
}

export interface Comment {
    id: number,
    text: string
    taskId: number,
    userId: number
}

export interface Task {
    id: number
    title?: string,
    description?: string,
    status?: Status,
    priority?: Priority,
    tags?: string,
    startDate?: string,
    dueDate?: string,
    point?: number
    projectId?: number,
    authorUserId?: number,
    assignedUserId?: number,
    author?: User,
    assignee?: User,
    comments?: Comment[],
    attachments?: Attachment[]
}

export interface SearchResult {
    task?: Task[];
    project?: Project[]
    user?: User[]
}

export interface Team {
    id:number,
    teamName:string,
    productOwnerUserId?:number,
    projectManagerUserId?:number,
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks","Users","Teams"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "api/project",
            providesTags: ["Projects"],
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "api/project",
                method: "POST",
                body: project
            }),
            invalidatesTags: ["Projects"]
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `api/task?projectId=${projectId}`,
            providesTags: (result) => result ? result.map(({ id }) => ({ type: "Tasks" as const, id })) :
                [{ type: "Tasks" as const }]
        }),
        getTaskbyUser:build.query<Task[],number>({
            query:(id) => `/api/task/user/${id}`,
            providesTags:(results,errors,id)=> results ?
            results.map(({id})=>({type:"Tasks" as const, id})) :
            [{type:"Tasks" as const}]
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "api/task",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number, status: string }>({
            query: ({ taskId, status }) => ({
                url: `/api/task/${taskId}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId }
            ]
        }),
        search: build.query<SearchResult, string>({
            query: (query) => `/api/search?query=${query}`,
        }),
        getUser:build.query<User[],void>({
            query:()=> "/api/user",
            providesTags:["Users"]
        }),
        getTeams:build.query<Team[], void>({
            query: () => "/api/team",
            providesTags: ["Teams"],
          })
    })
});

export const { useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery,
    useGetUserQuery,
    useGetTeamsQuery,
    useGetTaskbyUserQuery
} = api