"use client"
import { useSearchQuery } from '@/state/api'
import React, { useEffect, useState } from 'react';
import { debounce } from "lodash";
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/UserCard';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const { data: searchResults, isLoading, isError } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3
    })

    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }, 500)

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel])
    return (
        <div className='p-8'>
            <Header name='Search' />
            <div>
                <input type='text' placeholder='Search...' className='w-1/2 rounded border p-3 shadow'
                    onChange={handleSearch} />
            </div>

            <div className='p-5'>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error occurred while fetching search results.</p>}
                {!isLoading && !isError && searchResults && (
                    <div>
                        {searchResults.task && searchResults.task.length > 0 && (
                            <h2>Tasks</h2>
                        )}
                        {
                            searchResults.task?.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        }

                        {searchResults.project && searchResults.project.length > 0 && (
                            <h2>Project</h2>
                        )}
                        {
                            searchResults.project?.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }


                        {searchResults.user && searchResults.user.length > 0 && (
                            <h2>User</h2>
                        )}
                        {
                            searchResults.user?.map((user) => (
                                <UserCard key={user.userId} user={user} />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search