import { Client } from '@models/entity/Client';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Define the Client interface

// Payload data
const clientList: Client[] = [
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

// Function to create the client table and seed it with data
export async function createClientTable() {
  try {
    //TODO : Check if you can create again if the table already exist

    // Create the client table
    await sql`CREATE TABLE Clients ( 
        Name varchar(255), 
        Email varchar(255), 
        Contact bigint, 
        Revenue bigint 
        );`;

    // Seed the client table with data
    for (const client of clientList) {
      await sql`INSERT INTO Clients (Name, Email, Contact, Revenue) VALUES (${client.name}, ${client.email}, ${client.contact}, ${client.revenue});`;
    }

    return { success: true, message: 'Client table created and seeded successfully.' };
  } catch (error) {
    return { success: false, error: error };
  }
}

// Endpoint to create the client table and seed it with data
export async function GET(request: Request) {
  try {
    const result = await createClientTable();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}