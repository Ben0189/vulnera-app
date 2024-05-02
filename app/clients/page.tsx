import React from 'react'
import ClientListTable from '@components/ClientListTable';
import { ClientListDTO } from '@models/ClientListDTO';

const clientList: ClientListDTO[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    contact: 1234567890,
    revenue: 10000,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    contact: 9876543210,
    revenue: 15000,
  },
];

const Client = () => {
  return (
     <>
      <h1 className="head_text">
        Client List
      </h1>
      <ClientListTable rows={clientList}></ClientListTable>
     </>
  )
}

export default Client
