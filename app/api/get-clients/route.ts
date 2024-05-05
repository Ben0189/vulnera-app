// getAllClients.ts

import { Client } from '@models/entity/Client';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Function to get all clients from the database
export async function getAllClients() {
  try {
    // Fetch all clients from the Clients table
    const clients = await sql<Client[]>`SELECT * FROM Clients;`;
    
    return { success: true, clients };
  } catch (error) {
    return { success: false, error: error };
  }
}

// Endpoint to get all clients
export async function GET(request: Request) {
  try {
    const { success, clients, error } = await getAllClients();
    if (success) {
        const clientData = clients?.rows; // Extracting the rows array
      return NextResponse.json({ clientData }, { status: 200 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
