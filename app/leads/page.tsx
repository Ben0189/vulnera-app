import LeadListTable from '@components/LeadListTable';
import { LeadListDTO } from '@models/LeadListDTO';
import React from 'react'

const dummyLeads: LeadListDTO[] = [
  {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: 1234567890,
      status: "New",
      source: "Website"
  },
  {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: 9876543210,
      status: "Contacted",
      source: "Referral"
  },
  {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      contact: 4567891230,
      status: "Qualified",
      source: "Cold Call"
  }
];

const lead = () => {
  return (
    <>
      <h1 className="head_text">
        Lead List
      </h1>
      <LeadListTable rows={dummyLeads}></LeadListTable>
   </>
  )
}

export default lead
