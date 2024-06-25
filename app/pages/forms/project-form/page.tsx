'use client'

import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { redirect } from 'next/navigation';
import { useForm } from "react-hook-form";

type Inputs = {
  projectName: string
  companyName: string
  budget : number
  description : string
}
//TODO : Gold plating rearrange form folder structure 
const projectForm = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data : any) => {
        try {
            const response = await fetch('/api/add-projects', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: data.projectName,
                companyName: data.companyName,
                budget: data.budget,
                description: data.description,
              }),
            });
      
            if (response.ok) {
              const result = await response.json();
              console.log('Project created successfully', result);
              redirect('/')
            } else {
              console.error('Failed to create project', await response.json());
            }
          } catch (error) {
            console.error('Error creating project', error);
          }    }

    return (
        <>
            <h2 className="head_text">Create Project Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                        {...register('projectName')}
                        className='mb-3 block'
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Project Name"
                        required
                        fullWidth
                />
                <TextField
                        {...register('companyName')}
                        className='mb-3 block'
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Company Name"
                        required
                        fullWidth
                />
                <TextField
                        {...register('budget')}
                        className='mb-3 block'
                        type="number"
                        variant='outlined'
                        color='primary'
                        label="Budget"
                        required
                        fullWidth
                />
                {/* {"<script>alert('Hello! I am an alert box!');</script>"}} */}
                <Textarea 
                    {...register('description')}
                    minRows={2} 
                    className='mb-3 block' 
                    placeholder="Project Description"
                />
                <Button variant="outlined" color="primary" type="submit">Submit</Button>
            </form>
        </>    
    )
}

export default projectForm
