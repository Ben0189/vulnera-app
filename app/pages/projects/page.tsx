"use client";

import React, { useEffect, useState } from 'react'
import { ProjectListDTO } from '@models/ProjectListDTO';
import ProjectListTable from '@components/ProjectListTable';
import Button from '@mui/material/Button';

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
      <h1 className="head_text">
        Project List
      </h1>
      <Button variant="outlined">Add Project</Button>
      <ProjectListTable rows={projectList}></ProjectListTable>
     </>
  )
}

export default Project
