"use client";

import React, { useEffect, useState } from 'react'
import ClientListTable from '@components/ClientListTable';
import { ClientListDTO } from '@models/ClientListDTO';
import Link from 'next/link';
import { Button } from '@mui/material';

const Client = () => {
  const [clientList, setClientList] = useState<ClientListDTO[]>([]);

  const getAllClients = async () => {
    try {
      const response = await fetch('/api/get-clients'); // Assuming the endpoint is at /api/getAllClients
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setClientList(data.clientData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Fetch clients when the component mounts
  useEffect(() => {
    getAllClients();
  }, []);

  return (
     <>
        <div className='flex justify-between'>
          <h1 className="head_text">
            Client List
          </h1>
          <Link className='self-center' href="/pages/forms/client-form" passHref>
              <Button variant="contained">Add Client</Button>
          </Link>
        </div>
      <ClientListTable rows={clientList}></ClientListTable>
     </>
  )
}

export default Client
