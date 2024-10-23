'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  contact: number;
  revenue: number;
  creditCardNumber: string; // Assuming this is a string for formatting
};

const ClientForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch('/api/add-clients', { // Adjust the endpoint as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          contact: data.contact,
          revenue: data.revenue,
          creditCardNumber: data.creditCardNumber,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Client created successfully', result);
        redirect('/'); // Redirect after successful creation
      } else {
        console.error('Failed to create client', await response.json());
      }
    } catch (error) {
      console.error('Error creating client', error);
    }
  };

  return (
    <>
      <h2 className="head_text">Create Client Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          className="mb-3 block"
          type="text"
          variant="outlined"
          color="primary"
          label="Client Name"
          required
          fullWidth
        />
        <TextField
          {...register('email')}
          className="mb-3 block"
          type="email"
          variant="outlined"
          color="primary"
          label="Email Address"
          required
          fullWidth
        />
        <TextField
          {...register('contact')}
          className="mb-3 block"
          type="number"
          variant="outlined"
          color="primary"
          label="Contact Number"
          required
          fullWidth
        />
        <TextField
          {...register('revenue')}
          className="mb-3 block"
          type="number"
          variant="outlined"
          color="primary"
          label="Revenue"
          required
          fullWidth
        />
        <TextField
          {...register('creditCardNumber')}
          className="mb-3 block"
          type="text" // Keeping it as text for formatting purposes
          variant="outlined"
          color="primary"
          label="Credit Card Number"
          required
          fullWidth
        />
        <Button variant="outlined" color="primary" type="submit">Submit</Button>
      </form>
    </>
  );
};

export default ClientForm;
