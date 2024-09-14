import React, { useState } from 'react'
import Model from './Model';
import { Priority, Status, useCreateTaskMutation } from '@/state/api';
import { formatISO } from 'date-fns';

type Props = {
    id?: string | null
    isOpen: boolean,
    onClose: () => void;
}


const ModelNewTask = ({ isOpen, onClose, id = null }: Props) => {

    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Status>(Status.ToDo);
    const [priority, setPriority] = useState<Priority>(Priority.Backlog);
    const [tags, setTags] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [authorUserId, setAuthorUserId] = useState("");
    const [assignedUserId, setAssignedUserId] = useState("");
    const [projectId, setProjectId] = useState("")

    const handleSubmit = async () => {
        if (!title || !authorUserId || !(id !== null || projectId)) return;

        const formattedStartDate = formatISO(new Date(startDate), {
            representation: "complete",
        });
        const formattedDueDate = formatISO(new Date(dueDate), {
            representation: "complete",
        });

        await createTask({
            title,
            description,
            status,
            priority,
            tags,
            startDate: formattedStartDate,
            dueDate: formattedDueDate,
            authorUserId: parseInt(authorUserId),
            assignedUserId: parseInt(assignedUserId),
            projectId: id! == null ? Number(id) : Number(projectId)
        });
    };

    const isFormValid = () => {
        return title && authorUserId && !(id !== null || projectId)
    }
    const selectStyles = "mb-4 block w-full border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
    const inputStyle = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

    return (
        <Model isOpen={isOpen} onClose={onClose} name='Create New Task'>
            <form className='mt-4 space-y-4' onSubmit={(e) => {
                e.preventDefault()
            }}>
                <input type='text' className={inputStyle} placeholder='Project Name'
                    value={title} onChange={(e) => setTitle(e.target.value)} />

                <textarea className={inputStyle} placeholder='Description'
                    value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <select className={selectStyles}
                        value={status} onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])}>
                        <option value="">Select Status</option>
                        <option value={Status.ToDo}>To Do</option>
                        <option value={Status.workingProgress}>Working Progress</option>
                        <option value={Status.underReview}>Under Review</option>
                        <option value={Status.completed}>Completed</option>
                    </select>
                    <select className={selectStyles}
                        value={priority} onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])}>
                        <option value="">Select Priority</option>
                        <option value={Priority.Urgent}>Urgent</option>
                        <option value={Priority.High}>High</option>
                        <option value={Priority.Medium}>Medium</option>
                        <option value={Priority.Low}>Low</option>
                        <option value={Priority.Backlog}>Backlog</option>
                    </select>
                </div>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <input type='date' className={inputStyle}
                        value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                    <input type='date' className={inputStyle}
                        value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <input type='text' className={inputStyle} placeholder='Tags (coma seperated)'
                    value={tags} onChange={(e) => setTags(e.target.value)} />

                <input type='text' className={inputStyle} placeholder='Author User Id'
                    value={authorUserId} onChange={(e) => setAuthorUserId(e.target.value)} />

                <input type='text' className={inputStyle} placeholder='Assigned User Id'
                    value={assignedUserId} onChange={(e) => setAssignedUserId(e.target.value)} />


                {
                    id === null && (
                        <input type='text' className={inputStyle} placeholder='ProjectId'
                            value={projectId} onChange={(e) => setProjectId(e.target.value)} />
                    )
                }

                <button type="submit" className={`mt-4 flex w-full justify-center py-2 rounded-md border border-transparent bg-blue-primary
         px-4 text-base font-meduim text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`} disabled={!isFormValid || isLoading} onClick={handleSubmit}>
                    {isLoading ? "Creating" : "Create project"}
                </button>
            </form>
        </Model>
    )
}

export default ModelNewTask