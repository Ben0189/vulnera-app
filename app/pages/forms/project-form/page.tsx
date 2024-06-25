'use client'

import TextField from '@mui/material/TextField'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '@mui/material/Button';
import { FormControl, FormGroup, FormLabel } from '@mui/material';
import Textarea from '@mui/joy/Textarea';

type Inputs = {
  projectName: string
  companyName: string
  budget : number
  description : string
}
//TODO : Gold plating rearrange form folder structure 
const projectForm = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data : any) => {
        console.log('Form data', data)
    }

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
