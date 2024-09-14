import Model from '@/components/Model'
import { useCreateProjectMutation } from '@/state/api'
import React, { useState } from 'react';
import {formatISO} from "date-fns";

type Props = {
    isOpen: boolean
    onClose: () => void
}

const ModelNewProject = ({ isOpen, onClose }: Props) => {
    const [createProject, { isLoading }] = useCreateProjectMutation();
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async () => {
        if (!projectName || !startDate || !endDate) return;
    
        const formattedStartDate = formatISO(new Date(startDate), {
          representation: "complete",
        });
        const formattedEndDate = formatISO(new Date(endDate), {
          representation: "complete",
        });
    
        await createProject({
          name: projectName,
          description,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      };

    const isFormValid = () => {
        return projectName && description && startDate && endDate;
    }

    const inputStyle = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
    return (
        <Model isOpen={isOpen} onClose={onClose} name='Create New Project'>
            <form className='mt-4 space-y-4' onSubmit={(e) => {
                e.preventDefault()
            }}>
                <input type='text' className={inputStyle} placeholder='Project Name'
                    value={projectName} onChange={(e) => setProjectName(e.target.value)} />

                <textarea className={inputStyle} placeholder='Description'
                    value={description} onChange={(e) => setDescription(e.target.value)} />

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <input type='date' className={inputStyle}
                        value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                    <input type='date' className={inputStyle}
                        value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button type="submit" className={`mt-4 flex w-full justify-center py-2 rounded-md border border-transparent bg-blue-primary
                 px-4 text-base font-meduim text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
                    !isFormValid() || isLoading ? "cursor-not-allowed opacity-50":""
                 }`} disabled={!isFormValid || isLoading} onClick={handleSubmit}>
                    {isLoading ? "Creating": "Create project"}
                </button>
            </form>
        </Model>
    )
}

export default ModelNewProject;