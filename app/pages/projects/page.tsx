"use client";

import ProjectListTable from '@components/ProjectListTable';
import { ProjectListDTO } from '@models/ProjectListDTO';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Project = () => {
  const [projectList, setProjectList] = useState<ProjectListDTO[]>([]);

  const getAllProjects = async () => {
    try {
      const response = await fetch('/api/get-projects'); // Assuming the endpoint is at /api/getAllClients
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjectList(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Fetch clients when the component mounts
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className='flex justify-between'>
        <h1 className="head_text">Project List</h1>
        <Link className='self-center' href="/pages/forms/project-form" passHref>
          <Button variant="contained">Add Project</Button>
        </Link>
      </div>
      <ProjectListTable rows={projectList} />
    </>
  );
} 
export default Project
