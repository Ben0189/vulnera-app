
import { Client } from '@models/entity/Client';
import { sql } from '@vercel/postgres';



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